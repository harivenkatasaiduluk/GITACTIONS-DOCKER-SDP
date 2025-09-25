import { useState, useEffect } from 'react';
import '../buyer/buyercss/buyerProfile.css';

export default function FarmerProfile() {
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    const storedFarmer = sessionStorage.getItem('farmer');
    if (storedFarmer) {
      setFarmer(JSON.parse(storedFarmer));
    }
  }, []);

  if (!farmer) {
    return <div className="loading-message">Loading profile...</div>;
  }

  return (
    <div className="buyer-profile-container">
      <h2 className="buyer-profile-heading">👤 My Profile</h2>
      <div className="buyer-profile-card">
        <p><strong>Name:</strong> {farmer.name}</p>
        <p><strong>Gender:</strong> {farmer.gender}</p>
        <p><strong>Date of Birth:</strong> {farmer.dob}</p>
        <p><strong>Email:</strong> {farmer.email}</p>
        <p><strong>Username:</strong> {farmer.username}</p>
        <p><strong>Mobile No:</strong> {farmer.mobileno}</p>
        
      </div>
    </div>
  );
}
