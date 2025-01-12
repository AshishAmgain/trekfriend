import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Esewa from './Esewa';
import './Payment.css';
import axios from 'axios';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchCartItems();
  }, [token, navigate]);

  const fetchCartItems = async () => {
    try {
      if (location.state?.cartItems) {
        setProducts(location.state.cartItems);
        setAmount(location.state.total || 0);
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/cart/getcart', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data && response.data.cart) {
        const cartItems = response.data.cart;
        setProducts(cartItems);
        
        const total = cartItems.reduce((sum, item) => {
          const price = item.productId?.price || 0;
          const quantity = item.quantity || 0;
          return sum + (price * quantity);
        }, 0);
        setAmount(total);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError('Unable to load cart items. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="payment-wrapper">
        <div className="loading">Loading payment details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-wrapper">
        <div className="payment-container">
          <div className="error-message">
            {error}
            <button onClick={() => navigate('/cart')} className="btn-cancel mt-4">
              Return to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <div className="payment-card">
          <div className="payment-header">
            <h2>Order Summary</h2>
          </div>

          <div className="order-summary">
            <div className="price-details">
              <div className="price-row items">
                <span>Items ({products.length}):</span>
                <span>Rs. {Number(amount).toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Shipping Fee:</span>
                <span>Free</span>
              </div>
              <div className="price-row discount">
                <span>Discount:</span>
                <span>Rs. 0.00</span>
              </div>
              <div className="price-row total">
                <span>Total Amount:</span>
                <span>Rs. {Number(amount).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="payment-actions">
            <Esewa amount={amount} />
            <button onClick={() => navigate('/cart')} className="btn-cancel">
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
