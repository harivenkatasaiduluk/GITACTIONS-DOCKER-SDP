import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import '../buyer/buyercss/transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    setTransactions(orders);
    setFilteredTransactions(orders);
  }, []);

  useEffect(() => {
    let filtered = transactions;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(transaction => 
        transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.shippingInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(transaction => 
        transaction.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredTransactions(filtered);
  }, [searchTerm, statusFilter, transactions]);

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

  return (
    <div className="transactions-container">
      <h2>Transaction History</h2>

      <div className="filters">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by Order ID or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="status-filter">
          <FaFilter className="filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.orderId}>
                <td>#{transaction.orderId}</td>
                <td>{formatDate(transaction.orderDate)}</td>
                <td>
                  <div className="customer-info">
                    <p className="name">{transaction.shippingInfo.fullName}</p>
                    <p className="email">{transaction.shippingInfo.email}</p>
                  </div>
                </td>
                <td>
                  <div className="items-info">
                    {transaction.items.map((item, index) => (
                      <p key={index}>
                        {item.name} (x{item.quantity})
                      </p>
                    ))}
                  </div>
                </td>
                <td>₹{transaction.total.toFixed(2)}</td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(transaction.status) }}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td>{formatDate(transaction.estimatedDeliveryDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="no-transactions">
          <p>No transactions found</p>
        </div>
      )}
    </div>
  );
};

export default Transactions;
