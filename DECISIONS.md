# Decisions

Lightweight decision log. Add a row when something is settled; move pending items up when decided.

## Decided

| # | Date | Decision | Why |
|---|---|---|---|
| 1 | 2026-11-12 | **Build the web version first, mobile app second.** The source requirements doc called the platform mobile-first; that is reversed. | Web portal + admin portal exercise every shared API without camera/device work; mobile then only adds a client. |
| 2 | 2026-11-11 | Frontend never calls the AI service; all AI traffic goes browser → Express → FastAPI. | Keeps LLM keys server-side; one place for access control. |
| 3 | 2026-11-11 | Two backends: Express (business rules, DB) and FastAPI (AI). | Python ecosystem for models; Node for the web API. Matches the PRD stack. |
| 4 | 2026-11-11 | Postgres 16 in Docker for local dev; Supabase optional by swapping `DATABASE_URL`. | Zero-setup local DB; cloud choice deferred. |
| 5 | 2026-11-11 | Frontend: React 19 + Vite + Tailwind v4 + React Router 7, linted with oxlint. | Vite template defaults; fast toolchain. |
| 6 | 2026-11-11 | Backend TypeScript as NodeNext ESM (`.js` import extensions). | Native ESM, no bundler for the server. |
| 7 | 2026-11-13 | Frontend animation library is Framer Motion (`motion` package, `motion/react`). gsap was tried and removed. | Declarative React API, scroll-linked hooks, built-in reduced-motion handling; user preference. |

## Pending (from `PRD.md`)

| Question | Options | Owner |
|---|---|---|
| Android-only first mobile release, or Android + iOS? | Decide after a small feasibility test | — |
| Mobile framework | Proposed React Native + Expo | — |
| Supported exercises and food categories; dataset licences | — | — |
| How GymIQ qualifies as an AI recommendation system | — | — |
| Chatbot source material, permissions, safe boundaries | — | — |
| Cloud provider, Supabase usage, UMT tooling (Docker/Kubernetes, Jenkins/Selenium or replacements) | — | — |
| MoSCoW priority of all 76 features | Web and AI basics first | — |
| DB access layer for the backend | Driver vs ORM | — |
| LLM provider / SDK for `ai-service` | — | — |
| Admin & trainer portal confirmed in scope? | Marked tentative in PRD | — |
