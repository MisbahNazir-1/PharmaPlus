import React, { useState, useEffect } from 'react';
import API from './../../services/api'; 
import './queue.css';

const Queue = () => {
  const [queueList, setQueueList] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await API.get('/queue'); 
        setQueueList(response.data);
      } catch (error) {
        console.error('Error fetching queue data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQueue();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'processing':
        return '#10b981';
      case 'waiting':
        return '#ffb703'; 
      case 'completed':
        return '#00b4d8'; 
      default:
        return '#ffffff';
    }
  };

  return (
    <main className="queue-main">
      <section className="queue-header neon-box">
        <h2>Pharmacy Live Queue</h2>
      </section>

      <section className="queue-list neon-box">
        {loading ? (
          <p style={{ textAlign: 'center', color: '#10b981' }}>Loading live queue...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Ticket #</th>
                <th>Patient Name</th>
                <th>Medication</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {queueList.length > 0 ? (
                queueList.map((patient, index) => (
                  <tr key={patient._id || index}>
                    <td>{patient.ticketNumber || `#00${index + 1}`}</td>
                    <td>{patient.patient}</td>
                    <td>{patient.medication || new Date(patient.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                    <td style={{ color: getStatusColor(patient.status), fontWeight: 'bold' }}>
                      {patient.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No patients in the queue right now.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default Queue;