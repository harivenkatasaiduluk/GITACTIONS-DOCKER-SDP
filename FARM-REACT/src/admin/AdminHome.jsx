import React from 'react';
import './admincss/admindashboard.css';

export default function AdminHome() {
  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>
            Welcome to <span className="highlight">AgroDirect</span>
          </h1>
          <p className="subtitle">Fresh Produce, Direct from Farms to Your Doorstep!</p>
        </div>
      </div>

      <div className="welcome-section">
        <div className="welcome-card">
          <h3>
            Welcome to a seamless marketplace where farmers connect directly with buyers for fresh, high-quality produce.
            Say goodbye to middlemen and experience fair pricing, transparency, and farm-fresh goodness delivered straight to you.
          </h3>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h2>🌾 For Farmers</h2>
            <p>List your products, track sales, and reach customers effortlessly.</p>
          </div>
          
          <div className="feature-card">
            <h2>🛒 For Buyers</h2>
            <p>Browse fresh produce, place orders, and support local farmers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}