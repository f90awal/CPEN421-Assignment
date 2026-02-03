# Deployment Guide for Inventory Management System

This guide covers deploying your MERN stack Inventory Management System to production.

## Prerequisites

- MongoDB Atlas account (already configured)
- Git repository (GitHub, GitLab, or Bitbucket)
- Accounts on deployment platforms (choose one):
  - **Backend**: Railway, Render, Heroku, or Vercel
  - **Frontend**: Vercel, Netlify, or GitHub Pages

---

## Option 1: Deploy with Railway (Recommended - Easy & Free)

### Backend Deployment (Railway)

1. **Sign up** at [railway.app](https://railway.app) (use GitHub to sign in)

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Select the `backend` folder

3. **Configure Environment Variables**
   - Go to Variables tab
   - Add these variables:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_strong_secret_key_here
     PORT=5000
     NODE_ENV=production
     ```

4. **Deploy**
   - Railway will auto-detect Node.js
   - It will run `npm install` and `npm start`
   - Your backend will be live at `https://your-app-name.railway.app`

5. **Note the Backend URL** - You'll need this for frontend configuration

### Frontend Deployment (Vercel)

1. **Sign up** at [vercel.com](https://vercel.com) (use GitHub to sign in)

2. **Import Project**
   - Click "Add New Project"
   - Import your GitHub repository
   - Set Root Directory to `frontend`

3. **Configure Build Settings**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Add Environment Variable**
   - Go to Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.railway.app
     ```

5. **Deploy**
   - Click "Deploy"
   - Your frontend will be live!

---

## Option 2: Deploy with Render

### Backend Deployment (Render)

1. **Sign up** at [render.com](https://render.com)

2. **Create New Web Service**
   - Connect your GitHub repository
   - Select the `backend` folder
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**
   ```
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_strong_secret_key_here
   PORT=5000
   NODE_ENV=production
   ```

4. **Deploy** - Render will provide a URL like `https://your-app.onrender.com`

### Frontend Deployment (Render)

1. **Create New Static Site**
   - Connect your GitHub repository
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `build`

2. **Environment Variable**
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```

---

## Option 3: Deploy with Heroku

### Backend Deployment (Heroku)

1. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   cd backend
   heroku create your-app-name-backend
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI=your_mongodb_atlas_connection_string
   heroku config:set JWT_SECRET=your_strong_secret_key_here
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push heroku main
   ```

### Frontend Deployment (Netlify)

1. **Sign up** at [netlify.com](https://netlify.com)

2. **Deploy Site**
   - Connect to GitHub
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

3. **Environment Variables**
   - Site settings → Environment variables
   - Add: `REACT_APP_API_URL=https://your-backend-url.herokuapp.com`

---

## MongoDB Atlas Configuration

1. **Whitelist IP Addresses**
   - Go to MongoDB Atlas → Network Access
   - Add `0.0.0.0/0` to allow all IPs (or specific deployment IPs)

2. **Get Connection String**
   - Go to Database → Connect
   - Copy your connection string
   - Replace `<password>` with your actual password

---

## Post-Deployment Checklist

- [ ] Backend is accessible and returns "IMS backend running" at root URL
- [ ] Frontend can connect to backend API
- [ ] Login functionality works
- [ ] CORS is properly configured (backend allows frontend domain)
- [ ] Environment variables are set correctly
- [ ] MongoDB connection is working
- [ ] Test all CRUD operations

---

## Troubleshooting

### CORS Errors
If you see CORS errors, update `backend/server.js`:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

### Environment Variables Not Working
- Frontend: Variables must start with `REACT_APP_`
- Backend: Restart server after adding variables
- Rebuild frontend after changing environment variables

### Build Failures
- Check Node.js version (should be 14+)
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors

---

## Quick Deploy Commands

### Local Testing Before Deployment

**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
REACT_APP_API_URL=http://localhost:5000 npm start
```

---

## Recommended Platform Combinations

1. **Easiest**: Railway (Backend) + Vercel (Frontend)
2. **Free Tier**: Render (Both)
3. **Traditional**: Heroku (Backend) + Netlify (Frontend)

---

## Security Notes

- Never commit `.env` files
- Use strong JWT secrets
- Keep MongoDB credentials secure
- Enable HTTPS in production
- Consider adding rate limiting for production

---

## Need Help?

Check platform-specific documentation:
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Heroku Docs](https://devcenter.heroku.com)
