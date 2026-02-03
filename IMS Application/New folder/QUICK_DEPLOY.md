# Quick Deployment Guide

## 🚀 Fastest Way to Deploy

### Step 1: Prepare Your Code
```bash
# Make sure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy Backend (Railway - Free)

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo and choose `backend` folder
4. Add environment variables:
   - `MONGODB_URI` = Your MongoDB Atlas connection string
   - `JWT_SECRET` = Any strong random string
   - `PORT` = 5000
   - `FRONTEND_URL` = (will add after frontend deploys)
5. Copy your backend URL (e.g., `https://your-app.railway.app`)

### Step 3: Deploy Frontend (Vercel - Free)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project" → Import your repo
3. Set Root Directory to `frontend`
4. Add environment variable:
   - `REACT_APP_API_URL` = Your backend URL from Step 2
5. Click "Deploy"

### Step 4: Update Backend CORS

1. Go back to Railway backend settings
2. Add environment variable:
   - `FRONTEND_URL` = Your Vercel frontend URL
3. Redeploy backend

### Step 5: Test

Visit your Vercel URL and test login with:
- Email: `admin@example.com`
- Password: `password123`

---

## 📝 Environment Variables Summary

### Backend (.env or Railway)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ims
JWT_SECRET=your-super-secret-key-here
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

### Frontend (.env or Vercel)
```
REACT_APP_API_URL=https://your-backend.railway.app
```

---

## ✅ That's It!

Your app should now be live! Check `DEPLOYMENT.md` for detailed instructions and troubleshooting.
