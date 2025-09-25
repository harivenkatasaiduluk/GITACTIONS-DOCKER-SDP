import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';
import './farmer.css';

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    cost: '',
    quantity: '',
    category: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${config.url}/farmer/product/${productId}`);
      setProduct(response.data);
      setPreviewImage(`${config.url}/product/displayproductimage?id=${productId}`);
      setLoading(false);
    } catch (err) {
      setError('Failed to load product details');
      setLoading(false);
      console.error('Product fetch error:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct(prev => ({
        ...prev,
        image: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(product).forEach(key => {
        if (product[key] !== null) {
          formData.append(key, product[key]);
        }
      });

      await axios.put(`${config.url}/farmer/product/${productId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Product updated successfully');
      navigate('/mylistings');
    } catch (err) {
      toast.error('Failed to update product');
      console.error('Update error:', err);
    }
  };

  if (loading) {
    return (
      <div className="edit-product-loading">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="edit-product-error">
        <p>{error}</p>
        <button onClick={fetchProduct}>Retry</button>
      </div>
    );
  }

  return (
    <div className="edit-product-container">
      <div className="edit-product-header">
        <h1>Edit Product</h1>
      </div>

      <form className="edit-product-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={product.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="dairy">Dairy</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Pricing & Stock</h2>
          <div className="form-group">
            <label htmlFor="cost">Price (₹)</label>
            <input
              type="number"
              id="cost"
              name="cost"
              value={product.cost}
              onChange={handleInputChange}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Stock Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleInputChange}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Product Image</h2>
          <div className="image-upload-section">
            {previewImage && (
              <div className="preview-image">
                <img src={previewImage} alt="Product preview" />
              </div>
            )}
            <div className="upload-input">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
              />
              <label htmlFor="image" className="upload-btn">
                Change Image
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={() => navigate('/mylistings')}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Update Product
          </button>
        </div>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default EditProduct; 