import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaBox, FaShoppingCart, FaChartLine, FaChartPie, FaStar, FaUserTie } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';

export default function Reports() {
    const [stats, setStats] = useState({
        totalFarmers: 0,
        totalBuyers: 0,
        totalProducts: 0,
        totalOrders: 0,
        monthlyRevenue: 0,
        categoryDistribution: [],
        topPerformingFarmers: [],
        customerSatisfaction: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStats = async () => {
        try {
            console.log('Fetching stats...');
            setLoading(true);
            setError(null);

            // Fetch farmers
            const farmersResponse = await axios.get(`${config.url}/admin/viewallfarmers`);
            console.log('Farmers response:', farmersResponse.data);
            const farmers = farmersResponse.data;

            // Fetch buyers
            const buyersResponse = await axios.get(`${config.url}/admin/viewallbuyers`);
            console.log('Buyers response:', buyersResponse.data);
            const buyers = buyersResponse.data;

            // Fetch products
            const productsResponse = await axios.get(`${config.url}/admin/viewallproducts`);
            console.log('Products response:', productsResponse.data);
            const products = productsResponse.data;

            // Fetch orders
            const ordersResponse = await axios.get(`${config.url}/admin/viewallorders`);
            console.log('Orders response:', ordersResponse.data);
            const orders = ordersResponse.data;

            // Calculate monthly revenue
            const currentMonth = new Date().getMonth();
            const monthlyOrders = orders.filter(order => new Date(order.orderDate).getMonth() === currentMonth);
            const monthlyRevenue = monthlyOrders.reduce((total, order) => total + (order.totalAmount || 0), 0);

            // Calculate category distribution
            const categoryCount = products.reduce((acc, product) => {
                acc[product.category] = (acc[product.category] || 0) + 1;
                return acc;
            }, {});
            const categoryDistribution = Object.entries(categoryCount).map(([category, count]) => ({
                category,
                count,
                percentage: (count / products.length) * 100
            }));

            // Calculate top performing farmers
            const farmerSales = orders.reduce((acc, order) => {
                const farmerId = order.farmerId;
                acc[farmerId] = (acc[farmerId] || 0) + (order.totalAmount || 0);
                return acc;
            }, {});
            const topPerformingFarmers = Object.entries(farmerSales)
                .map(([farmerId, sales]) => {
                    const farmer = farmers.find(f => f.farmerId === parseInt(farmerId));
                    return {
                        id: farmerId,
                        name: farmer ? farmer.farmerName : 'Unknown',
                        sales
                    };
                })
                .sort((a, b) => b.sales - a.sales)
                .slice(0, 5);

            // Calculate customer satisfaction (placeholder - replace with actual logic)
            const customerSatisfaction = 4.5; // This should be calculated based on actual ratings

            setStats({
                totalFarmers: farmers.length,
                totalBuyers: buyers.length,
                totalProducts: products.length,
                totalOrders: orders.length,
                monthlyRevenue,
                categoryDistribution,
                topPerformingFarmers,
                customerSatisfaction
            });

            toast.success('Reports data loaded successfully!');
        } catch (err) {
            console.error('Error fetching stats:', err);
            setError(err.message || 'Failed to fetch reports data');
            toast.error('Failed to load reports data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('Reports component mounted');
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading reports data...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-message">
                <p>Error: {error}</p>
                <button onClick={fetchStats} className="retry-button">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="reports-container">
            <ToastContainer position="top-center" />
            <h2 className="reports-heading">Reports & Analytics</h2>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <FaUsers className="stat-icon" />
                    <div className="stat-info">
                        <h3>Total Farmers</h3>
                        <p>{stats.totalFarmers}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <FaUsers className="stat-icon" />
                    <div className="stat-info">
                        <h3>Total Buyers</h3>
                        <p>{stats.totalBuyers}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <FaBox className="stat-icon" />
                    <div className="stat-info">
                        <h3>Total Products</h3>
                        <p>{stats.totalProducts}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <FaShoppingCart className="stat-icon" />
                    <div className="stat-info">
                        <h3>Total Orders</h3>
                        <p>{stats.totalOrders}</p>
                    </div>
                </div>
            </div>

            <div className="reports-grid">
                <div className="report-card">
                    <h3><FaChartLine /> Monthly Revenue</h3>
                    <p className="revenue">₹{stats.monthlyRevenue.toLocaleString()}</p>
                </div>

                <div className="report-card">
                    <h3><FaChartPie /> Category Distribution</h3>
                    <div className="category-list">
                        {stats.categoryDistribution.map((item, index) => (
                            <div key={index} className="category-item">
                                <span>{item.category}</span>
                                <div className="progress-bar">
                                    <div 
                                        className="progress" 
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                                <span>{item.count} products</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="report-card">
                    <h3><FaUserTie /> Top Performing Farmers</h3>
                    <div className="farmer-list">
                        {stats.topPerformingFarmers.map((farmer, index) => (
                            <div key={index} className="farmer-item">
                                <span>{farmer.name}</span>
                                <span>₹{farmer.sales.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="report-card">
                    <h3><FaStar /> Customer Satisfaction</h3>
                    <div className="satisfaction-score">
                        <span className="score">{stats.customerSatisfaction}</span>
                        <span className="max-score">/5</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 