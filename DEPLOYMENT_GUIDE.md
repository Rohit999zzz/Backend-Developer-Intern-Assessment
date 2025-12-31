# Deployment Guide - Step by Step

This guide will help you deploy your User Management System to production.

## Prerequisites
- ✅ Application running locally
- ✅ MongoDB Atlas account (or create one at https://www.mongodb.com/cloud/atlas)
- ✅ GitHub account (for deployment)
- ✅ Render/Railway account (for backend) OR Vercel account
- ✅ Vercel/Netlify account (for frontend)

---

## Part 1: MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Click "Build a Database"
4. Choose **FREE** tier (M0)
5. Select a cloud provider and region (choose closest to you)
6. Click "Create"

### Step 2: Create Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (save these!)
5. Set privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

### Step 3: Whitelist IP Address

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ For production, use specific IPs
4. Click "Confirm"

### Step 4: Get Connection String

1. Go to "Database" → "Connect"
2. Click "Connect your application"
3. Choose "Node.js" and version "5.5 or later"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with your database name (e.g., `user-management`)

**Example:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/user-management?retryWrites=true&w=majority
```

---

## Part 2: Backend Deployment

### Option A: Deploy to Render (Recommended - Free Tier Available)

#### Step 1: Prepare GitHub Repository

1. Initialize git (if not done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create GitHub repository:
   - Go to https://github.com/new
   - Create a new repository
   - **Make it PUBLIC** (required for free tier)
   - Don't initialize with README

3. Push to GitHub:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy on Render

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Select your repository
5. Configure:
   - **Name**: `user-management-backend` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

6. Add Environment Variables:
   - Click "Advanced" → "Add Environment Variable"
   - Add these variables:
     ```
     PORT=10000
     MONGODB_URI=your_mongodb_atlas_connection_string
     JWT_SECRET=your_super_secret_jwt_key_here
     NODE_ENV=production
     FRONTEND_URL=https://your-frontend-url.vercel.app
     ```
   - ⚠️ **Important**: Use your actual MongoDB connection string and a strong JWT secret

7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Copy your backend URL (e.g., `https://user-management-backend.onrender.com`)

---

### Option B: Deploy to Railway

1. Go to https://railway.app and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Click on the service → "Settings"
5. Set Root Directory to `backend`
6. Add Environment Variables:
   - `PORT` (Railway sets this automatically, but you can override)
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-frontend-url.vercel.app`
7. Railway will auto-deploy
8. Copy your backend URL

---

### Option C: Deploy to Vercel (Backend)

1. Go to https://vercel.com and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-frontend-url.vercel.app`

6. Deploy
7. Copy your backend URL

---

## Part 3: Frontend Deployment

### Option A: Deploy to Vercel (Recommended)

#### Step 1: Update Frontend Environment

1. Update `frontend/.env` or create `frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```
Replace with your actual backend URL from Part 2.

#### Step 2: Deploy to Vercel

1. Go to https://vercel.com and sign up/login
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

5. Add Environment Variables:
   - `REACT_APP_API_URL`: `https://your-backend-url.onrender.com/api`

6. Click "Deploy"
7. Wait for deployment (2-5 minutes)
8. Copy your frontend URL (e.g., `https://your-app.vercel.app`)

#### Step 3: Update Backend CORS

1. Go back to your backend deployment (Render/Railway/Vercel)
2. Update the `FRONTEND_URL` environment variable:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Redeploy the backend (or it will auto-redeploy)

---

### Option B: Deploy to Netlify

1. Go to https://netlify.com and sign up/login
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`

5. Add Environment Variables:
   - `REACT_APP_API_URL`: `https://your-backend-url.onrender.com/api`

6. Click "Deploy site"
7. Copy your frontend URL

---

## Part 4: Update Environment Variables

### Backend Environment Variables (Production)

Update these in your hosting platform:

```
PORT=10000 (or auto-set by platform)
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend Environment Variables (Production)

```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

---

## Part 5: Create Admin User

After deployment, you need to create an admin user:

### Method 1: Using MongoDB Atlas

1. Go to MongoDB Atlas → "Browse Collections"
2. Find your database → `users` collection
3. Find your user document
4. Click "Edit Document"
5. Change `"role": "user"` to `"role": "admin"`
6. Save

### Method 2: Using MongoDB Compass

1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect using your MongoDB Atlas connection string
3. Navigate to your database → `users` collection
4. Find your user and update the role field

### Method 3: Using MongoDB Shell

```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

---

## Part 6: Testing Deployment

### Test Checklist

1. ✅ **Frontend loads**: Visit your frontend URL
2. ✅ **Signup works**: Create a new account
3. ✅ **Login works**: Login with credentials
4. ✅ **Profile page works**: View and edit profile
5. ✅ **Admin dashboard works**: Login as admin, view all users
6. ✅ **Activate/Deactivate works**: Test admin functions
7. ✅ **Password change works**: Test password update
8. ✅ **Mobile responsive**: Test on mobile device

### Common Issues & Solutions

#### Issue: CORS Error
**Solution**: 
- Check `FRONTEND_URL` in backend environment variables
- Ensure it matches your frontend URL exactly (with https://)
- Redeploy backend after updating

#### Issue: MongoDB Connection Error
**Solution**:
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas (should include 0.0.0.0/0 or your server IP)
- Verify database user credentials

#### Issue: Frontend can't connect to backend
**Solution**:
- Verify `REACT_APP_API_URL` in frontend environment variables
- Check backend URL is accessible (visit it in browser)
- Ensure backend is deployed and running

#### Issue: 404 on routes
**Solution**:
- For Vercel/Netlify, create `vercel.json` or `netlify.toml` for routing
- See below for configuration files

---

## Part 7: Additional Configuration Files

### For Vercel Frontend (vercel.json)

Create `frontend/vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### For Netlify Frontend (netlify.toml)

Create `frontend/netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Part 8: Final Steps

1. ✅ Update README.md with your deployment URLs
2. ✅ Test all functionality on deployed version
3. ✅ Create admin user
4. ✅ Test admin dashboard
5. ✅ Record video walkthrough showing deployed app
6. ✅ Prepare submission document

---

## Quick Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Connection string obtained
- [ ] Backend deployed
- [ ] Backend URL obtained
- [ ] Frontend environment variable updated
- [ ] Frontend deployed
- [ ] Frontend URL obtained
- [ ] Backend CORS updated with frontend URL
- [ ] Backend redeployed
- [ ] Admin user created
- [ ] All features tested
- [ ] URLs documented in README

---

## Deployment URLs Template

Add these to your README.md:

```markdown
## Live Deployment

- **Frontend**: https://your-app.vercel.app
- **Backend API**: https://your-backend.onrender.com
- **API Health Check**: https://your-backend.onrender.com/api/health
```

---

## Need Help?

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com

Good luck with your deployment! 🚀

