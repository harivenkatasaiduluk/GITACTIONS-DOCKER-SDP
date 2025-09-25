import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../admin/admincss/product.css';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${config.url}/product/viewallproducts`);
      setProducts(res.data);
    } catch (err) {
      toast.error('Error loading products');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.url}/admin/deleteproduct?pid=${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    } catch (err) {
      toast.error('Error deleting product');
    }
  };

  return (
    <div className="data-table-container">
      <h3 style={{
        textAlign: "center",
        color: "#2c3e50",
        fontWeight: "700",
        marginBottom: "2rem",
        fontSize: "2rem",
        textTransform: "uppercase",
        letterSpacing: "1px",
        padding: "1rem",
        background: "linear-gradient(135deg, #e67e22 0%, #d35400 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        borderBottom: "3px solid #e67e22",
        display: "inline-block",
        width: "100%"
      }}>
        Product Management
      </h3>
      {products.length === 0 ? (
        <p className="no-products">No products available</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Quantity</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>
                  <img
                    src={`${config.url}/product/displayproductimage?id=${p.id}`}
                    alt={p.name}
                    className="product-image"
                  />
                </td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>₹{p.cost}</td>
                <td>{p.quantity || 0} units</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ManageProducts;
