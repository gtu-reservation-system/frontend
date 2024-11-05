import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeNavbar.css'; 

const HomeNavbar = ({ isLoggedIn, role }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${searchQuery}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <div className="home-navbar">
      <div className="logo" onClick={() => navigate('/')}>Rezerve</div>
      <nav className="navbar">
        <input
          type="text"
          placeholder="Restoran ara"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button onClick={handleSearch} disabled={!searchQuery.trim()} className="search-button">
          Ara
        </button>
        <button onClick={() => navigate('/restaurants')} className="nav-button">
          Restoranlar
        </button>

        {!isLoggedIn ? (
          <div 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            className="signup-container"
          >
            <button className="signup-button">Kayıt Ol</button>
            {showDropdown && (
              <div className="dropdown">
                <button onClick={() => navigate('/signup/owner')} className="dropdown-item">
                  Restoran Sahibi
                </button>
                <button onClick={() => navigate('/signup/user')} className="dropdown-item">
                  Kullanıcı
                </button>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => navigate(role === 'user' ? '/userProfile' : '/ownerProfile')}
            className="nav-button"
          >
            Profil
          </button>
        )}

        {!isLoggedIn ? (
          <button onClick={() => navigate('/login')} className="nav-button">Giriş Yap</button>
        ) : (
          <button onClick={() => { /* Add logout logic */ }} className="nav-button">Çıkış Yap</button>
        )}
      </nav>
    </div>
  );
};

export default HomeNavbar;
