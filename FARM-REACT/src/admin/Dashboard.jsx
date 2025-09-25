import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function Dashboard() {
  const [buyerCount, setBuyerCount] = useState(0);
  const [farmerCount, setFarmerCount] = useState(0);
 
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const buyerRes = await axios.get(`${config.url}/admin/buyercount`);
        const farmerRes = await axios.get(`${config.url}/admin/farmercount`);
        setBuyerCount(buyerRes.data);
        setFarmerCount(farmerRes.data);
       } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    fetchCounts();
  }, []);
  return (
    <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
     <h2 style={{ textAlign: 'center' }}>  Admin Dashboard</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '30px', flexWrap: 'wrap' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', padding: '25px', width: '200px' }}>
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Buyers</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>{buyerCount}</p>
        </div>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', padding: '25px', width: '200px' }}>
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Farmers</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>{farmerCount}</p>
        </div>
      </div>
    </div>
  );
}
