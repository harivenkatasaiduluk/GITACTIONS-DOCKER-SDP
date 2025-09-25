import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaLeaf, FaTruck, FaUndo, FaShieldAlt } from 'react-icons/fa';
import axios from 'axios';
import config from '../config';
import './buyercss/buyproducts.css';

const BuyProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.url}/product/viewallproducts`);
        // Add some mock data for rating and discount to make it look like e-commerce
        const enhancedProducts = response.data.map(product => ({
          ...product,
          rating: (Math.random() * 1 + 4).toFixed(1), // Random rating between 4.0 and 5.0
          originalPrice: Math.round(product.cost * (1 + Math.random() * 0.3)), // Add original price for discount display
          discount: Math.round(Math.random() * 20), // Random discount between 0-20%
          isOrganic: Math.random() > 0.7, // 30% chance of being organic
          imageUrl: `${config.url}/product/displayproductimage?id=${product.id}`
        }));
        setProducts(enhancedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    // Show success message or notification here
  };

  const handleBuyNow = (product) => {
    // Add to cart first
    handleAddToCart(product);
    // Navigate to checkout
    navigate('/checkout');
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    return product.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.cost - b.cost;
      case 'price-high':
        return b.cost - a.cost;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="filters">
        <div className="filter-group">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="dairy">Dairy</option>
            <option value="grains">Grains</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort By:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {sortedProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                }}
              />
              {product.isOrganic && (
                <span className="badge organic">
                  <FaLeaf /> Organic
                </span>
              )}
            </div>

            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              
              <div className="product-meta">
                <div className="rating">
                  <FaStar className="star-icon" />
                  <span>{product.rating || '4.5'}</span>
                </div>
                <div className="stock-status">
                  {product.stock > 0 ? (
                    <span className="in-stock">In Stock</span>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="product-price">
                <span className="current-price">₹{product.cost.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <div className="product-actions">
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button 
                  className="buy-now-btn"
                  onClick={() => handleBuyNow(product)}
                  disabled={product.stock === 0}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyProducts;