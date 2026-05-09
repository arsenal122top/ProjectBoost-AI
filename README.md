# ProjectBoost AI ⚡

> AI-powered hackathon project evaluator for scoring ideas, giving concrete critique, and helping teams build stronger demos.

## ProjectBoost AI

ProjectBoost AI evaluates hackathon project ideas using a structured scoring schema and returns a full judge-style assessment. It is built as a Flask web app with live Gemini-powered AI analysis and a demo mode when no live key is configured.

## Features

- AI-powered project evaluation with eight criteria
- Structured JSON scoring and feedback
- Demo mode when `GEMINI_API_KEY` is missing
- Protected API endpoint with optional `PROJECTBOOST_API_KEY`
- Built-in quality-check endpoint using deterministic mock analysis
- Simple Flask frontend and backend for fast deployment

## Demo Mode

If `GEMINI_API_KEY` is not set, the app runs in demo mode and returns a structured fallback response instead of calling Gemini. This lets the UI still work for local testing and onboarding.

## Installation

Open PowerShell and run:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Environment Variables

Create `.env` from the example file:

```powershell
copy .env.example .env
```

Then edit `.env` and set your keys. Required values:

- `GEMINI_API_KEY=your_gemini_api_key_here`
- `PROJECTBOOST_API_KEY=your_projectboost_api_key_here`
- `PORT=5000`

Live AI analysis uses Gemini via the `gemini-2.5-flash-lite` endpoint.

## Run Locally

Start the application in PowerShell:

```powershell
python app.py
```

Then open:

```text
http://localhost:5000
```

## Deployment

For Flask deployment, use the `Procfile` entry:

```text
web: gunicorn app:app
```

Set environment variables in the hosting dashboard and ensure the app binds to `0.0.0.0` with `PORT`.

## Tech Stack

- Python
- Flask
- httpx
- python-dotenv
- Gunicorn

## Security Notes

- `.env` is excluded from version control via `.gitignore`
- Do not commit real API keys
- Use `.env.example` as the public template
- Protect `POST /api/v1/evaluate` with `PROJECTBOOST_API_KEY` if enabled
