import React, { useState, useEffect } from 'react';
import API from './../../services/api';
import './appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await API.get('/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return '#10b981'; 
      case 'pending':
        return '#ffb703'; 
      case 'cancelled':
        return '#ff4d4d';
      default:
        return '#ffffff';
    }
  };

  return (
    <main className="appointments-main">
      <section className="appointments-header neon-box">
        <h2>Doctor Appointments</h2>
      </section>

      <section className="appointments-list neon-box">
        {loading ? (
          <p style={{ textAlign: 'center', color: '#10b981' }}>Loading appointments...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Age</th>
                <th>Contact No.</th>
                <th>Date</th>
                <th>Status</th>
                <th>Time</th>
  
              </tr>
            </thead>
            <tbody>
              {appointments.length > 0 ? (
                appointments.map((item, index) => (
                  <tr key={item._id || index}>
                    <td>{item.patientName}</td>
                    <td>{item.age }</td>
                    <td>{item.contactNumber}</td>
                    <td>{item.appointmentDate ? item.appointmentDate.split('T')[0] : item.date}</td>
                    <td style={{ color: getStatusColor(item.status), fontWeight: 'bold' }}>
                      {item.status}
                    </td>
                    <td>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>No appointments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default Appointments;