import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const LoginNavbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const NavigationItems = () => (
    <>
      <button className="nav-button" onClick={() => navigate('/home')}>
        Ana Sayfa
      </button>
      <button 
        className="signup-button"
        onClick={() => {
          navigate('/signup/owner');
          setIsMobileMenuOpen(false);
        }}
      >
        Restoran Kayıt
      </button>
      <button 
        className="signup-button"
        onClick={() => {
          navigate('/signup/user');
          setIsMobileMenuOpen(false);
        }}
      >
        Kullanıcı Kayıt
      </button>
    </>
  );

  return (
    <div className="home-navbar">
      <div className="navbar-main">
        <div className="logo" onClick={() => navigate('/')}>
          <img src="/icon.png" alt="Logo" />
          Rezerve
        </div>
        <button
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
        </button>
      </div>
      {/* Desktop Navigation */}
      <nav className="navbar desktop-nav">
        <NavigationItems />
      </nav>
      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default LoginNavbar;