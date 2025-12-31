import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import Toast from '../components/Toast';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [toast, setToast] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    usersPerPage: 10,
  });
  const [modal, setModal] = useState({ isOpen: false, action: null, user: null });

  useEffect(() => {
    fetchUsers();
  }, [pagination.currentPage]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAllUsers({
        page: pagination.currentPage,
        limit: pagination.usersPerPage,
      });
      if (response.data.success) {
        setUsers(response.data.data.users);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Error fetching users',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (action, user) => {
    setModal({ isOpen: true, action, user });
  };

  const confirmAction = async () => {
    const { action, user } = modal;
    try {
      setActionLoading(user._id);
      let response;
      if (action === 'activate') {
        response = await adminAPI.activateUser(user._id);
      } else {
        response = await adminAPI.deactivateUser(user._id);
      }

      if (response.data.success) {
        setToast({
          message: response.data.message,
          type: 'success',
        });
        setModal({ isOpen: false, action: null, user: null });
        fetchUsers();
      }
    } catch (error) {
      setToast({
        message: error.response?.data?.message || 'Error performing action',
        type: 'error',
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, currentPage: newPage });
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {loading ? (
          <LoadingSpinner size="large" />
        ) : (
          <>
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="no-data">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.email}</td>
                        <td>{user.fullName}</td>
                        <td>
                          <span className={`role-badge role-${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          <span className={`status-badge status-${user.status}`}>
                            {user.status}
                          </span>
                        </td>
                        <td>
                          {user.status === 'active' ? (
                            <button
                              className="btn-destructive"
                              onClick={() => handleAction('deactivate', user)}
                              disabled={actionLoading === user._id}
                            >
                              {actionLoading === user._id ? (
                                <LoadingSpinner size="small" />
                              ) : (
                                'Deactivate'
                              )}
                            </button>
                          ) : (
                            <button
                              className="btn-primary"
                              onClick={() => handleAction('activate', user)}
                              disabled={actionLoading === user._id}
                            >
                              {actionLoading === user._id ? (
                                <LoadingSpinner size="small" />
                              ) : (
                                'Activate'
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn-secondary"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {pagination.currentPage} of {pagination.totalPages} (
                  {pagination.totalUsers} total users)
                </span>
                <button
                  className="btn-secondary"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        <Modal
          isOpen={modal.isOpen}
          onClose={() => setModal({ isOpen: false, action: null, user: null })}
          title={`${modal.action === 'activate' ? 'Activate' : 'Deactivate'} User`}
          onConfirm={confirmAction}
          confirmText={modal.action === 'activate' ? 'Activate' : 'Deactivate'}
        >
          <p>
            Are you sure you want to {modal.action === 'activate' ? 'activate' : 'deactivate'}{' '}
            <strong>{modal.user?.email}</strong>?
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default AdminDashboard;

