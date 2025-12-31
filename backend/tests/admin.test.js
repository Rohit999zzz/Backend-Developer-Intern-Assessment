const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

describe('Admin Functions Tests', () => {
  let adminToken;
  let userToken;
  let adminUser;
  let testUsers = [];

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

    // Create regular users
    for (let i = 1; i <= 15; i++) {
      const user = await User.create({
        email: `user${i}@example.com`,
        password: 'User1234',
        fullName: `User ${i}`,
        role: 'user',
        status: i % 2 === 0 ? 'active' : 'inactive'
      });
      testUsers.push(user);
    }

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
        email: 'user1@example.com',
        password: 'User1234'
      });
    userToken = userLogin.body.data.token;
  });

  describe('GET /api/admin/users', () => {
    it('should get all users with pagination (admin only)', async () => {
      const response = await request(app)
        .get('/api/admin/users?page=1&limit=10')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.users).toHaveLength(10);
      expect(response.body.data.pagination.totalUsers).toBe(16); // 15 users + 1 admin
      expect(response.body.data.pagination.currentPage).toBe(1);
    });

    it('should reject access for non-admin users', async () => {
      const response = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
    });

    it('should filter users by status', async () => {
      const response = await request(app)
        .get('/api/admin/users?status=active')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.data.users.every(u => u.status === 'active')).toBe(true);
    });
  });

  describe('PUT /api/admin/users/:userId/activate', () => {
    it('should activate an inactive user (admin only)', async () => {
      const inactiveUser = testUsers.find(u => u.status === 'inactive');
      
      const response = await request(app)
        .put(`/api/admin/users/${inactiveUser._id}/activate`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.status).toBe('active');
    });

    it('should reject activation by non-admin', async () => {
      const inactiveUser = testUsers.find(u => u.status === 'inactive');
      
      const response = await request(app)
        .put(`/api/admin/users/${inactiveUser._id}/activate`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(403);
    });
  });

  describe('PUT /api/admin/users/:userId/deactivate', () => {
    it('should deactivate an active user (admin only)', async () => {
      const activeUser = testUsers.find(u => u.status === 'active');
      
      const response = await request(app)
        .put(`/api/admin/users/${activeUser._id}/deactivate`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.status).toBe('inactive');
    });

    it('should prevent admin from deactivating themselves', async () => {
      const response = await request(app)
        .put(`/api/admin/users/${adminUser._id}/deactivate`)
        .set('Authorization', `Bearer ${adminToken}`);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('cannot deactivate your own account');
    });
  });
});

