import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import './admincss/usermanagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState('farmers'); // 'farmers' or 'buyers'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, [userType]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/users/${userType}`);
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load users');
      setLoading(false);
      console.error('Users fetch error:', err);
    }
  };

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      await axios.put(`${config.url}/admin/users/${userId}/status`, {
        status: currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
      });
      fetchUsers(); // Refresh the list
    } catch (err) {
      console.error('Status update error:', err);
      alert('Failed to update user status');
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="user-management-loading">
        <div className="spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-management-error">
        <p>{error}</p>
        <button onClick={fetchUsers}>Retry</button>
      </div>
    );
  }

  return (
    <div className="user-management-container">
      <div className="user-management-header">
        <h1>User Management</h1>
        <div className="user-management-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="user-type-toggle">
            <button
              className={userType === 'farmers' ? 'active' : ''}
              onClick={() => setUserType('farmers')}
            >
              Farmers
            </button>
            <button
              className={userType === 'buyers' ? 'active' : ''}
              onClick={() => setUserType('buyers')}
            >
              Buyers
            </button>
          </div>
        </div>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className={`status-toggle-btn ${user.status.toLowerCase()}`}
                      onClick={() => handleStatusToggle(user.id, user.status)}
                    >
                      {user.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="view-details-btn">
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement; 