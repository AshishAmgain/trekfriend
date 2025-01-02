import React, { useEffect, useState } from 'react';
import profile from '../../Assets/mountain.jpg';
import '../../CSS/Profile.css';
import Footer from '../../components/Footer';

function Profile() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    timeZone: '+5 GMT' // Default value, or fetch from user data
  });

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <>
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-left">
            <div className="profile-image">
              <img src={profile} alt="Profile" />
            </div>
            <button className="linkedin-btn">Connect to LinkedIn</button>
          </div>

          <div className="profile-right">
            <div className="profile-form">
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

            <div className="profile-footer">
              <button className="cancel-btn">✖</button>
              <button className="save-btn">✔</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Profile;
