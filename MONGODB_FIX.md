# Fix MongoDB Atlas Connection Error

## Problem
```
MongoDB connection error: MongooseServerSelectionError: Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted.
```

## Solution: Whitelist IP Address in MongoDB Atlas

### Step 1: Go to MongoDB Atlas
1. Log in to https://cloud.mongodb.com
2. Select your cluster
3. Click **"Network Access"** in the left sidebar

### Step 2: Add IP Address
1. Click **"Add IP Address"** button
2. You have two options:

   **Option A: Allow from Anywhere (Recommended for deployment)**
   - Click **"Allow Access from Anywhere"**
   - This will add `0.0.0.0/0` to your whitelist
   - Click **"Confirm"**
   - ⚠️ **Note**: This allows connections from any IP address. For production, consider using specific IPs.

   **Option B: Add Render IP Ranges (More Secure)**
   - Render uses dynamic IPs, so you'll need to allow `0.0.0.0/0` anyway
   - For other platforms, you can find their IP ranges in their documentation

### Step 3: Wait for Changes to Take Effect
- Changes usually take effect immediately, but can take up to 1-2 minutes

### Step 4: Verify Connection String
Make sure your `MONGODB_URI` environment variable in Render is correct:

```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/database-name?retryWrites=true&w=majority
```

**Important:**
- Replace `username` with your MongoDB Atlas database user
- Replace `password` with your MongoDB Atlas database password (URL-encoded if special characters)
- Replace `cluster0.xxxxx.mongodb.net` with your actual cluster address
- Replace `database-name` with your database name (e.g., `user-management`)

### Step 5: Redeploy on Render
After updating the IP whitelist:
1. Go to your Render dashboard
2. Your service should auto-redeploy, or
3. Click **"Manual Deploy"** → **"Deploy latest commit"**

## Additional Fixes Applied

✅ Removed deprecated Mongoose options (`useNewUrlParser` and `useUnifiedTopology`)
- These are no longer needed in Mongoose 6+

## Still Having Issues?

1. **Check MongoDB Atlas Connection:**
   - Go to MongoDB Atlas → "Database" → "Connect"
   - Click "Connect your application"
   - Verify the connection string format

2. **Check Database User:**
   - Go to "Database Access"
   - Verify your user has proper permissions
   - Ensure password is correct

3. **Check Environment Variable:**
   - In Render dashboard, go to "Environment"
   - Verify `MONGODB_URI` is set correctly
   - Make sure there are no extra spaces or quotes

4. **Test Connection Locally:**
   - Update your local `.env` with the same connection string
   - Run `npm start` in backend
   - If it works locally, the issue is definitely IP whitelist

