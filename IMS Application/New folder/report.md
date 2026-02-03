# IMS Lab Report

**Architecture:** Layered MERN application with:
- Frontend: React.js SPA (`frontend`) communicating via REST to the backend.
- Backend: Express.js API (`backend`) with MongoDB (Mongoose) models and JWT authentication.
- Database: MongoDB collection `products` and `users`.

**Implemented Features:**
- Authentication: register/login endpoints using JWTs and hashed passwords.
- Products: CRUD endpoints protected by auth middleware.
- Frontend pages: login, inventory listing, add/edit item forms.

**Role Distribution (suggested for two students):**
- Student 1 (Frontend): Implement `frontend/src` pages, connect to backend, style and validation.
- Student 2 (Backend/DB): Implement `backend` server, models, routes, authentication, and MongoDB setup.

**How to run (local):**
- Backend: cd `backend` -> install dependencies -> configure `.env` (use `.env.example`) -> `npm run dev`.
- Frontend: cd `frontend` -> install dependencies -> `npm start` (ensure proxy of API or run both on same host with CORS).

**Next steps / improvements:**
- Add role-based access control and audit logs.
- Add tests and CI workflow.
- Deploy to a platform (Heroku/Vercel + MongoDB Atlas).
