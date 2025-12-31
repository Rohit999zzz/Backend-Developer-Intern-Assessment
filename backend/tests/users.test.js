const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

describe('User Management Tests', () => {
  let userToken;
  let adminToken;
  let adminUser;
  let regularUser;

  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});

    // Create admin user
    adminUser = await User.create({
      email: 'admin@example.com',
      password: 'Admin1234',
      fullName: 'Admin User',
      role: 'admin',
      status: 'active'
    });

    // Create regular user
    regularUser = await User.create({
      email: 'user@example.com',
      password: 'User1234',
      fullName: 'Regular User',
      role: 'user',
      status: 'active'
    });

    // Get tokens
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'Admin1234'
      });
    adminToken = adminLogin.body.data.token;

    const userLogin = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'User1234'
      });
    userToken = userLogin.body.data.token;
  });

  describe('GET /api/users/profile', () => {
    it('should get user profile with valid token', async () => {
      const response = await request(app)
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe('user@example.com');
    });

    it('should reject request without token', async () => {
      const response = await request(app)
        .get('/api/users/profile');

      expect(response.status).toBe(401);
    });
  });

  describe('PUT /api/users/profile', () => {
    it('should update user profile', async () => {
      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          fullName: 'Updated Name',
          email: 'updated@example.com'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.fullName).toBe('Updated Name');
      expect(response.body.data.user.email).toBe('updated@example.com');
    });

    it('should reject update with duplicate email', async () => {
      const response = await request(app)
        .put('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          email: 'admin@example.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/users/change-password', () => {
    it('should change password with correct current password', async () => {
      const response = await request(app)
        .put('/api/users/change-password')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          currentPassword: 'User1234',
          newPassword: 'NewPass1234'
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      // Verify new password works
      const loginResponse = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'user@example.com',
          password: 'NewPass1234'
        });

      expect(loginResponse.status).toBe(200);
    });

    it('should reject password change with incorrect current password', async () => {
      const response = await request(app)
        .put('/api/users/change-password')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          currentPassword: 'WrongPassword',
          newPassword: 'NewPass1234'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });
  });
});

