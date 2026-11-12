# FitNutro — Product Requirements (PRD)

Source: `FITNutro_Mobile_and_Web_Features_Updated.docx`

FitNutro is an **AI fitness platform** for web and mobile. **Delivery order: the web version first (user portal + admin/trainer portal), the mobile app second.** The code in this repo is the web version.
Total scope: **76 features** (original 68 + 8 mobile features). The platform split is a recommendation and still needs supervisor approval.

## Platforms

| Platform | Users | Provides |
|---|---|---|
| Mobile app | Fitness users | RepWise, GymIQ, MacroLens, chatbot, history, explainable suggestions, phone features |
| User web portal | Fitness users | Accounts, plans, food uploads/logs, progress, chatbot, explanations |
| Admin/trainer web portal | Admins, trainers | Exercise & food catalogs, feedback, trainer accounts, recommendations |
| Shared backend + AI | All | One set of APIs, database, model services, access control |

**Labels:** `MOBILE` = phone only · `MOBILE + WEB` = both user interfaces · `WEB ADMIN/TRAINER` = staff portal. A shared feature is counted once.

**System flow:** Mobile app / browser → backend (checks access, stores data) → Python AI service (analysis) → result back to user.

> Example: user uploads a food photo on the phone → AI predicts a food category → user confirms food + portion → app saves estimated nutrition → same log is visible on the web portal.

---

## 1. User Management & Personalization (1–10)

- [ ] **1. User Registration** `MOBILE + WEB` — Create an account with basic details.
- [ ] **2. Login and Logout** `MOBILE + WEB` — Securely log in and log out.
- [ ] **3. Forgot Password** `MOBILE + WEB` — Reset a forgotten password.
- [ ] **4. Edit Profile** `MOBILE + WEB` — Change name, personal details, fitness info.
- [ ] **5. Fitness Experience** `MOBILE + WEB` — Select beginner / intermediate / advanced.
- [ ] **6. Available Equipment** `MOBILE + WEB` — Tell the system what equipment is available (e.g. dumbbells, resistance bands).
- [ ] **7. Workout Availability** `MOBILE + WEB` — Select how many days per week the user can exercise.
- [ ] **8. Exercise Preferences** `MOBILE + WEB` — Select exercises the user likes or wants to avoid.
- [ ] **9. Food Preferences** `MOBILE + WEB` — Foods the user prefers or cannot eat.
- [ ] **10. Privacy Settings** `MOBILE + WEB` — Control camera and personal-information permissions.

## 2. RepWise AI — Exercise Analysis (11–23)

Camera-based exercise analysis on mobile; instructions and results also viewable on web.

- [ ] **11. Choose Exercise** `MOBILE + WEB` — Select an exercise (e.g. squats, lunges).
- [ ] **12. Exercise Instructions** `MOBILE + WEB` — Show how to perform the exercise.
- [ ] **13. Camera Access** `MOBILE` — Turn on the camera to start analysis.
- [ ] **14. Body Detection** `MOBILE` — AI finds key body points (shoulders, knees, elbows, hips).
- [ ] **15. Body Angle Checking** `MOBILE` — Measure angles between body parts.
- [ ] **16. Movement Detection** `MOBILE` — Detect up/down phases of a movement.
- [ ] **17. Automatic Rep Counting** `MOBILE` — Count completed repetitions automatically.
- [ ] **18. Set Counting** `MOBILE` — Track completed sets.
- [ ] **19. Exercise Form Checking** `MOBILE` — AI judges whether a supported movement looks correct or incorrect.
- [ ] **20. Form Feedback** `MOBILE` — Simple suggestions about supported movements.
- [ ] **21. Camera Position Warning** `MOBILE` — Warn if the body isn't clearly visible.
- [ ] **22. Save Exercise Session** `MOBILE + WEB` — Save exercises, reps, and sets.
- [ ] **23. Exercise Summary** `MOBILE + WEB` — Post-workout rep count and available feedback.

> **Scope:** Live pose tracking and angle feedback belong to the mobile phase. A browser webcam version is **not** promised. Instruction and session-summary screens appear on both platforms, so they are built in the web phase.

## 3. GymIQ — Workout Planning (24–35)

Create, view, and edit personalized workout plans on mobile or the user web portal.

- [ ] **24. Set Fitness Goals** `MOBILE + WEB` — Choose goals (e.g. build strength, improve fitness).
- [ ] **25. Fitness Questions** `MOBILE + WEB` — Simple questionnaire to assess fitness level.
- [ ] **26. Exercise Suggestions** `MOBILE + WEB` — Suggest exercises based on goals and experience.
- [ ] **27. Create Workout Plan** `MOBILE + WEB` — Generate a workout plan.
- [ ] **28. Select Workout Days** `MOBILE + WEB` — Choose exercise days per week.
- [ ] **29. Alternative Exercises** `MOBILE + WEB` — Suggest substitutes when equipment is missing.
- [ ] **30. Change Exercise Difficulty** `MOBILE + WEB` — Pick easier or harder variations.
- [ ] **31. Weekly Workout Schedule** `MOBILE + WEB` — Organize workouts across the week.
- [ ] **32. Sets, Reps, and Rest Time** `MOBILE + WEB` — Suggest sets, reps, and rest duration.
- [ ] **33. Replace Exercise** `MOBILE + WEB` — Swap an exercise in the plan.
- [ ] **34. Edit Workout Plan** `MOBILE + WEB` — Change schedule and exercises.
- [ ] **35. Update Workout Plan** `MOBILE + WEB` — Suggest changes to future workouts based on completed sessions and feedback.

## 4. MacroLens — Food Recognition & Nutrition (36–46)

Phone camera or photo upload; web portal accepts uploaded pictures.

- [ ] **36. Take or Upload Food Picture** `MOBILE + WEB` — Photograph a meal or pick an existing picture.
- [ ] **37. Check Picture Quality** `MOBILE + WEB` — Verify the photo is clear enough.
- [ ] **38. Recognize Food** `MOBILE + WEB` — AI identifies the food in the picture.
- [ ] **39. Show Other Food Options** `MOBILE + WEB` — Show alternative predictions when AI is unsure.
- [ ] **40. Correct Food Name** `MOBILE + WEB` — User fixes a wrong prediction.
- [ ] **41. Search Food Manually** `MOBILE + WEB` — Search food without a picture.
- [ ] **42. Select Food Quantity** `MOBILE + WEB` — Enter amount eaten (e.g. 100 g rice).
- [ ] **43. Get Nutrition Information** `MOBILE + WEB` — Look up calories, protein, carbs, fats from a nutrition database.
- [ ] **44. Calculate Estimated Calories** `MOBILE + WEB` — Estimate calories/nutrients from food + quantity.
- [ ] **45. Save Meal** `MOBILE + WEB` — Save to the daily food record.
- [ ] **46. Edit or Delete Meal** `MOBILE + WEB` — Change or remove logged meals.

> **Scope:** Phone captures photos; web uploads existing pictures. Nutrition values are **estimates**, not exact readings from images.

## 5. Progress Tracking & Dashboard (47–54)

- [ ] **47. Record Workout Manually** `MOBILE + WEB` — Log a workout without the camera.
- [ ] **48. Workout History** `MOBILE + WEB` — View past completed workouts.
- [ ] **49. Workout Calendar** `MOBILE + WEB` — Planned and completed workouts on a calendar.
- [ ] **50. Weekly Workout Report** `MOBILE + WEB` — Workouts completed this week.
- [ ] **51. Repetition Progress** `MOBILE + WEB` — Rep counts over time.
- [ ] **52. Fitness Goal Progress** `MOBILE + WEB` — Progress toward goals from recorded data.
- [ ] **53. Daily Food Summary** `MOBILE + WEB` — Meals and estimated nutrients for the day.
- [ ] **54. Nutrition Progress Charts** `MOBILE + WEB` — Graphs of food/nutrition intake over time.

## 6. Admin & Trainer Support (55–60) — *tentative*

- [ ] **55. Admin Dashboard** `WEB ADMIN/TRAINER` — Overview of users and app activity.
- [ ] **56. Manage User Complaints** `WEB ADMIN/TRAINER` — View feedback, complaints, reported problems.
- [ ] **57. Manage Exercises** `WEB ADMIN/TRAINER` — Add / update / remove exercises.
- [ ] **58. Manage Food Items** `WEB ADMIN/TRAINER` — Add / update / remove food information.
- [ ] **59. Manage Trainer Accounts** `WEB ADMIN/TRAINER` — Manage trainer profiles and their feature access.
- [ ] **60. Trainer Workout Suggestions** `WEB ADMIN/TRAINER` — Trainers suggest plans and leave notes for users.

> **Requirement:** Trainers may only access users who have **granted permission**.

## 7. AI Chatbot (61–64)

Ask app-related fitness questions via mobile or web chat.

- [ ] **61. Ask the AI Chatbot** `MOBILE + WEB` — Easy answers about app features and how to use them.
- [ ] **62. Ask About RepWise AI** `MOBILE + WEB` — Explain rep count, exercise feedback, body-angle results.
- [ ] **63. Ask About GymIQ** `MOBILE + WEB` — Why a workout was suggested, workout terms, how to edit a plan.
- [ ] **64. Ask About MacroLens** `MOBILE + WEB` — How food was recognized, what nutrition numbers mean, how to correct a meal.

> **Requirement:** No medical diagnosis. Chatbot source material, permissions, and safe boundaries are still to be agreed.

## 8. Explainable AI & Activity-Based Workout Support (65–68)

- [ ] **65. Compare Planned and Completed Workouts** `MOBILE + WEB` — Compare planned vs actual (time, sessions finished).
- [ ] **66. Suggest Workout Adjustments** `MOBILE + WEB` — Suggest changes to a later plan after a missed workout, based on goal, recent activity, and feedback. User can **accept or reject**.
- [ ] **67. Explain AI Decisions** `MOBILE + WEB` — Show the actual reason for a suggestion (missed activity, equipment, chosen goal).
- [ ] **68. Personalized Feedback & Notifications** `MOBILE + WEB` — Supportive progress messages; optional reminders for planned workouts, missed sessions, plan changes.

> **Safety rule:** If a 60-minute workout ends at 50 minutes, explain possible adjustments and **ask for approval**. Never automatically add the missing 10 minutes to the next day.

## 9. Mobile Application Features — New (69–76) — *Phase 2*

- [ ] **69. Mobile Home & Navigation** `MOBILE` — Home screen with tabs for RepWise AI, GymIQ, MacroLens, Progress, Chatbot.
- [ ] **70. First-Time Mobile Setup** `MOBILE` — Short intro; set basic goals and preferences before starting.
- [ ] **71. Phone Camera & Gallery Permissions** `MOBILE` — Ask before using camera/gallery; explain how to change permissions.
- [ ] **72. Live Workout Display on Phone** `MOBILE` — Camera view, rep count, and movement messages on one screen.
- [ ] **73. Mobile Push Notification Delivery** `MOBILE` — With consent, receive reminders and plan suggestions while the app is closed.
- [ ] **74. Save Drafts During Internet Problems** `MOBILE` — Keep unsent workout/meal entries offline and sync later.
- [ ] **75. Upload Progress & Retry** `MOBILE` — Show upload progress; retry failed uploads without losing the entry.
- [ ] **76. Mobile Accessibility Options** `MOBILE` — Clear text, readable buttons, respect phone accessibility settings.

---

## Delivery Phases

| Phase | Scope | Features |
|---|---|---|
| 1 — Web (now) | User web portal + admin/trainer portal, shared backend, AI service | Every `MOBILE + WEB` and `WEB ADMIN/TRAINER` feature |
| 2 — Mobile | Phone app on the same backend | Every `MOBILE`-only feature: 13–21, 69–76 |

Phase 1 builds every shared API so Phase 2 only adds a client plus the camera and device features.

## Feature Count

| Area | IDs | Count |
|---|---|---|
| User Management & Personalization | 1–10 | 10 |
| RepWise AI — Exercise Analysis | 11–23 | 13 |
| GymIQ — Workout Planning | 24–35 | 12 |
| MacroLens — Food Recognition & Nutrition | 36–46 | 11 |
| Progress Tracking & Dashboard | 47–54 | 8 |
| Admin & Trainer Support | 55–60 | 6 |
| AI Chatbot | 61–64 | 4 |
| Explainable AI & Activity-Based Support | 65–68 | 4 |
| Mobile Application Features — New | 69–76 | 8 |
| **Total** | **1–76** | **76** |

## Cross-Cutting Requirements & Constraints

- Web is built first; the mobile app follows on the same backend.
- One shared backend and AI service for all platforms (shared APIs, database, access control).
- Data logged on one platform must be visible on the other (e.g. meals logged on mobile appear on web).
- Live camera analysis (RepWise) ships in the mobile phase; the web has no webcam analysis.
- Nutrition values are presented as estimates.
- AI explanations must match the actual rules or model outputs that produced the suggestion.
- Workout plan changes are suggestions only; the user must approve them.
- Camera, gallery, and push notifications require explicit user permission.
- Trainers may only see users who have granted permission.
- Chatbot must not give medical diagnoses.

## Proposed Tech Stack (not finalized)

| Part | Possible tools | Purpose |
|---|---|---|
| Mobile frontend | React Native + Expo | Phone screens, camera, notifications |
| Web frontend | React + Tailwind CSS | User, admin, and trainer browser screens |
| Main backend | Node.js + Express | Business rules and shared APIs |
| AI service | Python + FastAPI | Exercise, recommendation, food analysis |
| Database / auth / storage | PostgreSQL (Supabase optional) | Accounts, plans, logs, files |
| Cloud / DevOps | Docker, Kubernetes, cloud TBD | Containers, deployment, monitoring |

## Open Decisions Before Sprint 1

- [x] User web portal is required and is built first (decided; see `DECISIONS.md`).
- [ ] Android-only first release, or Android + iOS? Choose mobile framework after a small feasibility test.
- [ ] Choose supported **exercises** and **food categories**; check dataset licenses and training feasibility.
- [ ] Confirm how **GymIQ** qualifies as an AI recommendation system.
- [ ] Agree on **chatbot** source material, permissions, and safe boundaries.
- [ ] Confirm cloud provider, Supabase usage, and UMT tool requirements (Docker/Kubernetes, Jenkins/Selenium or approved replacements).
- [ ] Prioritize all 76 features into **Must Have / Should Have / Could Have** (mobile and AI basics first).

Delivery: two-week Scrum sprints.
