import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import profile from '../../Assets/mountain.jpg';
import '../../CSS/Profile.css';
import Footer from '../../components/Footer';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch user data
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Fetch orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Orders fetched:', response.data);
        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);
        } else if (response.data && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [navigate]);

  const handleShopNow = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <div className="main-container">
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-left">
            <div className="profile-image">
              <img src={profile} alt="Profile" />
            </div>
            <h2 className="user-name">{user.firstName} {user.lastName}</h2>
          </div>

          <div className="profile-right">
            <div className="profile-form">
              <h2>Profile Information</h2>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" value={user.firstName} readOnly />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input type="text" value={user.lastName} readOnly />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input type="text" value={user.phone} readOnly />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="text" value={user.email} readOnly />
              </div>
            </div>
          </div>
        </div>

        <div className="orders-section">
          <h2>My Orders</h2>
          {loading ? (
            <div className="loading">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="no-orders">
              <p>No orders found</p>
              <button onClick={handleShopNow} className="shop-now-btn">
                Shop Now
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">Order #{order._id.slice(-6)}</span>
                    <span className={`order-status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="order-details">
                    <div className="order-info">
                      <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                      <p>Total Amount: Rs. {order.amount}</p>
                      <p>Delivery Address: {order.address}</p>
                    </div>
                    <div className="order-products">
                      <h3>Order Items</h3>
                      {order.products && order.products.map((item, index) => (
                        <div key={index} className="order-product-item">
                          <div className="product-info">
                            <span className="product-name">
                              {item.product ? item.product.name || item.product.productName : 'Product'}
                            </span>
                            <span className="product-quantity">Quantity: {item.quantity}</span>
                          </div>
                          <span className="product-price">
                            Rs. {item.product ? 
                              ((item.product.price || item.product.productPrice) * item.quantity).toFixed(2) 
                              : '0.00'
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
