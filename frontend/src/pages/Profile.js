import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import Navbar from '../components/Navbar';
import './Profile.css';

const Profile = () => {
  const { user: authUser, updateUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getProfile();
      if (response.data.success) {
        const userData = response.data.data.user;
        setUser(userData);
        setFormData({
          fullName: userData.fullName,
          email: userData.email,
        });
        updateUser(userData);
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Error fetching profile',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfile()) {
      return;
    }

    try {
      setSaving(true);
      const response = await userAPI.updateProfile(formData);
      if (response.data.success) {
        setUser(response.data.data.user);
        updateUser(response.data.data.user);
        setEditMode(false);
        setToast({
          message: 'Profile updated successfully',
          type: 'success',
        });
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        const serverErrors = {};
        error.response.data.errors.forEach((err) => {
          if (err.param === 'email') serverErrors.email = err.msg;
          if (err.param === 'fullName') serverErrors.fullName = err.msg;
        });
        setErrors({ ...errors, ...serverErrors });
      }
      setToast({
        message: error.response?.data?.message || 'Error updating profile',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) {
      return;
    }

    try {
      setSaving(true);
      const response = await userAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      if (response.data.success) {
        setToast({
          message: 'Password changed successfully',
          type: 'success',
        });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Error changing password',
        type: 'error',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="profile-container">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        <h1>My Profile</h1>

        <div className="profile-section">
          <div className="section-header">
            <h2>Profile Information</h2>
            {!editMode ? (
              <button className="btn-primary" onClick={() => setEditMode(true)}>
                Edit
              </button>
            ) : (
              <div className="action-buttons">
                <button
                  className="btn-secondary"
                  onClick={() => {
                    setEditMode(false);
                    setFormData({
                      fullName: user.fullName,
                      email: user.email,
                    });
                    setErrors({});
                  }}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={handleSaveProfile}
                  disabled={saving}
                >
                  {saving ? <LoadingSpinner size="small" /> : 'Save'}
                </button>
              </div>
            )}
          </div>

          <div className="profile-info">
            <div className="info-item">
              <label>Full Name</label>
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleProfileChange}
                    className={errors.fullName ? 'input-error' : ''}
                  />
                  {errors.fullName && (
                    <span className="error-message">{errors.fullName}</span>
                  )}
                </>
              ) : (
                <p>{user?.fullName}</p>
              )}
            </div>

            <div className="info-item">
              <label>Email</label>
              {editMode ? (
                <>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleProfileChange}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </>
              ) : (
                <p>{user?.email}</p>
              )}
            </div>

            <div className="info-item">
              <label>Role</label>
              <p>
                <span className={`role-badge role-${user?.role}`}>
                  {user?.role}
                </span>
              </p>
            </div>

            <div className="info-item">
              <label>Status</label>
              <p>
                <span className={`status-badge status-${user?.status}`}>
                  {user?.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h2>Change Password</h2>
          </div>

          <div className="profile-info">
            <div className="info-item">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className={errors.currentPassword ? 'input-error' : ''}
              />
              {errors.currentPassword && (
                <span className="error-message">{errors.currentPassword}</span>
              )}
            </div>

            <div className="info-item">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={errors.newPassword ? 'input-error' : ''}
              />
              {errors.newPassword && (
                <span className="error-message">{errors.newPassword}</span>
              )}
            </div>

            <div className="info-item">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className={errors.confirmPassword ? 'input-error' : ''}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>

            <button
              className="btn-primary"
              onClick={handleChangePassword}
              disabled={saving}
            >
              {saving ? <LoadingSpinner size="small" /> : 'Change Password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

