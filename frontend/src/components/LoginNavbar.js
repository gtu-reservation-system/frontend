import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div className="login-navbar">
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Rezerve</div>
      <nav>
        <button onClick={() => navigate('/home')}>Ana Sayfa</button>
        
        <div 
          className="signup-container" 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <button>Kayıt Ol</button>
          {showDropdown && (
            <div className="dropdown">
              <button onClick={() => navigate('/signup/owner')}>Restoran Sahibi</button>
              <button onClick={() => navigate('/signup/user')}>Kullanıcı</button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default LoginNavbar;



