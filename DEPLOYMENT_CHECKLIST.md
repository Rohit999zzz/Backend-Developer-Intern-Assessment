# Quick Deployment Checklist

Follow these steps in order to deploy your application.

## ✅ Pre-Deployment

- [ ] Application works perfectly locally
- [ ] All tests pass (`cd backend && npm test`)
- [ ] Frontend builds successfully (`cd frontend && npm run build`)
- [ ] GitHub repository is ready (all code committed)

---

## 📦 Step 1: MongoDB Atlas (5 minutes)

- [ ] Create MongoDB Atlas account
- [ ] Create free cluster (M0)
- [ ] Create database user (save username & password)
- [ ] Whitelist IP: `0.0.0.0/0` (Allow from anywhere)
- [ ] Get connection string
- [ ] Test connection string locally

**Connection String Format:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database-name?retryWrites=true&w=majority
```

---

## 🚀 Step 2: Deploy Backend (10-15 minutes)

### Choose Platform: Render (Recommended) / Railway / Vercel

- [ ] Push code to GitHub (make repository public)
- [ ] Sign up for hosting platform
- [ ] Create new web service/project
- [ ] Connect GitHub repository
- [ ] Set Root Directory: `backend`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Add Environment Variables:
  - [ ] `MONGODB_URI` = your MongoDB connection string
  - [ ] `JWT_SECRET` = strong random secret (32+ characters)
  - [ ] `NODE_ENV` = `production`
  - [ ] `FRONTEND_URL` = `https://your-frontend-url.vercel.app` (update after frontend deploy)
- [ ] Deploy and wait for success
- [ ] Copy backend URL (e.g., `https://your-backend.onrender.com`)
- [ ] Test backend: Visit `https://your-backend.onrender.com/api/health`

---

## 🎨 Step 3: Deploy Frontend (5-10 minutes)

### Choose Platform: Vercel (Recommended) / Netlify

- [ ] Sign up for hosting platform
- [ ] Create new project
- [ ] Connect GitHub repository
- [ ] Set Root Directory: `frontend`
- [ ] Set Build Command: `npm run build`
- [ ] Set Output Directory: `build`
- [ ] Add Environment Variable:
  - [ ] `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`
- [ ] Deploy and wait for success
- [ ] Copy frontend URL (e.g., `https://your-app.vercel.app`)
- [ ] Test frontend: Visit your frontend URL

---

## 🔄 Step 4: Update Backend CORS (2 minutes)

- [ ] Go back to backend deployment settings
- [ ] Update `FRONTEND_URL` environment variable:
  ```
  FRONTEND_URL=https://your-app.vercel.app
  ```
- [ ] Redeploy backend (or wait for auto-redeploy)
- [ ] Test: Frontend should now connect to backend

---

## 👤 Step 5: Create Admin User (2 minutes)

- [ ] Sign up on your deployed frontend
- [ ] Go to MongoDB Atlas → Browse Collections
- [ ] Find your database → `users` collection
- [ ] Find your user document
- [ ] Edit: Change `role` from `"user"` to `"admin"`
- [ ] Save
- [ ] Logout and login again
- [ ] Verify: Admin Dashboard link appears

---

## ✅ Step 6: Final Testing (5 minutes)

Test all features on deployed version:

- [ ] Frontend loads correctly
- [ ] Signup works
- [ ] Login works
- [ ] Profile page loads
- [ ] Update profile works
- [ ] Change password works
- [ ] Admin dashboard loads (as admin)
- [ ] View all users works
- [ ] Activate user works
- [ ] Deactivate user works
- [ ] Pagination works
- [ ] Mobile responsive design works

---

## 📝 Step 7: Update Documentation

- [ ] Update README.md with deployment URLs:
  ```markdown
  ## Live Deployment
  - Frontend: https://your-app.vercel.app
  - Backend: https://your-backend.onrender.com
  ```
- [ ] Commit and push changes to GitHub

---

## 🎥 Step 8: Prepare Submission

- [ ] Record 3-5 minute video walkthrough
- [ ] Show all features working on deployed app
- [ ] Upload to Google Drive/YouTube (public/unlisted)
- [ ] Create Word document with:
  - GitHub repository link
  - Frontend deployment link
  - Backend deployment link
  - Video walkthrough link
- [ ] Email to: career@purplemerit.com
- [ ] Subject: "Backend Intern Assessment Submission - [Your Name]"

---

## 🆘 Troubleshooting

### Backend won't deploy
- Check build logs for errors
- Verify environment variables are set
- Check MongoDB connection string format

### Frontend can't connect to backend
- Verify `REACT_APP_API_URL` is correct
- Check backend is running (visit backend URL)
- Verify CORS settings in backend

### CORS errors
- Update `FRONTEND_URL` in backend environment variables
- Ensure it matches frontend URL exactly (with https://)
- Redeploy backend

### MongoDB connection errors
- Verify connection string
- Check IP whitelist (should include 0.0.0.0/0)
- Verify database user credentials

---

## 📞 Quick Reference

**Backend Environment Variables:**
```
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

**Frontend Environment Variables:**
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

**Estimated Total Time: 30-45 minutes**

Good luck! 🚀

