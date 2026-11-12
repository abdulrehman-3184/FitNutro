# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

Three services, strictly layered. The browser talks only to the backend; only the backend talks to the AI service, so LLM keys never leave `ai-service/.env`.

| Service | Dir | Stack | Port | Route prefix |
|---|---|---|---|---|
| Frontend | `web/frontend` | React 19, Vite, Tailwind v4, React Router 7 | 3000 | — |
| Backend | `web/backend` | Express 5, TypeScript (NodeNext ESM) | 4000 | `/api` |
| AI service | `ai-service` | FastAPI, Python 3.12+ | 8000 | `/ai` (+ `/health`) |
| Postgres | Docker only | postgres:16 | 5432 | — |

- Backend CORS allows `CLIENT_URL` only; AI service CORS allows only `http://localhost:4000`.
- `DATABASE_URL` is passed to the backend but no DB client/ORM is wired yet.
- **Delivery order: web first, mobile second.** This repo is the web version. the original requirements called the platform mobile-first, but implementation starts with the web portal (see `DECISIONS.md`); `MOBILE`-only features are deferred until the web version is done, so do not scaffold mobile code here.
- Hard product rules (from `PRD.md`): workout-plan changes are suggestions the user must approve; nutrition values are estimates; the chatbot gives no medical diagnoses; trainers only see users who granted permission.

## Docs

- `PRD.md` — the 76 numbered features (labels `MOBILE`, `MOBILE + WEB`, `WEB ADMIN/TRAINER`), delivery phases, open decisions.
- `ARCHITECTURE.md` — services, ports, env, extension points, what is not built yet.
- `TASKS.md` — Phase 1 (web) checklist by feature area, Phase 2 (mobile) stub.
- `DECISIONS.md` — decision log; add a row when something is settled.
- `SECURITY.md` — what protects the app today and the gaps to close before launch.
- `TESTING.md` — no runner installed yet; smoke checks and the proposed per-service setup.

## Extension points (the scaffold is otherwise empty)

- **Backend routes**: mount feature routers in `web/backend/src/routes/index.ts`. `src/app.ts` holds middleware (helmet, cors, json, morgan) and `/api/health`; `src/index.ts` only calls `listen`. Empty dirs `controllers/`, `services/`, `middleware/` are the intended layout. Local imports must use the `.js` extension (NodeNext ESM).
- **AI endpoints**: add to the router in `ai-service/app/routers/ai.py`; `app/main.py` includes it.
- **Frontend API calls**: use `api<T>(path)` from `web/frontend/src/lib/api.ts`. It prepends `${VITE_API_URL}/api`, sends cookies, and throws on non-2xx. Pages go in `src/pages/`, routes are declared in `src/App.tsx`.

## Commands

Copy each service's `.env.example` to `.env` first.

| Service | Command (run inside the service dir) |
|---|---|
| Frontend dev | `npm run dev` |
| Frontend build / lint | `npm run build` (tsc -b + vite build) / `npm run lint` (oxlint) |
| Backend dev | `npm run dev` (tsx watch) |
| Backend build / start | `npm run build` (tsc to `dist/`) / `npm start` |
| AI service | `python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt`, then `uvicorn app.main:app --reload --port 8000` |

Docker (whole stack with hot reload):

```bash
docker compose up --build            # start everything
docker compose up --build backend    # rebuild one service after adding a dependency
docker compose down                  # stop
docker compose down -v               # stop and wipe the local database
```

There is no test setup in any service yet.

## Environment variables

| Service | Vars |
|---|---|
| Frontend | `VITE_API_URL` (browser-side, so always a host-reachable URL like `http://localhost:4000`) |
| Backend | `PORT`, `CLIENT_URL`, `AI_SERVICE_URL`, `DATABASE_URL` |
| AI service | `PORT`, `LLM_API_KEY` |

`docker-compose.yml` overrides `AI_SERVICE_URL` and `DATABASE_URL` with service-name hosts (`ai-service`, `db`); local `.env` files are loaded but not required there.
