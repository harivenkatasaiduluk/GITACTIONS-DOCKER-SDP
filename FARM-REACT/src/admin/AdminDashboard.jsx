import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import './admincss/admindashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalFarmers: 0,
    totalBuyers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${config.url}/admin/dashboard/stats`);
      setStats(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard statistics');
      setLoading(false);
      console.error('Dashboard stats fetch error:', err);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard-error">
        <p>{error}</p>
        <button onClick={fetchDashboardStats}>Retry</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="date-filter">
          <select defaultValue="today">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon farmers"></div>
          <div className="stat-info">
            <h3>Total Farmers</h3>
            <p className="stat-value">{stats.totalFarmers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon buyers"></div>
          <div className="stat-info">
            <h3>Total Buyers</h3>
            <p className="stat-value">{stats.totalBuyers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon products"></div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orders"></div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="recent-orders">
            {/* Recent orders will be populated here */}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Top Products</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="top-products">
            {/* Top products will be populated here */}
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h2>Revenue Overview</h2>
            <button className="view-all-btn">View Details</button>
          </div>
          <div className="revenue-overview">
            <div className="revenue-card">
              <h3>Total Revenue</h3>
              <p className="revenue-value">₹{stats.totalRevenue}</p>
            </div>
            {/* Revenue chart will be added here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 