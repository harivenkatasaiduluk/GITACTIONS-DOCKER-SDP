import React, { useState, useEffect } from 'react';
import { FaBox, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../Styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    try {
      const raw = localStorage.getItem('orders');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Sort orders by date, most recent first
          const sortedOrders = parsed.sort((a, b) => 
            new Date(b.orderDate) - new Date(a.orderDate)
          );
          setOrders(sortedOrders);
        } else {
          console.warn('Orders data is not an array');
          setError('Invalid orders data format');
        }
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error('Failed to parse orders from localStorage', err);
      setError('Failed to load orders');
    }
  };

  const handleRetry = () => {
    setError('');
    fetchOrders();
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FaBox className="status-icon pending" />;
      case 'shipped':
        return <FaTruck className="status-icon shipped" />;
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      case 'cancelled':
        return <FaTimesCircle className="status-icon cancelled" />;
      default:
        return <FaBox className="status-icon" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (error) {
    return (
      <div className="orders-page">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.orderId}</h3>
                  <p className="order-date">Placed on {formatDate(order.orderDate)}</p>
                </div>
                <div className="order-status">
                  {getStatusIcon(order.status)}
                  <span className={order.status.toLowerCase()}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.imageUrl} alt={item.name} />
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: ₹{item.cost}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="delivery-info">
                  <p><strong>Estimated Delivery:</strong> {formatDate(order.estimatedDeliveryDate)}</p>
                  <p><strong>Shipping Address:</strong> {order.shippingInfo.address}, {order.shippingInfo.city}</p>
                </div>
                <div className="order-total">
                  <span>Total Amount:</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
