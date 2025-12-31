# Deployment Troubleshooting Guide

## Common Deployment Errors and Solutions

### Error: "Cannot find module" or "Missing dependencies"

**Solution:**
- Ensure `package.json` files exist in both `backend/` and `frontend/` directories
- Check that deployment platform is using correct root directory
- Verify build commands are correct:
  - Backend: `npm install` (build), `npm start` (start)
  - Frontend: `npm run build` (build), output: `build`

### Error: "Root directory not found" or "Build directory not found"

**Solution:**
- **Render Backend**: Set Root Directory to `backend`
- **Vercel Frontend**: Set Root Directory to `frontend`
- **Netlify Frontend**: Set Base directory to `frontend`

### Error: "Environment variables not found"

**Solution:**
- Add environment variables in deployment platform settings (NOT in .env files)
- Backend needs:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `NODE_ENV=production`
  - `FRONTEND_URL`
- Frontend needs:
  - `REACT_APP_API_URL`

### Error: "MongoDB connection failed"

**Solution:**
- Verify connection string format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
- Check IP whitelist in MongoDB Atlas (should include `0.0.0.0/0`)
- Verify database user credentials
- Test connection string locally first

### Error: "CORS error" in browser

**Solution:**
- Update `FRONTEND_URL` in backend environment variables
- Ensure it matches frontend URL exactly (with `https://`)
- Redeploy backend after updating

### Error: "Build failed" or "npm install failed"

**Solution:**
- Check Node.js version compatibility
- Clear cache and rebuild
- For Render: Check build logs for specific errors
- Ensure all files are committed to GitHub

### Error: "404 on routes" (React Router)

**Solution:**
- Ensure `vercel.json` (for Vercel) or `netlify.toml` (for Netlify) is in `frontend/` directory
- These files should have rewrite rules for client-side routing

### Error: Submodule arrow still showing on GitHub

**Solution:**
- Run: `git rm --cached frontend`
- Run: `git add frontend/`
- Commit and push: `git commit -m "Fix submodule" && git push`

### Error: "Port already in use"

**Solution:**
- Render: Don't set PORT manually (it's auto-assigned)
- Railway: PORT is auto-set, don't override
- Vercel: No PORT needed (serverless)

### Error: "Frontend can't connect to backend"

**Solution:**
1. Verify backend URL is accessible: Visit `https://your-backend.onrender.com/api/health`
2. Check `REACT_APP_API_URL` in frontend environment variables
3. Ensure backend CORS allows frontend URL
4. Check browser console for specific error messages

---

## Platform-Specific Issues

### Render

**Common Issues:**
- Free tier services spin down after inactivity (15 minutes)
- First request after spin-down takes longer (cold start)
- Build timeout: Ensure build completes in < 10 minutes

**Solutions:**
- Upgrade to paid tier for always-on service
- Use health checks to prevent spin-down
- Optimize build process

### Vercel

**Common Issues:**
- Serverless functions have execution time limits
- Environment variables must start with `REACT_APP_` for frontend
- Client-side routing needs `vercel.json`

**Solutions:**
- Use `vercel.json` for routing
- Ensure all React env vars start with `REACT_APP_`
- Check function logs for timeout errors

### Netlify

**Common Issues:**
- Routing needs `netlify.toml` or `_redirects` file
- Build command must be in correct directory

**Solutions:**
- Ensure `netlify.toml` is in `frontend/` directory
- Set base directory to `frontend` in Netlify settings

---

## Debugging Steps

1. **Check Build Logs:**
   - Go to deployment platform dashboard
   - Check build logs for specific errors
   - Look for npm/node errors

2. **Test Locally:**
   ```bash
   # Backend
   cd backend
   npm install
   npm start
   
   # Frontend
   cd frontend
   npm install
   npm run build
   npm start
   ```

3. **Verify Environment Variables:**
   - Check deployment platform settings
   - Ensure all required variables are set
   - Verify values are correct (no extra spaces)

4. **Check File Structure:**
   - Ensure all files are committed to GitHub
   - Verify root directories are correct
   - Check that package.json files exist

5. **Test API Endpoints:**
   - Use Postman or curl to test backend
   - Check CORS headers
   - Verify authentication flow

---

## Still Having Issues?

1. Share the exact error message from deployment logs
2. Check deployment platform's documentation
3. Verify all configuration settings match this guide
4. Test locally first to isolate the issue

