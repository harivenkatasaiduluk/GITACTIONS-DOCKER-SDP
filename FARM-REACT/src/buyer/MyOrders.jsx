import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import '../buyer/buyercss/myorders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)));
  }, []);

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#ffa500';
      case 'shipped':
        return '#2874f0';
      case 'delivered':
        return '#28a745';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="empty-orders">
        <h2>No Orders Found</h2>
        <p>You haven't placed any orders yet.</p>
        <button onClick={() => navigate('/buyproducts')} className="shop-now-btn">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.orderId} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3>Order #{order.orderId}</h3>
                <p className="order-date">Placed on {formatDate(order.orderDate)}</p>
              </div>
              <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                {getStatusIcon(order.status)}
                <span>{order.status}</span>
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

            {order.status === 'Pending' && (
              <div className="order-actions">
                <button className="cancel-order-btn">Cancel Order</button>
                <button className="track-order-btn">Track Order</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
