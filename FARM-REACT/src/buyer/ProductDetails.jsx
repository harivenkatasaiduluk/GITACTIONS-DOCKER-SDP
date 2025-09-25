import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar, FaLeaf, FaTruck, FaUndo, FaShieldAlt } from 'react-icons/fa';
import '../buyer/buyercss/productdetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call to get product details
    const fetchProduct = async () => {
      try {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const foundProduct = products.find(p => p.id === parseInt(id));
        
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error loading product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        ...product,
        quantity
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <h2>{error || 'Product not found'}</h2>
        <button onClick={() => navigate('/buyproducts')} className="back-btn">
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <div className="product-content">
        <div className="product-gallery">
          <div className="main-image">
            <img src={product.imageUrl} alt={product.name} />
          </div>
          <div className="product-badges">
            {product.isOrganic && (
              <span className="badge organic">
                <FaLeaf /> Organic
              </span>
            )}
            {product.isFresh && (
              <span className="badge fresh">Fresh</span>
            )}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          
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
            {product.discount && (
              <span className="discount-badge">{product.discount}% OFF</span>
            )}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-features">
            <div className="feature">
              <FaTruck />
              <span>Free Delivery</span>
            </div>
            <div className="feature">
              <FaUndo />
              <span>Easy Returns</span>
            </div>
            <div className="feature">
              <FaShieldAlt />
              <span>Quality Assured</span>
            </div>
          </div>

          <div className="quantity-selector">
            <button 
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span>{quantity}</span>
            <button 
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>

          <div className="action-buttons">
            <button 
              className="add-to-cart-btn"
              onClick={addToCart}
              disabled={product.stock === 0}
            >
              <FaShoppingCart /> Add to Cart
            </button>
            <button 
              className="buy-now-btn"
              onClick={() => {
                addToCart();
                navigate('/checkout');
              }}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
          </div>

          <div className="product-details">
            <div className="detail-section">
              <h3>Product Details</h3>
              <ul>
                <li><strong>Category:</strong> {product.category}</li>
                <li><strong>Weight:</strong> {product.weight}</li>
                <li><strong>Storage:</strong> {product.storage}</li>
                <li><strong>Best Before:</strong> {product.bestBefore}</li>
              </ul>
            </div>

            <div className="detail-section">
              <h3>Shipping Information</h3>
              <ul>
                <li>Free delivery on orders above ₹500</li>
                <li>Delivery within 2-3 business days</li>
                <li>Cash on Delivery available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;