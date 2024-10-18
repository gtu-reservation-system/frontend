import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserSignupNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="user-signup-navbar">
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Rezerve</div>
      <button onClick={() => navigate('/home')}>Ana Sayfa</button>
      <div>
        <button onClick={() => navigate('/signup/owner')}>Restoran Sahibi Kaydı</button>
        <button onClick={() => navigate('/login')}>Giriş Yap</button>
      </div>
    </nav>
  );
};

export default UserSignupNavbar;
