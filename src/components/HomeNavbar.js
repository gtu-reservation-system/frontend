import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faTimes, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const HomeNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const userRole = sessionStorage.getItem('role');
    const storedDarkMode = sessionStorage.getItem('darkMode');
    
    if (userId) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
    if (storedDarkMode === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.body.classList.toggle('dark-mode');
    sessionStorage.setItem('darkMode', newDarkMode);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${searchQuery}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole('');
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const NavigationItems = () => (
    <>
      <div className="nav-search-container">
        <input
          type="text"
          placeholder="Restoran ara"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="home-search-input"
        />
        <button 
          onClick={handleSearch} 
          disabled={!searchQuery.trim()} 
          className="home-search-button"
        >
          Ara
        </button>
      </div>

      <button
        onClick={toggleDarkMode}
        className="nav-button dark-mode-toggle"
        aria-label="Toggle dark mode"
      >
        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
      </button>

      {!isLoggedIn ? (
        <div className="auth-buttons">
          <div className="signup-container">
            <button 
              className="signup-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Kayıt Ol
            </button>
            {showDropdown && (
              <div className="dropdown">
                <button 
                  onClick={() => {
                    navigate('/signup/owner');
                    setIsMobileMenuOpen(false);
                  }} 
                  className="dropdown-item"
                >
                  Restoran
                </button>
                <button 
                  onClick={() => {
                    navigate('/signup/user');
                    setIsMobileMenuOpen(false);
                  }} 
                  className="dropdown-item"
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
            <FontAwesomeIcon icon={faUser} />
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
          <img
            src={isDarkMode ? "/dark-icon.png" : "/icon.png"}
            alt="Rezerve logo"
          />
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

export default HomeNavbar;