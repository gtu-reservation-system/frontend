import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const ProfileNavbar = () => {
  const navigate = useNavigate();

  return (
    <div className="home-navbar">
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Rezerve</div>
      <nav>
        <button onClick={() => navigate('/home')}>Ana Sayfa</button>
      </nav>
    </div>
  );
};

export default ProfileNavbar;
