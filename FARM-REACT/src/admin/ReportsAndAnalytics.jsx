import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUsers, FaBox, FaShoppingCart, FaChartLine, FaChartPie, FaStar, FaUserTie, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import config from '../config';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function ReportsAndAnalytics() {
    const [stats, setStats] = useState(() => {
        const savedStats = sessionStorage.getItem('reportsStats');
        return savedStats ? JSON.parse(savedStats) : {
            totalFarmers: 0,
            totalBuyers: 0,
            totalProducts: 0,
            totalOrders: 0,
            monthlyRevenue: 0,
            categoryDistribution: [],
            topPerformingFarmers: [],
            customerSatisfaction: 0,
            ordersData: [],
            productsData: [],
            farmersData: [],
            buyersData: [],
            recentTransactions: [],
            salesByCategory: [],
            topSellingProducts: []
        };
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    });

    const fetchStats = async () => {
        try {
            console.log('Fetching stats...');
            setLoading(true);
            setError(null);

            // Fetch data from API with proper error handling
            let farmersData = [], buyersData = [], productsData = [], ordersData = [];

            try {
                const farmersResponse = await axios.get(`${config.url}/admin/viewallfarmers`);
                farmersData = farmersResponse.data;
            } catch (err) {
                console.error('Error fetching farmers:', err);
                toast.error('Failed to fetch farmers data');
            }

            try {
                const buyersResponse = await axios.get(`${config.url}/admin/viewallbuyers`);
                buyersData = buyersResponse.data;
            } catch (err) {
                console.error('Error fetching buyers:', err);
                toast.error('Failed to fetch buyers data');
            }

            try {
                const productsResponse = await axios.get(`${config.url}/admin/manageproducts`);
                productsData = productsResponse.data;
            } catch (err) {
                console.error('Error fetching products:', err);
                toast.error('Failed to fetch products data');
            }

            try {
                // Fetch orders from all farmers
                const allOrders = [];
                for (const farmer of farmersData) {
                    try {
                        const response = await axios.get(`${config.url}/farmer/${farmer.id}/orders`);
                        if (response.data && Array.isArray(response.data)) {
                            allOrders.push(...response.data);
                        }
                    } catch (err) {
                        console.error(`Error fetching orders for farmer ${farmer.id}:`, err);
                    }
                }
                ordersData = allOrders;
            } catch (err) {
                console.error('Error fetching orders:', err);
                toast.error('Failed to fetch orders data');
            }

            // If all data fetches failed, throw an error
            if (farmersData.length === 0 && buyersData.length === 0 && 
                productsData.length === 0 && ordersData.length === 0) {
                throw new Error('Failed to fetch any data');
            }

            // Calculate total products from products data
            const totalProducts = productsData.length;

            // Calculate monthly revenue
            const currentMonth = new Date().getMonth();
            const monthlyOrders = ordersData.filter(order => new Date(order.date).getMonth() === currentMonth);
            const monthlyRevenue = monthlyOrders.reduce((total, order) => total + (order.total || 0), 0);

            // Calculate category-wise item counts from products data
            const categoryItemCount = productsData.reduce((acc, product) => {
                const category = product.category;
                acc[category] = (acc[category] || 0) + 1;
                return acc;
            }, {});

            const categoryDistribution = Object.entries(categoryItemCount).map(([category, count]) => ({
                category,
                count,
                percentage: (count / totalProducts) * 100
            }));

            // Process recent transactions
            const recentTransactions = ordersData
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5)
                .map(order => ({
                    orderId: order.id,
                    buyerName: order.customerName,
                    farmerName: farmersData.find(f => f.id === order.farmerId)?.name || 'Unknown Farmer',
                    totalAmount: order.total,
                    status: order.status,
                    orderDate: order.date
                }));

            const newStats = {
                totalFarmers: farmersData.length,
                totalBuyers: buyersData.length,
                totalProducts: totalProducts,
                totalOrders: ordersData.length,
                monthlyRevenue,
                categoryDistribution,
                ordersData,
                productsData,
                farmersData,
                buyersData,
                recentTransactions
            };

            // Save to session storage
            sessionStorage.setItem('reportsStats', JSON.stringify(newStats));
            setStats(newStats);
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

    // Chart data configurations
    const revenueData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Monthly Revenue',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: '#3498db',
            tension: 0.4
        }]
    };

    const categoryData = {
        labels: stats.categoryDistribution.map(item => item.category),
        datasets: [{
            data: stats.categoryDistribution.map(item => item.count),
            backgroundColor: [
                '#3498db',
                '#2ecc71',
                '#e74c3c',
                '#f1c40f',
                '#9b59b6',
                '#1abc9c',
                '#e67e22',
                '#34495e'
            ]
        }]
    };

    const categoryBarData = {
        labels: stats.categoryDistribution.map(item => item.category),
        datasets: [{
            label: 'Items by Category',
            data: stats.categoryDistribution.map(item => item.count),
            backgroundColor: '#3498db',
            borderColor: '#2980b9',
            borderWidth: 1
        }]
    };

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 className="reports-heading">Reports & Analytics</h2>
                <button onClick={fetchStats} className="refresh-button">
                    <FaChartLine /> Refresh Data
                </button>
            </div>
            
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
                        <h3>Total Products Sold</h3>
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
                    <div style={{ height: '300px' }}>
                        <Line data={revenueData} options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top',
                                }
                            }
                        }} />
                    </div>
                </div>

                <div className="report-card">
                    <h3><FaChartPie /> Items by Category</h3>
                    <div style={{ height: '300px' }}>
                        <Pie data={categoryData} options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'right',
                                }
                            }
                        }} />
                    </div>
                </div>

                <div className="report-card">
                    <h3><FaChartPie /> Category Distribution</h3>
                    <div style={{ height: '300px' }}>
                        <Bar data={categoryBarData} options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top',
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        stepSize: 1
                                    }
                                }
                            }
                        }} />
                    </div>
                </div>

                <div className="report-card">
                    <h3>Category-wise Item Count</h3>
                    <div className="category-list">
                        {stats.categoryDistribution.map((category, index) => (
                            <div key={index} className="category-item">
                                <div className="category-info">
                                    <h4>{category.category}</h4>
                                    <p>Items: {category.count}</p>
                                </div>
                                <div className="progress-bar">
                                    <div 
                                        className="progress" 
                                        style={{ width: `${category.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="data-table-container" style={{ marginTop: '30px' }}>
                <h3>Recent Transactions</h3>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Buyer</th>
                            <th>Farmer</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.recentTransactions.map((transaction, index) => (
                            <tr key={index}>
                                <td>#{transaction.orderId}</td>
                                <td>{transaction.buyerName}</td>
                                <td>{transaction.farmerName}</td>
                                <td>₹{transaction.totalAmount}</td>
                                <td>
                                    <span className={`table-status ${transaction.status.toLowerCase()}`}>
                                        {transaction.status}
                                    </span>
                                </td>
                                <td>{new Date(transaction.orderDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
