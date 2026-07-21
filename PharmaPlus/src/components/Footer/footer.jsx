import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/register';

  return (
    <footer className={`global-footer ${isAuthPage ? 'auth-footer' : ''}`}>
      <p>
        {isAuthPage 
          ? "PharmaPulse Authentication Portal" 
          : "DecodeLabs Industrial Training Kit | v1.0.4"}
      </p>
    </footer>
  );
};

export default Footer;