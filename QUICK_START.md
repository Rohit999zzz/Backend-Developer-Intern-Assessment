# Quick Start Guide - How to Run the Application

## Prerequisites
- Node.js installed (v14 or higher)
- npm installed
- MongoDB Atlas account (or local MongoDB)

## Step 1: Set Up Environment Variables

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Create a `.env` file in the `backend` directory:
```bash
# On Windows (PowerShell)
New-Item -Path .env -ItemType File

# On Windows (CMD)
type nul > .env

# On Mac/Linux
touch .env
```

3. Add the following content to `backend/.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Important:** Replace `your_mongodb_atlas_connection_string_here` with your actual MongoDB Atlas connection string.

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Create a `.env` file in the `frontend` directory:
```bash
# On Windows (PowerShell)
New-Item -Path .env -ItemType File

# On Windows (CMD)
type nul > .env

# On Mac/Linux
touch .env
```

3. Add the following content to `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Step 2: Install Dependencies

### Install Backend Dependencies

Open a terminal and run:
```bash
cd backend
npm install
```

### Install Frontend Dependencies

Open another terminal and run:
```bash
cd frontend
npm install
```

## Step 3: Run the Application

### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
Connected to MongoDB
Server is running on port 5000
```

### Terminal 2 - Start Frontend Server

```bash
cd frontend
npm start
```

The browser should automatically open to `http://localhost:3000`

## Step 4: Test the Application

1. **Sign Up:**
   - Go to `http://localhost:3000/signup`
   - Create a new account
   - You'll be redirected to the profile page

2. **Login:**
   - Go to `http://localhost:3000/login`
   - Login with your credentials

3. **Create Admin User:**
   - After signing up, you need to manually make a user admin
   - Connect to MongoDB Atlas
   - Find your user and update the role:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```
   - Or use MongoDB Compass to update the role field to "admin"

4. **Test Admin Dashboard:**
   - Login as admin
   - Navigate to Admin Dashboard
   - You should see all users

## Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct
- Ensure PORT 5000 is not already in use
- Check `.env` file exists and has correct values

### Frontend won't start
- Check if PORT 3000 is not already in use
- Ensure backend is running first
- Check `.env` file has `REACT_APP_API_URL` set

### MongoDB Connection Error
- Verify your MongoDB Atlas connection string
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure database user has proper permissions

### CORS Errors
- Make sure `FRONTEND_URL` in backend `.env` matches your frontend URL
- For development, you can use `*` (not recommended for production)

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Production Build

### Build Frontend
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `frontend/build` folder.

## Common Commands

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm test` - Run tests

### Frontend
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

## Need Help?

- Check the main README.md for detailed documentation
- Review SETUP.md for additional setup information
- Check SUBMISSION_CHECKLIST.md for deployment steps

