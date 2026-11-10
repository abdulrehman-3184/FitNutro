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

After adding an npm/pip package, rebuild that service: `docker compose up --build backend`.

To use Supabase instead of the local `db`, change `DATABASE_URL` under `backend` in `docker-compose.yml`.
