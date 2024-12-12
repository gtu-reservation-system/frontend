import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const LoginNavbar = () => {
  const navigate = useNavigate(); 
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <div className="home-navbar">
      <div className="logo" onClick={() => navigate('/')}>
      <img src="/icon.png" alt="Logo" />
        Rezerve
      </div>
      
      <nav className="navbar">
        <button className="nav-button" onClick={() => navigate('/home')}>Ana Sayfa</button>
        
        <div 
          className="signup-container" 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <button className="signup-button">Kayıt Ol</button>
          {showDropdown && (
            <div className="dropdown">
              <button className="dropdown-item" onClick={() => navigate('/signup/owner')}>Restoran</button>
              <button className="dropdown-item" onClick={() => navigate('/signup/user')}>Kullanıcı</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default LoginNavbar;