# Testing

## Current state

**No test runner is installed in any service.** The only automated check is the frontend lint.

```bash
cd web/frontend && npm run lint      # oxlint
cd web/frontend && npm run build     # tsc -b + vite build (type-checks)
cd web/backend  && npm run build     # tsc (type-checks)
```

## Smoke checks that work today

With `docker compose up --build` (or the three dev servers) running:

| Check | Expect |
|---|---|
| `curl localhost:4000/api/health` | `{"status":"ok"}` |
| `curl localhost:8000/health` | `{"status":"ok"}` |
| Open http://localhost:3000 | Landing page renders with the hero phone image |
| http://localhost:8000/docs | FastAPI Swagger UI loads |

## Proposed setup (not installed yet)

| Service | Runner | Scope |
|---|---|---|
| `web/frontend` | Vitest + React Testing Library | components, `lib/api.ts` |
| `web/backend` | Vitest + supertest against `app` from `src/app.ts` (no `listen`) | route handlers, middleware |
| `ai-service` | pytest + FastAPI `TestClient` | routers, prompt builders |

`src/app.ts` already exports `app` without listening, so backend route tests need no running server.

## Rules once tests exist

- Each feature router ships with at least one request-level test.
- AI endpoints are tested with the LLM call mocked; no network in unit tests.
- Safety rules from `PRD.md` (no medical diagnosis, plan changes need approval, trainer permission check) each get an explicit test.
- Phase 2 (mobile) adds its own suite in its own repo.
