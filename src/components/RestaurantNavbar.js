import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const RestaurantNavbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId') || sessionStorage.getItem('ownerId');
    const userRole = sessionStorage.getItem('role');

    if (userId && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('ownerId');
    sessionStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole('');
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const NavigationItems = () => (
    <>
      <button onClick={() => navigate('/home')} className="nav-button">
        Ana Sayfa
      </button>
      <button onClick={() => navigate('/restaurants')} className="nav-button">
        Restoranlar
      </button>
      {!isLoggedIn ? (
        <div className="auth-buttons">
          <div
            className="signup-container"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="nav-button">Kayıt Ol</button>
            {showDropdown && (
              <div className="dropdown">
                <button
                  onClick={() => {
                    navigate('/signup/owner');
                    setIsMobileMenuOpen(false);
                  }}
                  className="dropdown-button"
                >
                  Restoran
                </button>
                <button
                  onClick={() => {
                    navigate('/signup/user');
                    setIsMobileMenuOpen(false);
                  }}
                  className="dropdown-button"
                >
                  Kullanıcı
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              navigate('/login');
              setIsMobileMenuOpen(false);
            }}
            className="nav-button"
          >
            Giriş Yap
          </button>
        </div>
      ) : (
        <div className="auth-buttons">
          <button
            onClick={() => {
              navigate(role === 'user' ? '/userProfile' : '/ownerProfile');
              setIsMobileMenuOpen(false);
            }}
            className="nav-button"
          >
            <FontAwesomeIcon icon={faUser} /> Profil
          </button>
          <button onClick={handleLogout} className="nav-button">
            Çıkış Yap
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="home-navbar">
      <div className="navbar-main">
        <div className="logo" onClick={() => navigate('/')}>
          <img src="/icon.png" alt="Rezerve logo" />
          Rezerve
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
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

export default RestaurantNavbar;
