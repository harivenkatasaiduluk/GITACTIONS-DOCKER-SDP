import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../buyer/buyercss/buyerProfile.css';

export default function BuyerProfile() {
  const [buyer, setBuyer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBuyer = sessionStorage.getItem('buyer');
    if (storedBuyer) {
      setBuyer(JSON.parse(storedBuyer));
    }
  }, []);

  if (!buyer) {
    return <div className="loading-message">Loading profile...</div>;
  }

  return (
    <div className="buyer-profile-container">
      <h2 className="buyer-profile-heading">👤 My Account</h2>
      <div className="buyer-profile-card">
        <p><strong>Name:</strong> {buyer.name}</p>
        <p><strong>Gender:</strong> {buyer.gender}</p>
        <p><strong>Date of Birth:</strong> {buyer.dob}</p>
        <p><strong>Email:</strong> {buyer.email}</p>
        <p><strong>Username:</strong> {buyer.username}</p>
        <p><strong>Mobile No:</strong> {buyer.mobileno}</p>
        <p><strong>Location:</strong> {buyer.location}</p>
      </div>
      <button className="profile-update-btn" onClick={() => navigate('/UpdateProfile')}>
        ✏️ Update My Profile
      </button>
    </div>
  );
}
