import React, { useState, useEffect } from 'react';
import API from './../../services/api';
import './inventory.css';

const Inventory = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await API.get('/inventory'); 
        setMedicines(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  return (
    <main className="inventory-main">
      <section className="inventory-header neon-box">
        <h2>Pharmacy Inventory</h2>
        <button className="add-btn">+ Add Medicine</button>
      </section>

      <section className="inventory-list neon-box">
        {loading ? (
          <p style={{ textAlign: 'center', color: '#10b981' }}>Loading inventory...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Stock</th>
                <th>Threshold</th>
                <th>Expiry</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {medicines.length > 0 ? (
                medicines.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name || item.medicineName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.threshold}</td>
                    <td>{item.expiryDate ? item.expiryDate.split('T')[0] : item.expiry}</td>
                    <td style={{ color: item.quantity < item.threshold ? '#ff4d4d' : '#10b981' }}>
  {item.quantity < item.threshold ? 'Low Stock' : 'In Stock'}
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No medicines found in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default Inventory;