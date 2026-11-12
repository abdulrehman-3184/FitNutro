# Tasks

Web first, mobile second. Feature numbers refer to `PRD.md`. Two-week sprints.

## Phase 1 — Web

### Foundation
- [ ] Pick DB access (Postgres driver or ORM) and wire `DATABASE_URL` in `web/backend`
- [ ] Initial schema: users, profiles, exercises, foods, workouts, meals
- [ ] Session/cookie auth middleware in `web/backend/src/middleware/`
- [ ] Pick LLM SDK for `ai-service` and read `LLM_API_KEY` via pydantic-settings
- [ ] Shared-secret or network rule so only the backend can call `ai-service`
- [ ] Test runners per service (see `TESTING.md`)

### User Management & Personalization (1–10)
- [ ] `/api/auth` register, login, logout, forgot password (1–3)
- [ ] `/api/users/me` profile, experience, equipment, availability, preferences, privacy (4–10)
- [ ] Frontend: auth pages, profile/onboarding form

### GymIQ — Workout Planning (24–35)
- [ ] `/ai/workout-plan` generation from goals + questionnaire
- [ ] `/api/workouts` plan CRUD, weekly schedule, swap/difficulty/alternatives
- [ ] Frontend: goals, questionnaire, plan view/edit

### MacroLens — Food (36–46, web = photo upload)
- [ ] Image upload endpoint + storage decision
- [ ] `/ai/food` recognise, alternatives, quality check
- [ ] Nutrition database source; `/api/foods` search; `/api/meals` log CRUD
- [ ] Frontend: upload, confirm food + quantity, daily log

### RepWise — web parts only (11, 12, 22, 23)
- [ ] Exercise catalog + instructions; session save and summary API (camera features are Phase 2)

### Progress & Dashboard (47–54)
- [ ] Manual workout log, history, calendar, weekly report, goal and nutrition charts

### Admin & Trainer portal (55–60) — tentative
- [ ] Roles; exercise/food catalog CRUD; complaints; trainer accounts; trainer→user permission grant

### AI Chatbot (61–64)
- [ ] `/ai/chat` with app-only scope and no-medical-diagnosis guard; frontend chat panel

### Explainable AI (65–68)
- [ ] Planned-vs-completed comparison, adjustment suggestions with accept/reject, reason text, notifications

## Phase 2 — Mobile (not in this repo yet)

- [ ] Choose framework (proposed React Native + Expo) after feasibility test
- [ ] Camera/pose features 13–21
- [ ] Mobile-only features 69–76
- [ ] Reuse every Phase 1 `/api` endpoint unchanged
