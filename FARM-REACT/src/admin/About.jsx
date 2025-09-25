import React from 'react';
import { FaUsers, FaChartLine, FaShoppingCart, FaBox, FaLeaf, FaHandshake, FaLightbulb, FaGlobe } from 'react-icons/fa';
import './admincss/about.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <div className="header-content">
                    <h1>Welcome to AgroDirect</h1>
                    <p className="subtitle">Empowering Agriculture Through Technology</p>
                </div>
            </div>

            <div className="main-content">
                <div className="left-section">
                    <div className="vision-card">
                        <FaLeaf className="vision-icon" />
                        <h2>Our Vision</h2>
                        <p>To revolutionize agricultural commerce by creating a sustainable ecosystem where technology bridges the gap between farmers and consumers, ensuring fair trade, quality produce, and environmental responsibility.</p>
                    </div>

                    <div className="values-section">
                        <h2>Core Values</h2>
                        <div className="values-grid">
                            <div className="value-item">
                                <FaHandshake className="value-icon" />
                                <h3>Trust</h3>
                                <p>Building reliable and transparent relationships between farmers and buyers through secure transactions and verified profiles</p>
                            </div>
                            <div className="value-item">
                                <FaLeaf className="value-icon" />
                                <h3>Sustainability</h3>
                                <p>Promoting eco-friendly farming practices and supporting sustainable agricultural development</p>
                            </div>
                            <div className="value-item">
                                <FaLightbulb className="value-icon" />
                                <h3>Innovation</h3>
                                <p>Leveraging cutting-edge technology to transform traditional agricultural practices</p>
                            </div>
                            <div className="value-item">
                                <FaGlobe className="value-icon" />
                                <h3>Global Impact</h3>
                                <p>Creating positive change in agricultural communities worldwide through digital transformation</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-section">
                    <div className="features-section">
                        <h2>Platform Features</h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <FaUsers className="feature-icon" />
                                <div className="feature-content">
                                    <h3>User Management</h3>
                                    <p>Comprehensive tools for managing farmers and buyers with advanced verification and profile management</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <FaChartLine className="feature-icon" />
                                <div className="feature-content">
                                    <h3>Analytics</h3>
                                    <p>Real-time insights and performance metrics to track platform growth and user engagement</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <FaShoppingCart className="feature-icon" />
                                <div className="feature-content">
                                    <h3>Order System</h3>
                                    <p>Streamlined order processing and tracking with automated notifications and status updates</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <FaBox className="feature-icon" />
                                <div className="feature-content">
                                    <h3>Product Management</h3>
                                    <p>Efficient inventory and product oversight with detailed categorization and quality control</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="stats-section">
                        <div className="stat-item">
                            <h3>1000+</h3>
                            <p>Active Farmers</p>
                        </div>
                        <div className="stat-item">
                            <h3>5000+</h3>
                            <p>Happy Buyers</p>
                        </div>
                        <div className="stat-item">
                            <h3>10000+</h3>
                            <p>Products Listed</p>
                        </div>
                        <div className="stat-item">
                            <h3>98%</h3>
                            <p>Customer Satisfaction</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="contact-section">
                <div className="contact-content">
                    <h2>Get in Touch</h2>
                    <p>Our dedicated support team is here to help you succeed</p>
                    <div className="contact-info">
                        <div className="contact-item">
                            <h4>Email Support</h4>
                            <p>support@agrodirect.com</p>
                        </div>
                        <div className="contact-item">
                            <h4>Phone Support</h4>
                            <p>+91 1800-XXX-XXXX</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About; 