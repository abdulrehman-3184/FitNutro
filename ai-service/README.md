# FitNutro AI Service (FastAPI)

Handles LLM calls, meal/workout plan generation and food image analysis.
Only the Express backend calls it.

## Setup
1. Install Python 3.12+
2. `python -m venv .venv`
3. Activate: `.venv\Scripts\activate` (Windows) or `source .venv/bin/activate`
4. `pip install -r requirements.txt`
5. `cp .env.example .env` and fill in `LLM_API_KEY`
6. `uvicorn app.main:app --reload --port 8000`

Health check: `GET http://localhost:8000/health`
