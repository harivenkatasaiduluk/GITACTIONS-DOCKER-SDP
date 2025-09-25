 
import { FaLeaf, FaTruck, FaUsers, FaChartLine } from 'react-icons/fa';
import image from './image.png';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
   
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Welcome to AgroDirect</h1>
            <h2>Your Direct Farm-to-Table Marketplace</h2>
            <p className="hero-description">
              Connecting farmers directly with buyers for fresh, quality produce at fair prices.
              Join our community and be part of the agricultural revolution!
            </p>
            <div className="hero-buttons">
              <button className="primary-btn">Join as Farmer</button>
              <button className="secondary-btn">Join as Buyer</button>
            </div>
          </div>
          <div className="hero-image">
            <img src={image} alt="Agriculture" />
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
            <h3>Community Driven</h3>
            <p>Join a growing community of farmers and buyers</p>
          </div>
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Better Prices</h3>
            <p>Fair prices for both farmers and buyers</p>
          </div>
        </div>
      </section>

  
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up as a farmer or buyer</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>List Products</h3>
            <p>Farmers can list their produce</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Browse & Order</h3>
            <p>Buyers can browse and place orders</p>
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
          <h2>Ready to Start Your Journey?</h2>
          <p>Join thousands of farmers and buyers already using AgroDirect</p>
         <button className="cta-button">Get Started Now</button>
         
        </div>
      </section>
    </div>
  );
}
