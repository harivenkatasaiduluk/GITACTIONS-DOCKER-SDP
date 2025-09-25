import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';
import './farmercss/mylistings.css';

const MyListings = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        try {
            // Get orders from localStorage
            const ordersData = localStorage.getItem('orders');
            const orders = ordersData ? JSON.parse(ordersData) : [];

            // Get products from localStorage
            const productsData = localStorage.getItem('products');
            const products = productsData ? JSON.parse(productsData) : [];

            // Calculate statistics
            const totalOrders = orders.length;
            const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

            setProducts(products);
            setStats({
                totalOrders,
                totalRevenue
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="listings-container">
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="listings-container">
            <h2 className="listings-header">My Listings</h2>
            
            <div className="stats-grid">
                <div className="stat-card">
                    <FaShoppingCart className="stat-icon" />
                    <div className="stat-info">
                        <h3>Total Orders</h3>
                        <p>{stats.totalOrders}</p>
                    </div>
                </div>
                
                <div className="stat-card">
                    <FaMoneyBillWave className="stat-icon" />
                    <div className="stat-info">
                        <h3>Total Revenue</h3>
                        <p>₹{stats.totalRevenue}</p>
                    </div>
                </div>
            </div>

            <div className="products-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <div className="product-image">
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="category">{product.category}</p>
                            <p className="price">₹{product.price}</p>
                            <p className="stock">Stock: {product.stock}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyListings;
