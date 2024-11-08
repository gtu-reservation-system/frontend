import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const OwnerSignupNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="home-navbar">
      <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Rezerve</div>
      <button onClick={() => navigate('/home')}>Ana Sayfa</button>
      <div>
        <button onClick={() => navigate('/signup/user')}>Kullanıcı Kaydı</button>
        <button onClick={() => navigate('/login')}>Giriş Yap</button>
      </div>
    </nav>
  );
};

export default OwnerSignupNavbar;
