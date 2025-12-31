# Quick Fix for Common Deployment Errors

## If deploying to Render (Backend)

**Check these settings:**
- ✅ Root Directory: `backend`
- ✅ Build Command: `npm install`
- ✅ Start Command: `npm start`
- ✅ Environment Variables: All set correctly

**Common Error Messages:**

### "Cannot find module"
- Solution: Ensure Root Directory is set to `backend`

### "MongoDB connection failed"
- Solution: Check `MONGODB_URI` environment variable
- Verify connection string format
- Check IP whitelist in MongoDB Atlas

### "Port already in use"
- Solution: Remove PORT from env vars (Render auto-assigns)

---

## If deploying to Vercel (Frontend)

**Check these settings:**
- ✅ Root Directory: `frontend`
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `build`
- ✅ Environment Variables: `REACT_APP_API_URL` set

**Common Error Messages:**

### "Build failed"
- Solution: Check Node.js version (should be 18+)
- Verify `package.json` exists in frontend folder

### "404 on routes"
- Solution: Ensure `vercel.json` exists in `frontend/` directory

### "Environment variable not found"
- Solution: Frontend env vars MUST start with `REACT_APP_`

---

## If deploying to Netlify (Frontend)

**Check these settings:**
- ✅ Base directory: `frontend`
- ✅ Build command: `npm run build`
- ✅ Publish directory: `frontend/build`

**Common Error Messages:**

### "Build directory not found"
- Solution: Set Publish directory to `frontend/build` (not just `build`)

### "404 on routes"
- Solution: Ensure `netlify.toml` exists in `frontend/` directory

---

## General Checks

1. **All files committed to GitHub?**
   ```bash
   git status
   git push origin main
   ```

2. **Root Directory correct?**
   - Backend: `backend`
   - Frontend: `frontend`

3. **Environment Variables set?**
   - In deployment platform, NOT in .env files

4. **Build succeeds locally?**
   ```bash
   # Frontend
   cd frontend && npm run build
   
   # Backend
   cd backend && npm install
   ```

---

**Please share:**
1. Deployment platform name
2. Exact error message from logs
3. Which step failed (build, deploy, runtime)

