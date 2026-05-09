import os
import json
import re
import time
import hashlib

import httpx
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request


load_dotenv()

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
PROJECTBOOST_API_KEY = os.environ.get("PROJECTBOOST_API_KEY")
VERSION = "1.0.0"

app = Flask(__name__)
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0


@app.after_request
def add_no_cache_headers(response):
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


SYSTEM_PROMPT = """
You are ProjectBoost AI — a specialized hackathon project evaluation system.
You are NOT a general assistant. You evaluate projects strictly as a hackathon judge.

Scoring rules (total_score is weighted average of all 8 criteria, 0-100):
- Meaningless idea (no real problem, no tech): 25-45
- Weak idea (vague, generic): 40-60
- Average idea (some merit, execution unclear): 60-75
- Good idea (clear problem, feasible MVP): 75-85
- Top idea (innovative, strong execution plan): 85-95
- Never score above 95. Never score below 25 unless description is completely empty/nonsensical.
- Do NOT just praise. Give concrete criticism.

You MUST return ONLY valid JSON, no markdown, no explanation, no backticks.

JSON structure:
{
  "total_score": <integer 0-100>,
  "level": <"Meaningless" | "Weak" | "Average" | "Good" | "Top">,
  "scores": {
    "problem": <0-100>,
    "uniqueness": <0-100>,
    "impact": <0-100>,
    "mvp_realism": <0-100>,
    "technology": <0-100>,
    "wow_effect": <0-100>,
    "scalability": <0-100>,
    "presentation": <0-100>
  },
  "summary": <2-3 sentence honest assessment>,
  "strong_points": [<3 specific strengths>],
  "weak_points": [<3-5 specific concrete weaknesses>],
  "improvements": [<3-5 actionable improvement suggestions>],
  "better_version": <rewritten improved version of the idea in 3-4 sentences>,
  "mvp_plan": [
    {"phase": "Day 1", "tasks": [<task1>, <task2>]},
    {"phase": "Day 2", "tasks": [<task1>, <task2>]},
    {"phase": "Demo Day", "tasks": [<task1>, <task2>]}
  ],
  "team_roles": [<role with responsibility, e.g. "Frontend Dev — builds UI">],
  "demo_idea": <concrete 2-3 sentence demo scenario>,
  "thirty_second_pitch": <30-second pitch text, punchy>,
  "one_minute_pitch": <1-minute pitch text, structured>,
  "tech_stack": [<technology with reason, e.g. "React — fast UI prototyping">],
  "judge_reason": <why judges would pick this, or why not>,
  "idea_dna": {
    "archetype": <e.g. "Marketplace", "Tool", "Platform">,
    "closest_startup": <real startup this resembles>,
    "differentiation": <what makes it different>
  },
  "growth_potential": {
    "month_1": <what growth looks like>,
    "month_6": <scale scenario>,
    "year_1": <vision>
  },
  "is_fallback": false,
  "demo_warning": <empty string or warning if demo is risky>
}
"""


def validate_payload(data):
    if not isinstance(data, dict):
        return "Invalid JSON body"
    description = str(data.get("description", "")).strip()
    if len(description) < 20:
        return "Description too short"
    return None


def build_user_prompt(data):
    return f"""
Project Name: {data.get('name', '')}
Description: {data.get('description', '')}
Category: {data.get('category', '')}
Team Size: {data.get('team_size', '')}
Hackathon Duration: {data.get('duration', '')}
Stage: {data.get('stage', '')}

Evaluate this project strictly. Be a tough judge.
"""


def parse_ai_json(response_text):
    match = re.search(r"\{.*\}", response_text, re.DOTALL)
    if not match:
        raise ValueError("AI response did not contain JSON")
    parsed = json.loads(match.group(0))
    parsed["total_score"] = int(parsed.get("total_score", 0))
    parsed["is_fallback"] = False
    parsed.setdefault("demo_warning", "")
    return parsed


def analyze_project(data):
    api_key = os.environ.get("GEMINI_API_KEY")

    if not api_key:
        return {
            "error": True,
            "error_type": "no_api_key",
            "message": "Gemini API key is not configured. Add GEMINI_API_KEY to your .env file and restart the server.",
            "is_fallback": True
        }

    try:
        prompt = f"""
You are ProjectBoost AI — a strict hackathon project evaluator.
Return ONLY valid JSON. No markdown, no backticks, no explanation, no text before or after JSON.

Evaluate this project:
Name: {data['name']}
Description: {data['description']}
Category: {data['category']}
Team Size: {data['team_size']}
Duration: {data['duration']}
Stage: {data['stage']}

Scoring rules:
- Meaningless idea (no real problem): 25-45
- Weak idea (vague, generic): 40-60
- Average idea (some merit): 60-75
- Good idea (clear problem, feasible): 75-85
- Top idea (innovative, strong plan): 85-95
- Never score above 95. Never below 25.
- Be critical. Give concrete weaknesses, not just praise.

Return ONLY this JSON:
{{
  "total_score": <integer>,
  "level": <"Meaningless" | "Weak" | "Average" | "Good" | "Top">,
  "scores": {{
    "problem": <0-100>,
    "uniqueness": <0-100>,
    "impact": <0-100>,
    "mvp_realism": <0-100>,
    "technology": <0-100>,
    "wow_effect": <0-100>,
    "scalability": <0-100>,
    "presentation": <0-100>
  }},
  "summary": "<2-3 sentence honest assessment>",
  "strong_points": ["<point1>", "<point2>", "<point3>"],
  "weak_points": ["<point1>", "<point2>", "<point3>"],
  "improvements": ["<improvement1>", "<improvement2>", "<improvement3>"],
  "better_version": "<rewritten improved idea in 3-4 sentences>",
  "mvp_plan": [
    {{"phase": "Day 1", "tasks": ["<task1>", "<task2>"]}},
    {{"phase": "Day 2", "tasks": ["<task1>", "<task2>"]}},
    {{"phase": "Demo Day", "tasks": ["<task1>", "<task2>"]}}
  ],
  "team_roles": ["<role: responsibility>", "<role: responsibility>"],
  "demo_idea": "<concrete 2-3 sentence demo scenario>",
  "thirty_second_pitch": "<punchy 30-second pitch>",
  "one_minute_pitch": "<structured 1-minute pitch>",
  "tech_stack": ["<Technology — reason>", "<Technology — reason>"],
  "judge_reason": "<why judges would or would not pick this>",
  "idea_dna": {{
    "archetype": "<e.g. Platform, Tool, Marketplace>",
    "closest_startup": "<real startup this resembles>",
    "differentiation": "<what makes it different>"
  }},
  "growth_potential": {{
    "month_1": "<what growth looks like>",
    "month_6": "<scale scenario>",
    "year_1": "<vision>"
  }},
  "is_fallback": false,
  "demo_warning": "<empty string or warning if demo is risky>"
}}
"""

        endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent"
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": 0.25,
                "responseMimeType": "application/json"
            }
        }

        response = httpx.post(
            endpoint,
            params={"key": api_key},
            json=payload,
            timeout=45,
        )
        response.raise_for_status()
        response_data = response.json()
        raw = response_data["candidates"][0]["content"]["parts"][0]["text"].strip()

        # Strip markdown fences if Gemini added them anyway
        raw = re.sub(r'```json|```', '', raw).strip()

        result = json.loads(raw)
        result["is_fallback"] = False
        return result

    except json.JSONDecodeError as e:
        return {
            "error": True,
            "error_type": "parse_error",
            "message": f"Gemini returned invalid JSON format. Please try again. Detail: {str(e)}",
            "is_fallback": True
        }
    except Exception as e:
        error_msg = str(e)
        if "API_KEY_INVALID" in error_msg or "invalid" in error_msg.lower():
            msg = "Gemini API key is invalid. Check your GEMINI_API_KEY in the .env file."
        elif "quota" in error_msg.lower() or "429" in error_msg:
            msg = "Gemini API quota exceeded. Wait a moment or check your quota at aistudio.google.com"
        elif "not found" in error_msg.lower() or "404" in error_msg:
            msg = "Gemini model not found. The model name may have changed."
        else:
            msg = f"Gemini API error: {error_msg}"
        return {
            "error": True,
            "error_type": "api_error",
            "message": msg,
            "is_fallback": True
        }


def mock_analyze(data, is_fallback=True):
    description = str(data.get("description", ""))
    lowered = description.lower()
    score = 55

    keyword_rules = [
        (["ai", "ml", "machine learning"], 8),
        (["automation", "robot"], 6),
        (["blockchain", "nft"], -5),
        (["real-time", "iot"], 5),
        (["government", "citizens", "public"], 4),
    ]

    for keywords, points in keyword_rules:
        if any(has_keyword(lowered, keyword) for keyword in keywords):
            score += points

    if len(description) > 400:
        score += 8
    elif len(description) > 200:
        score += 5

    if has_keyword(lowered, "government") and any(
        has_keyword(lowered, term) for term in ["document", "documents", "regulations", "department", "api", "apis"]
    ):
        score += 9

    if any(term in lowered for term in ["reduces processing time", "2 weeks to 2 hours", "built on existing"]):
        score += 6

    buzzwords = ["blockchain", "nft", "metaverse", "decentralized", "autonomous", "digital twin"]
    buzzword_count = sum(1 for word in buzzwords if has_keyword(lowered, word))
    if buzzword_count >= 4:
        score -= 12

    score = max(28, min(88, score))
    if len(description.strip()) < 45:
        score = min(score, 45)

    score += deterministic_variation(data)
    score = max(28, min(88, score))

    level = level_from_score(score)
    scores = criteria_scores(score)
    project_name = str(data.get("name") or "This project")
    category = str(data.get("category") or "hackathon")

    weak_points = build_weak_points(lowered)
    improvements = build_improvements(lowered, category)
    strengths = build_strong_points(lowered, category)

    return {
        "total_score": score,
        "level": level,
        "scores": scores,
        "summary": (
            f"{project_name} has enough shape to discuss, but its hackathon strength depends on proof, scope, "
            "and a crisp demo. The current version needs sharper differentiation and clearer execution evidence."
        ),
        "strong_points": strengths,
        "weak_points": weak_points,
        "improvements": improvements,
        "better_version": (
            f"{project_name} should focus on one painful {category.lower()} workflow and prove it with a working MVP. "
            "The demo should show a before-and-after scenario, measurable time saved, and a realistic user path. "
            "Add a narrow technical edge that judges can see live rather than a broad promise."
        ),
        "mvp_plan": [
            {"phase": "Day 1", "tasks": ["Define one target user journey", "Build the core data model and API"]},
            {"phase": "Day 2", "tasks": ["Implement the main workflow", "Add scoring, alerts, or automation logic"]},
            {"phase": "Demo Day", "tasks": ["Polish the demo path", "Prepare metrics and failure-case explanation"]},
        ],
        "team_roles": [
            "Product Lead — narrows the user problem and demo story",
            "Backend Dev — builds API, data flow, and integrations",
            "Frontend Dev — builds the judge-facing workflow",
            "AI/Automation Dev — implements analysis logic and evaluation checks",
        ],
        "demo_idea": (
            "Start with a realistic user submitting a messy request, document, or dataset. Show the system processing it, "
            "surfacing a decision, and giving the user a next action in under a minute."
        ),
        "thirty_second_pitch": (
            f"{project_name} turns a slow, confusing {category.lower()} process into a guided workflow with measurable output. "
            "In one demo, judges can see the problem, the automation, and the result."
        ),
        "one_minute_pitch": (
            f"{project_name} targets a concrete pain point in {category.lower()} where users lose time because information is scattered "
            "or decisions are manual. The MVP focuses on one workflow, uses lightweight automation to produce a useful result, "
            "and shows impact through speed, accuracy, or clarity. The next step is validating it with real users and real data."
        ),
        "tech_stack": [
            "Flask — fast API prototyping",
            "React or simple HTML — quick demo interface",
            "SQLite or PostgreSQL — reliable structured storage",
            "Gemini — natural language analysis where useful",
        ],
        "judge_reason": judge_reason(score),
        "idea_dna": {
            "archetype": infer_archetype(lowered),
            "closest_startup": infer_closest_startup(lowered),
            "differentiation": "The differentiation must come from a narrow use case, credible data, and a live demo that proves value.",
        },
        "growth_potential": {
            "month_1": "Pilot with a small group and measure whether the workflow saves meaningful time.",
            "month_6": "Expand to adjacent workflows, add integrations, and improve reliability from real usage data.",
            "year_1": "Become a focused operating layer for this problem if adoption and data quality hold up.",
        },
        "is_fallback": is_fallback,
        "demo_warning": "Demo mode: AI API key is not configured. Showing estimated analysis." if is_fallback else "",
    }


def has_keyword(text, keyword):
    return re.search(rf"(?<![a-z0-9]){re.escape(keyword)}(?![a-z0-9])", text) is not None


def deterministic_variation(data):
    seed_text = json.dumps(data, sort_keys=True)
    digest = hashlib.sha256(seed_text.encode("utf-8")).hexdigest()
    return int(digest[:2], 16) % 5 - 2


def criteria_scores(total_score):
    offsets = {
        "problem": 3,
        "uniqueness": -4,
        "impact": 2,
        "mvp_realism": -1,
        "technology": 1,
        "wow_effect": -3,
        "scalability": 0,
        "presentation": -2,
    }
    return {key: max(0, min(100, total_score + offset)) for key, offset in offsets.items()}


def level_from_score(score):
    if score < 46:
        return "Meaningless"
    if score < 61:
        return "Weak"
    if score < 76:
        return "Average"
    if score < 86:
        return "Good"
    return "Top"


def build_strong_points(text, category):
    strengths = [f"Targets a recognizable {category.lower()} domain"]
    if any(term in text for term in ["ai", "ml", "machine learning"]):
        strengths.append("Uses AI to create a judge-visible capability")
    else:
        strengths.append("Can be scoped into a simple MVP")
    if any(term in text for term in ["real-time", "iot", "automation", "government", "citizens"]):
        strengths.append("Has a stronger hackathon theme fit than a generic app")
    else:
        strengths.append("The user workflow can be explained quickly")
    return strengths[:3]


def build_weak_points(text):
    points = [
        "The target user and urgent pain point need to be more specific",
        "The current description does not prove why this is different from existing tools",
        "The demo risk is high unless the team narrows the workflow",
    ]
    if "blockchain" in text or "nft" in text:
        points.append("Web3 elements feel bolted on unless they solve a concrete trust or ownership problem")
    if len(text) < 120:
        points.append("The description is too short to judge feasibility or technical depth")
    return points[:5]


def build_improvements(text, category):
    improvements = [
        f"Choose one high-friction {category.lower()} workflow and build only that path",
        "Add measurable success criteria such as time saved, accuracy, or user completion rate",
        "Prepare a demo with realistic input data and one clear before-and-after moment",
    ]
    if any(term in text for term in ["ai", "ml", "machine learning"]):
        improvements.append("Explain what the AI does, what data it uses, and how errors are handled")
    else:
        improvements.append("Add a technical mechanism that creates a visible advantage in the demo")
    return improvements[:5]


def judge_reason(score):
    if score >= 80:
        return "Judges may pick this if the team proves feasibility with a crisp demo and real-world impact."
    if score >= 65:
        return "Judges may see potential, but the idea needs sharper differentiation and evidence."
    return "Judges are unlikely to pick this unless the team narrows the problem and shows a convincing working prototype."


def infer_archetype(text):
    if "marketplace" in text:
        return "Marketplace"
    if any(term in text for term in ["dashboard", "platform", "iot"]):
        return "Platform"
    if any(term in text for term in ["automation", "ai", "ml", "chatbot"]):
        return "Tool"
    return "App"


def infer_closest_startup(text):
    if "government" in text or "citizens" in text:
        return "GovPilot"
    if "education" in text or "students" in text:
        return "Khan Academy"
    if "tasks" in text or "productivity" in text:
        return "Todoist"
    if "iot" in text or "city" in text:
        return "Sidewalk Labs"
    return "Notion"


def quality_check_results():
    cases = [
        {
            "name": "Weak idea",
            "expected_min": 25,
            "expected_max": 60,
            "input": {
                "name": "StuffSite",
                "description": "A website that does stuff for people in a simple way.",
                "category": "Other",
                "team_size": 1,
                "duration": "24h",
                "stage": "Idea",
            },
        },
        {
            "name": "Medium idea",
            "expected_min": 55,
            "expected_max": 75,
            "input": {
                "name": "EduHelper",
                "description": "AI learning assistant that generates quizzes, explains mistakes, and tracks student progress over time.",
                "category": "Education",
                "team_size": 3,
                "duration": "48h",
                "stage": "Prototype",
            },
        },
        {
            "name": "Strong idea",
            "expected_min": 75,
            "expected_max": 90,
            "input": {
                "name": "PublicFlow",
                "description": (
                    "AI automation platform for government services where citizens upload documents, the system extracts "
                    "data, validates forms, routes requests to departments, and shows real-time status updates."
                ),
                "category": "Government",
                "team_size": 4,
                "duration": "72h",
                "stage": "MVP",
            },
        },
    ]

    results = []
    for case in cases:
        analysis = mock_analyze(case["input"], is_fallback=True)
        actual = analysis["total_score"]
        results.append(
            {
                "name": case["name"],
                "expected_min": case["expected_min"],
                "expected_max": case["expected_max"],
                "actual_score": actual,
                "passed": case["expected_min"] <= actual <= case["expected_max"],
            }
        )
    return results


@app.get("/health")
def health():
    mode = "live" if os.environ.get("GEMINI_API_KEY") else "demo"
    return jsonify({"status": "ok", "mode": mode, "version": VERSION})


@app.get("/")
def index():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    if not data or not data.get("description") or len(data.get("description", "")) < 20:
        return jsonify({"error": True, "message": "Description is too short (minimum 20 characters)"}), 400

    result = analyze_project(data)

    # If analyze_project returned an error dict, send it with HTTP 200
    # so frontend JS can handle it gracefully (not trigger .catch)
    if result.get("error"):
        return jsonify(result), 200

    return jsonify(result), 200


@app.get("/quality-check")
def quality_check():
    return jsonify(quality_check_results())


@app.post("/api/v1/evaluate")
def evaluate():
    if PROJECTBOOST_API_KEY:
        provided_key = request.headers.get("X-API-Key")
        if provided_key != PROJECTBOOST_API_KEY:
            return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json(silent=True) or {}
    error = validate_payload(data)
    if error:
        return jsonify({"error": True, "message": "Description is too short (minimum 20 characters)"}), 400

    result = analyze_project(data)
    if result.get("error"):
        return jsonify(result), 200

    return jsonify(result), 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
