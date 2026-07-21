import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* 1. Left Side: Logo */}
      <div className="nav-logo">PharmaPulse</div>

      {/* 2. Center Side: Dashboard Links */}
      {!isAuthPage && (
        <ul className="nav-links">
          <li><Link to="/home">Dashboard</Link></li>
          <li><Link to="/queue">Live Queue</Link></li>
          <li><Link to="/inventory">Inventory</Link></li>
          <li><Link to="/appointments">Appointments</Link></li>
        </ul>
      )}

      {/* 3. Right Side */}
      {isAuthPage ? (
        <div className="demo-card">
          <span><strong>Demo Access:</strong></span>
          <p>Email: <code>admin@user.com</code></p>
          <p>Pass: <code>123456</code></p>
        </div>
      ) : (
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
};

export default Navbar;