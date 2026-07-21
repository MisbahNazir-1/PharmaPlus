import React, { useState, useEffect } from 'react';
import API from './../../services/api';
import './home.css';

const Home = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    lowStock: 0,
    dispatchedQueue: 0
  });
  const [liveQueue, setLiveQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [inventoryRes, queueRes] = await Promise.all([
          API.get('/inventory'),
          API.get('/queue')
        ]);

        const inventory = inventoryRes.data || [];
        const queue = queueRes.data || [];

        // Low stock count
        const lowStockCount = inventory.filter(item => (item.stock || 0) < 10).length;
        
        // Dispatched or completed queue count
        const dispatchedCount = queue.filter(item => item.status?.toLowerCase() === 'completed').length;

        setStats({
          totalOrders: inventory.length + queue.length,
          lowStock: lowStockCount,
          dispatchedQueue: dispatchedCount
        });

        setLiveQueue(queue);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleDispense = async (id) => {
    try {
      await API.put(`/queue/dispense/${id}`);
      setLiveQueue(liveQueue.filter(item => item._id !== id));
      alert('Medicine dispensed successfully!');
    } catch (error) {
      console.error('Error dispensing medicine:', error);
      alert('Failed to dispense medicine.');
    }
  };

  return (
    <main className="dashboard-main">
      {/* Hero System Status */}
      <section className="hero-alert neon-box">
        <h2>System Status: Active & Monitoring</h2>
      </section>

      {/* 3 Core Metrics Cards */}
      <section className="metrics-container">
        <div className="metric-card neon-box">
          <h3>Total Orders</h3>
          <p className="metric-number">{stats.totalOrders}</p>
        </div>
        <div className="metric-card neon-box alert-card">
          <h3>Low Stock Alerts</h3>
          <p className="metric-number text-alert">{stats.lowStock}</p>
        </div>
        <div className="metric-card neon-box">
          <h3>Dispatched Queue</h3>
          <p className="metric-number">{stats.dispatchedQueue}</p>
        </div>
      </section>

      {/* Live Queue Section */}
      <section className="queue-section neon-box">
        <h3>Live Pharmacy Queue</h3>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#10b981' }}>Loading dashboard...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Medication</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {liveQueue.length > 0 ? (
                liveQueue.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{item.patient}</td>
                    <td>{item.medication || item.medicineName}</td>
                    <td>
                      <button 
                        className="dispense-btn" 
                        onClick={() => handleDispense(item._id)}
                      >
                        Dispense
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center' }}>No active queue records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default Home;