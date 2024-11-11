import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const ProfileNavbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/home');  
  };

  return (
    <div className="home-navbar">
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Rezerve</div>
      <nav>
        {role !== 'owner' && <button onClick={() => navigate('/home')}>Ana Sayfa</button>}
        <button onClick={handleLogout}>Çıkış Yap</button>
      </nav>
    </div>
  );
};

export default ProfileNavbar;



