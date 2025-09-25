import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaTruck, FaHome } from 'react-icons/fa';
import '../buyer/buyercss/orderconfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    return (
      <div className="error-container">
        <h2>Order information not found</h2>
        <button onClick={() => navigate('/buyproducts')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="confirmation-container">
      <div className="success-message">
        <FaCheckCircle className="success-icon" />
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for your purchase. Your order has been received.</p>
      </div>

      <div className="order-details">
        <div className="order-info">
          <h3>Order Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Order ID:</span>
              <span className="value">{order.orderId}</span>
            </div>
            <div className="info-item">
              <span className="label">Order Date:</span>
              <span className="value">{formatDate(order.orderDate)}</span>
            </div>
            <div className="info-item">
              <span className="label">Status:</span>
              <span className="value status">{order.status}</span>
            </div>
            <div className="info-item">
              <span className="label">Estimated Delivery:</span>
              <span className="value">{formatDate(order.estimatedDeliveryDate)}</span>
            </div>
          </div>
        </div>

        <div className="shipping-info">
          <h3>Shipping Information</h3>
          <div className="shipping-details">
            <FaHome className="icon" />
            <div className="address">
              <p><strong>{order.shippingInfo.fullName}</strong></p>
              <p>{order.shippingInfo.address}</p>
              <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}</p>
              <p>Phone: {order.shippingInfo.phone}</p>
              <p>Email: {order.shippingInfo.email}</p>
              {order.shippingInfo.deliveryInstructions && (
                <p className="instructions">
                  <strong>Delivery Instructions:</strong> {order.shippingInfo.deliveryInstructions}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="order-items">
          <h3>Order Items</h3>
          <div className="items-list">
            {order.items.map((item) => (
              <div key={item.id} className="item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.cost}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total Amount:</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate('/myorders')} className="view-orders-btn">
          View All Orders
        </button>
        <button onClick={() => navigate('/buyproducts')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation; 