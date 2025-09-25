import React from 'react';
import { FaLeaf, FaTruck, FaUsers, FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './buyer.css';

export default function BuyerHome() {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleBrowseProductsClick = () => {
    navigate('/buyproducts');
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to AgroDirect</h1>
            <h2>Your Direct Farm-to-Table Marketplace</h2>
            <p className="hero-description">
              As a buyer, you can browse fresh produce, place orders, and support local farmers.
              Join our community and experience farm-fresh goodness delivered to your doorstep!
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={handleBrowseProductsClick}>Browse Products</button>
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
            <h3>Fresh Produce</h3>
            <p>Get farm-fresh products directly from local farmers</p>
          </div>
          <div className="feature-card">
            <FaTruck className="feature-icon" />
            <h3>Direct Delivery</h3>
            <p>Fast and reliable delivery from farm to your doorstep</p>
          </div>
          <div className="feature-card">
            <FaUsers className="feature-icon" />
            <h3>Support Local</h3>
            <p>Help local farmers grow while getting the best quality</p>
          </div>
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Best Prices</h3>
            <p>Get fair prices without middlemen markups</p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up as a buyer and complete your profile</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Browse Products</h3>
            <p>Explore fresh produce from local farmers</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Place Orders</h3>
            <p>Select products and place your order</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Get Delivered</h3>
            <p>Receive fresh produce at your doorstep</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Shop Fresh?</h2>
          <p>Join thousands of buyers already using AgroDirect</p>
          <button className="cta-button" onClick={handleBrowseProductsClick}>Start Shopping Now</button>
        </div>
      </section>
    </div>
  );
}
