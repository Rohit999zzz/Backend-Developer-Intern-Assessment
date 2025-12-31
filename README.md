# User Management System

A full-stack web application for managing user accounts with role-based access control (RBAC), authentication, and user lifecycle management.

## Project Overview

This User Management System is a comprehensive web application that allows administrators to manage user accounts and enables users to manage their own profiles. The system implements secure authentication using JWT tokens, role-based access control, and provides a modern, responsive user interface.

### Key Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Role-Based Access Control**: Admin and user roles with appropriate permissions
- **User Management**: Admin can view, activate, and deactivate users
- **Profile Management**: Users can view and update their profile information
- **Password Management**: Secure password change functionality
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (MongoDB Atlas)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **Validation**: express-validator
- **Testing**: Jest + Supertest

### Frontend
- **Framework**: React 19.2.3
- **Routing**: React Router DOM 7.11.0
- **HTTP Client**: Axios 1.13.2
- **Styling**: CSS3 with responsive design

### Deployment
- **Backend**: Render / Railway / Heroku / Vercel
- **Frontend**: Vercel / Netlify
- **Database**: MongoDB Atlas (Cloud-hosted)

## Project Structure

```
.
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   └── admin.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── tests/
│   │   ├── auth.test.js
│   │   ├── users.test.js
│   │   └── admin.test.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── Toast.js
│   │   │   ├── Modal.js
│   │   │   └── LoadingSpinner.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Profile.js
│   │   │   └── AdminDashboard.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend application will run on `http://localhost:3000`

## Environment Variables

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-key` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000/api` |

## API Documentation

### Authentication Endpoints

#### POST /api/auth/signup
Register a new user.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "user",
      "status": "active"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST /api/auth/login
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "user",
      "status": "active"
    },
    "token": "jwt_token_here"
  }
}
```

#### GET /api/auth/me
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "john@example.com",
      "fullName": "John Doe",
      "role": "user",
      "status": "active",
      "createdAt": "2025-12-29T...",
      "updatedAt": "2025-12-29T...",
      "lastLogin": "2025-12-29T..."
    }
  }
}
```

#### POST /api/auth/logout
Logout (client-side token removal).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

### User Endpoints

#### GET /api/users/profile
Get user's own profile (requires authentication).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

#### PUT /api/users/profile
Update user's profile (requires authentication).

**Request Body:**
```json
{
  "fullName": "John Updated",
  "email": "john.updated@example.com"
}
```

#### PUT /api/users/change-password
Change user's password (requires authentication).

**Request Body:**
```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewPassword123"
}
```

### Admin Endpoints

#### GET /api/admin/users
Get all users with pagination (admin only).

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Users per page (default: 10)
- `search` (optional): Search by email or name
- `role` (optional): Filter by role (admin/user)
- `status` (optional): Filter by status (active/inactive)

**Headers:**
```
Authorization: Bearer jwt_token_here
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 50,
      "usersPerPage": 10
    }
  }
}
```

#### PUT /api/admin/users/:userId/activate
Activate a user account (admin only).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

#### PUT /api/admin/users/:userId/deactivate
Deactivate a user account (admin only).

**Headers:**
```
Authorization: Bearer jwt_token_here
```

## Testing

### Backend Tests

Run the test suite:
```bash
cd backend
npm test
```

The test suite includes:
- Authentication tests (signup, login, token validation)
- User management tests (profile, password change)
- Admin function tests (user listing, activate/deactivate)

## Live Deployment

**Note**: Update these URLs after deployment.

- **Frontend**: [Your Frontend URL](https://your-app.vercel.app)
- **Backend API**: [Your Backend URL](https://your-backend.onrender.com)
- **API Health Check**: [Health Endpoint](https://your-backend.onrender.com/api/health)

---

## Deployment Instructions

### Quick Deployment Guide

For detailed step-by-step instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) or [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md).

### Backend Deployment (Render/Railway)

1. **Prepare for deployment:**
   - Ensure all environment variables are set in your hosting platform
   - Update CORS settings to allow your frontend domain

2. **Render Deployment:**
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variables in Render dashboard

3. **Railway Deployment:**
   - Connect your GitHub repository
   - Set root directory to `backend`
   - Add environment variables in Railway dashboard

### Frontend Deployment (Vercel/Netlify)

1. **Prepare for deployment:**
   - Update `REACT_APP_API_URL` in `.env` to your backend URL
   - Build the project: `npm run build`

2. **Vercel Deployment:**
   - Connect your GitHub repository
   - Set root directory to `frontend`
   - Add environment variables
   - Deploy

3. **Netlify Deployment:**
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/build`
   - Add environment variables

### Database Setup (MongoDB Atlas)

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string
6. Update `MONGODB_URI` in backend `.env`

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected routes with authentication middleware
- Role-based access control (RBAC)
- Input validation on all endpoints
- CORS configuration for secure API access
- Environment variables for sensitive data

## Error Handling

All API endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [...] // Optional validation errors
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for new features
5. Submit a pull request

## License

This project is created for assessment purposes.

## Contact

For questions or issues, please contact: career@purplemerit.com

---

**Note**: This project was built as part of a backend developer intern assessment for Purple Merit Technologies.

