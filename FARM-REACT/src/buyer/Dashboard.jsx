import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaBox, FaTruck, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';
import '../buyer/buyercss/dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalSpent: 0,
    recentOrders: []
  });

  const navigate = useNavigate();

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    // Calculate statistics
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(order => order.status === 'Pending').length;
    const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    
    // Get recent orders (last 5)
    const recentOrders = orders
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, 5);

    setStats({
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalSpent,
      recentOrders
    });
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#ffa500';
      case 'shipped':
        return '#2874f0';
      case 'delivered':
        return '#28a745';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <div className="main-content-wrapper">
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FaShoppingBag />
            </div>
            <div className="stat-info">
              <h3>Total Orders</h3>
              <p>{stats.totalOrders}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaBox />
            </div>
            <div className="stat-info">
              <h3>Pending Orders</h3>
              <p>{stats.pendingOrders}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaCheckCircle />
            </div>
            <div className="stat-info">
              <h3>Delivered Orders</h3>
              <p>{stats.deliveredOrders}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaMoneyBillWave />
            </div>
            <div className="stat-info">
              <h3>Total Spent</h3>
              <p>₹{stats.totalSpent.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="recent-orders">
          <div className="section-header">
            <h3>Recent Orders</h3>
            <button onClick={() => navigate('/myorders')} className="view-all-btn">
              View All Orders
            </button>
          </div>

          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order.orderId}>
                    <td>#{order.orderId}</td>
                    <td>{formatDate(order.orderDate)}</td>
                    <td>{order.items.length} items</td>
                    <td>₹{order.total.toFixed(2)}</td>
                    <td>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        onClick={() => navigate(`/myorders`)}
                        className="view-order-btn"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
