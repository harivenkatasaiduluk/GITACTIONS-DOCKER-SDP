import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function Dashboard() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        
        const email = sessionStorage.getItem("farmer");

        const res = await axios.get(`${config.url}/farmer/productcount`, {
          params: { email }   
        });
 
        setProductCount(res.data);   
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    
    fetchProductCount();
  }, []); 

  return (
    <div style={{ textAlign: 'center', padding: '30px', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center' }}>Farmer Dashboard</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginTop: '30px', flexWrap: 'wrap' }}>
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', padding: '25px', width: '250px' }}>
          <h3 style={{ marginBottom: '10px', color: '#333' }}>Total Products</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#17a2b8' }}>{productCount}</p>
        </div>
      </div>
    </div>
  );
}
