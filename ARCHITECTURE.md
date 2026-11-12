# Architecture

Delivery order: **web first, mobile second**. This repo is the web version. The mobile app (Phase 2) will be a separate client on the same backend; nothing mobile lives here yet.

## Services

```
Browser ──> web/frontend (React + Vite :3000)
              │  REST  ${VITE_API_URL}/api/...
              ▼
            web/backend (Express 5 + TS :4000)   /api/*   auth, users, workouts, meals, DB
              │  internal HTTP  ${AI_SERVICE_URL}/ai/...
              ▼
            ai-service (FastAPI :8000)           /ai/*    LLM, plan generation, food image analysis
              │
            Postgres 16 (:5432, Docker only)
```

Rules the layering enforces:

- The browser talks only to the backend. Only the backend talks to the AI service, so `LLM_API_KEY` lives only in `ai-service/.env`.
- Backend CORS allows `CLIENT_URL` only (default `http://localhost:3000`), with credentials.
- AI service CORS allows only `http://localhost:4000`.
- Every backend route is under `/api`; every AI route is under `/ai` except `GET /health`.

## Frontend (`web/frontend`)

React 19, Vite, Tailwind v4 (via `@tailwindcss/vite`), React Router 7, oxlint.

- `src/main.tsx` mounts `App`; `src/App.tsx` declares routes; pages live in `src/pages/`; `src/components/` is empty.
- All HTTP goes through `api<T>(path)` in `src/lib/api.ts`: prepends `${VITE_API_URL}/api`, sets JSON headers, sends cookies, throws on non-2xx.
- Production image is nginx (`nginx.conf`) with SPA fallback to `index.html`.

## Backend (`web/backend`)

Express 5, TypeScript, NodeNext ESM (local imports need `.js`).

- `src/index.ts` loads dotenv and listens on `PORT`.
- `src/app.ts` wires helmet, cors, `express.json`, morgan, `GET /api/health`, and mounts `src/routes/index.ts` at `/api`.
- `src/routes/index.ts` is where feature routers mount (`/auth`, `/workouts`, `/meals`, ...). `controllers/`, `services/`, `middleware/` exist but are empty.
- `DATABASE_URL` is passed in but **no DB client or ORM is installed yet**.

## AI service (`ai-service`)

FastAPI, Python 3.12+, uvicorn.

- `app/main.py` creates the app, CORS, `GET /health`, and includes `app/routers/ai.py` (prefix `/ai`, currently empty).
- Dependencies: fastapi, uvicorn, pydantic-settings, python-dotenv. No LLM SDK installed yet.

## Environment

| Service | Variables | Docker override |
|---|---|---|
| frontend | `VITE_API_URL` | stays `http://localhost:4000` (browser-side) |
| backend | `PORT`, `CLIENT_URL`, `AI_SERVICE_URL`, `DATABASE_URL` | `AI_SERVICE_URL=http://ai-service:8000`, `DATABASE_URL=postgresql://fitnutro:fitnutro@db:5432/fitnutro` |
| ai-service | `PORT`, `LLM_API_KEY` | — |

`docker-compose.yml` runs all four containers with bind mounts and hot reload. Postgres data persists in the `pgdata` volume.

## Not built yet

Auth, any feature route, DB access, any AI endpoint, file upload for food photos, tests. See `TASKS.md`.
