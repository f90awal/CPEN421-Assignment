# Inventory Management System (IMS) - MERN Stack

This workspace contains a minimal MERN-stack Inventory Management System lab scaffold.

Folders:
- `backend` - Node.js + Express server, MongoDB models, auth, product CRUD routes
- `frontend` - React app with login, inventory list, and item form

See `report.md` for a short implementation report and responsibilities.

Run locally
```
# Backend
cd backend
npm install
cp .env.example .env   # edit if needed
npm run seed           # populate sample user/products
npm run dev

# Frontend
cd ../frontend
npm install
npm start
```
