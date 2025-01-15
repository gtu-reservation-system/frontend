import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const UserProfileNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleHomeNavigation = () => {
    setIsMobileMenuOpen(false);
    navigate('/home');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
    setIsMobileMenuOpen(false);
    navigate('/home');
  };

  const NavigationItems = () => (
    <div className="auth-buttons">
      <button onClick={handleHomeNavigation} className="nav-button">
        Ana Sayfa
      </button>
      <button onClick={handleLogout} className="nav-button">
        Çıkış Yap
      </button>
    </div>
  );

  return (
    <div className="home-navbar">
      <div className="navbar-main">
        <div className="logo" onClick={handleHomeNavigation}>
          <img src="/icon.png" alt="Rezerve logo" />
          <span>Rezerve</span>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Desktop navigation */}
      <nav className="navbar desktop-nav">
        <NavigationItems />
      </nav>

      {/* Mobile navigation */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default UserProfileNavbar;