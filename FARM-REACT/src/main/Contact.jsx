import React from 'react';
import { FaEnvelope, FaPhone, FaInstagram, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Get in touch with us for any queries or support.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <FaEnvelope className="icon" />
            <h3>Email Us</h3>
            <p>agrodirect@gmail.com</p>
            <span>We'll respond within 24 hours</span>
          </div>

          <div className="info-card">
            <FaPhone className="icon" />
            <h3>Call Us</h3>
            <p>+91 9963545576</p>
            <span>Monday to Saturday, 9 AM to 6 PM</span>
          </div>

          <div className="info-card">
            <FaInstagram className="icon" />
            <h3>Follow Us</h3>
            <p>@agrodirect</p>
            <span>Stay updated with our latest news</span>
          </div>

          <div className="info-card">
            <FaMapMarkerAlt className="icon" />
            <h3>Visit Us</h3>
            <p>AgroDirect Headquarters</p>
            <span>Vijayawada KL University, Andhra Pradesh, India</span>
          </div>
        </div>

        <div className="contact-message">
          <h2>Why Choose AgroDirect?</h2>
          <div className="features">
            <div className="feature">
              <h4>Direct Farm-to-Table</h4>
              <p>Connect directly with farmers and get fresh produce at the best prices.</p>
            </div>
            <div className="feature">
              <h4>Quality Assured</h4>
              <p>All our products undergo strict quality checks to ensure the best for you.</p>
            </div>
            <div className="feature">
              <h4>24/7 Support</h4>
              <p>Our dedicated team is always ready to assist you with any queries.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-footer">
        <p>Join our community of farmers and buyers today!</p>
        <div className="social-links">
          <a href="mailto:agrodirect@gmail.com" className="social-link">
            <FaEnvelope /> Email
          </a>
          <a href="tel:+919963545576" className="social-link">
            <FaPhone /> Call
          </a>
          <a href="https://instagram.com/agrodirect" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaInstagram /> Instagram
          </a>
        </div>
      </div>
    </div>
  );
}
