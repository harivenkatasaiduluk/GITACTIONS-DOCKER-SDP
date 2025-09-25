import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './farmercss/farmerdashboard.css';

const FarmerDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeProducts: 0,
    totalSales: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const farmerId = localStorage.getItem('userId'); // Assuming you store farmer ID in localStorage
        const response = await axios.get(`/api/farmer/${farmerId}/dashboard`);
        setStats(response.data.stats);
        setRecentProducts(response.data.recentProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
        console.error('Dashboard data fetch error:', err);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="main-content-wrapper">
      <div className="farmer-dashboard">
        <div className="dashboard-header">
          <h1>Farmer Dashboard</h1>
          <button 
            className="add-product-btn"
            onClick={() => navigate('/farmer/add-product')}
          >
            Add New Product
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
          </div>
          <div className="stat-card">
            <h3>Active Products</h3>
            <p className="stat-value">{stats.activeProducts}</p>
          </div>
          <div className="stat-card">
            <h3>Total Sales</h3>
            <p className="stat-value">₹{stats.totalSales}</p>
          </div>
        </div>

        <div className="recent-products">
          <h2>Recent Products</h2>
          <div className="products-grid">
            {recentProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-price">₹{product.cost}</p>
                  <p className="product-stock">Stock: {product.quantity}</p>
                  <div className="product-actions">
                    <button 
                      className="edit-btn"
                      onClick={() => navigate(`/farmer/edit-product/${product.id}`)}
                    >
                      Edit
                    </button>
                    <button 
                      className="view-btn"
                      onClick={() => navigate(`/farmer/product/${product.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard; 