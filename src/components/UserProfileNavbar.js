import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const UserProfileNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
    navigate('/home');  
  };

  return (
    <div className="home-navbar">
      <div className="logo" onClick={() => navigate('/')}>
        <img src="/icon.png" alt="Logo" />
        Rezerve
      </div>
      <nav>
        <button onClick={() => navigate('/home')}>Ana Sayfa</button>
        <button onClick={handleLogout}>Çıkış Yap</button>
      </nav>
    </div>
  );
};

export default UserProfileNavbar;