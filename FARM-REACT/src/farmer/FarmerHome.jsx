import React, { useState } from 'react';
import { FaLeaf, FaTruck, FaUsers } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './farmer.css';

export default function FarmerHome() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDashboardClick = () => {
    navigate('/farmer/dashboard');
  };

  const handleAddProductsClick = () => {
    setShowSuccess(true);
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <div className="home-container">
      {showSuccess && (
        <div className="success-message">
          Product added successfully!
        </div>
      )}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to AgroDirect</h1>
            <h2>Your Direct Farm-to-Market Platform</h2>
            <p className="hero-description">
              As a farmer, you can list your products, manage orders, and connect directly with buyers.
              Join our community and grow your business with AgroDirect!
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={handleAddProductsClick}>Add Products</button>
              <button className="secondary-btn" onClick={handleDashboardClick}>View Dashboard</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Agriculture" />
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose AgroDirect?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaLeaf className="feature-icon" />
            <h3>Direct Market Access</h3>
            <p>Connect directly with buyers and eliminate middlemen</p>
          </div>
          <div className="feature-card">
            <FaTruck className="feature-icon" />
            <h3>Easy Management</h3>
            <p>Simple tools to manage your products and orders</p>
          </div>
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Wide Customer Base</h3>
            <p>Reach more customers and grow your business</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up as a farmer and complete your profile</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>List Products</h3>
            <p>Add your products with details and pricing</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Receive Orders</h3>
            <p>Get notified when customers place orders</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Track Sales</h3>
            <p>Monitor your sales and grow your business</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Selling?</h2>
          <p>Join our community of successful farmers on AgroDirect</p>
          <button className="cta-button" onClick={handleAddProductsClick}>Start Selling Now</button>
        </div>
      </section>
    </div>
  );
}