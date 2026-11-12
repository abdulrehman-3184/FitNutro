# FitNutro

AI-powered fitness & nutrition web app.

```
Browser ──> web/frontend (React + Vite :3000)
              │  REST (VITE_API_URL)
              ▼
            web/backend (Express + TS :4000)  ── auth, users, workouts, meals, DB
              │  internal HTTP (AI_SERVICE_URL)
              ▼
            ai-service (FastAPI :8000)        ── LLM / AI features
```

The frontend only talks to the backend, so AI keys stay server-side.

## Run
Requires Node and [uv](https://docs.astral.sh/uv/) (uv fetches Python 3.12 for the AI service).

```bash
npm install    # installs frontend, backend, and ai-service (.venv) deps
npm run dev    # starts all three
```

Or run each service separately:

| Service  | Dir            | Command                                       |
|----------|----------------|-----------------------------------------------|
| Frontend | `web/frontend` | `npm run dev`                                 |
| Backend  | `web/backend`  | `npm run dev`                                 |
| AI       | `ai-service`   | `uvicorn app.main:app --reload --port 8000`  |

Copy each `.env.example` to `.env` first.

## Run with Docker
Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

```bash
docker compose up --build      # start everything (hot reload on)
docker compose down            # stop
docker compose down -v         # stop and wipe the local database
```

| Service    | URL                          |
|------------|------------------------------|
| Frontend   | http://localhost:3000        |
| Backend    | http://localhost:4000/api/health |
| AI service | http://localhost:8000/health (docs at `/docs`) |
| Postgres   | `postgresql://fitnutro:fitnutro@localhost:5432/fitnutro` |

Source folders are bind-mounted and each container runs `npm install` / `pip install` on start, so code edits hot-reload and new packages only need a restart: `docker compose restart frontend`.

To use Supabase instead of the local `db`, change `DATABASE_URL` under `backend` in `docker-compose.yml`.
