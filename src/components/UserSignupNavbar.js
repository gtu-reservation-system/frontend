import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSignupNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const UserSignupNavbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const NavigationItems = () => (
    <>
      <button className="nav-button" onClick={() => navigate('/home')}>
        Ana Sayfa
      </button>
      <div className="auth-buttons">
        <div className="signup-container">
          <button
            className="nav-button"
            onClick={() => navigate('/signup/owner')}
          >
            Restoran Kaydı
          </button>
          <button className="nav-button" onClick={() => navigate('/login')}>
            Giriş Yap
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="home-navbar">
      <div className="navbar-main">
        <div className="logo" onClick={() => navigate('/')}>
          <img src="/icon.png" alt="Logo" /> Rezerve
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

export default UserSignupNavbar;
