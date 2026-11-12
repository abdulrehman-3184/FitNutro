# Security

Scope: the web version (Phase 1). Mobile-specific permissions (camera, gallery, push) are Phase 2 but the same consent rules apply.

## In place today

- **Secrets stay server-side.** `LLM_API_KEY` is read only by `ai-service`; the browser never gets it. All `.env*` files are gitignored; commit only `.env.example`.
- **Layered network path.** Browser → backend only. Backend CORS allows `CLIENT_URL`; AI service CORS allows only `http://localhost:4000`.
- **HTTP hardening.** `helmet()` on the Express app.
- **Request logging.** morgan `dev` format (no bodies).

## Product rules (from `PRD.md`)

- Camera, gallery and push notifications require explicit user permission (feature 10, 71, 73).
- Trainers may access only users who granted permission (feature 59–60).
- The chatbot must not give medical diagnoses (features 61–64).
- Workout plan changes are suggestions; the user must approve them (feature 66).
- AI explanations must match the rule or model output that produced them (feature 67).

## Gaps to close before any real users

- No authentication or sessions yet. Plan: cookie sessions (`credentials: 'include'` is already set in `web/frontend/src/lib/api.ts`), hashed passwords, CSRF protection for state-changing routes.
- No authorization/roles (user, trainer, admin).
- Backend → AI service is unauthenticated. CORS does not stop server-to-server callers. Add a shared secret header or keep `ai-service` off the public network.
- No input validation on request bodies. Add schema validation (e.g. zod in Express, Pydantic models in FastAPI).
- No rate limiting on auth or AI endpoints.
- Food photo uploads will need size/type limits and scanning before they reach the AI service.
- Dev CORS origins are hard-coded to localhost; make them env-driven before deploy.

## Reporting

Open an issue or contact the maintainers directly for anything sensitive. Do not file exploit details in public issues.
