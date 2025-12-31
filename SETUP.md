# Quick Setup Guide

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following:

```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Frontend Environment Variables

Create a `.env` file in the `frontend` directory with the following:

```
REACT_APP_API_URL=http://localhost:5000/api
```

For production, update `REACT_APP_API_URL` to your deployed backend URL.

## Running the Application

### Development Mode

1. **Start Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Testing

Run backend tests:
```bash
cd backend
npm test
```

## Creating an Admin User

To create an admin user, you can either:

1. Manually update the user in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

2. Or modify the signup route temporarily to create admin users.

## Deployment Checklist

- [ ] Set environment variables on hosting platform
- [ ] Update CORS settings in backend
- [ ] Update frontend API URL for production
- [ ] Test all endpoints
- [ ] Verify database connection
- [ ] Test authentication flow
- [ ] Test admin functions
- [ ] Test user profile functions

