import json
import os
import sys

import requests


BASE_URL = "http://localhost:5000"
GREEN = "\033[92m"
RED = "\033[91m"
RESET = "\033[0m"


def colorize(text, color):
    return f"{color}{text}{RESET}"


def load_cases():
    path = os.path.join(os.path.dirname(__file__), "test_cases.json")
    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)


def has_non_empty_field(response_json, field):
    value = response_json.get(field)
    if value is None:
        return False
    if isinstance(value, (list, dict, str)):
        return bool(value)
    return True


def run_case(case):
    try:
        response = requests.post(
            f"{BASE_URL}/analyze",
            json=case["input"],
            timeout=20,
        )
    except requests.exceptions.ConnectionError:
        return False, "Could not connect to Flask app at http://localhost:5000"
    except requests.exceptions.RequestException as exc:
        return False, f"Request failed: {exc}"

    if response.status_code != 200:
        return False, f"Expected HTTP 200, got {response.status_code}: {response.text}"

    try:
        payload = response.json()
    except ValueError:
        return False, "Response was not valid JSON"

    score = payload.get("total_score")
    if not isinstance(score, int):
        return False, "total_score is missing or is not an integer"

    min_score = case["expected_min_score"]
    max_score = case["expected_max_score"]
    if not min_score <= score <= max_score:
        return False, f"Score {score} outside expected range {min_score}-{max_score}"

    for field in case["must_include"]:
        if not has_non_empty_field(payload, field):
            return False, f"Required field '{field}' missing or empty"

    return True, f"Score {score} in expected range {min_score}-{max_score}"


def main():
    cases = load_cases()
    passed = 0

    for case in cases:
        ok, message = run_case(case)
        if ok:
            passed += 1
            print(colorize(f"PASS {case['name']} - {message}", GREEN))
        else:
            print(colorize(f"FAIL {case['name']} - {message}", RED))

    total = len(cases)
    percent = round((passed / total) * 100)
    print(f"{passed}/{total} tests passed ({percent}%)")
    return 0 if passed == total else 1


if __name__ == "__main__":
    sys.exit(main())
