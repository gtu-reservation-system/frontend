import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 

const RestaurantNavbar = ({ isLoggedIn, role }) => {
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
    <div className="restaurant-navbar">
      <div className="logo" onClick={() => navigate('/')}>Rezerve</div> 
      <nav>
        <input
          type="text"
          placeholder="Restoran ara"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          aria-label="Restaurant search" 
        />
        <button onClick={handleSearch} disabled={!searchQuery.trim()}>Ara</button>
        <button onClick={() => navigate('/home')}>Ana Sayfa</button> 
        <button onClick={() => navigate('/restaurants')}>Restoranlar</button> 

        {!isLoggedIn ? (
          <div 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            className="signup-container"
          >
            <button>Kayıt Ol</button>
            {showDropdown && (
              <div className="dropdown">
                <button onClick={() => navigate('/signup/owner')}>Restoran Sahibi</button>
                <button onClick={() => navigate('/signup/user')}>Kullanıcı</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate(role === 'user' ? '/userProfile' : '/ownerProfile')}>
            <FontAwesomeIcon icon={faUser} /> Profil
          </button>
        )}
        {!isLoggedIn && (
          <button onClick={() => navigate('/login')}>Giriş Yap</button>
        )}
      </nav>
    </div>
  );
};

export default RestaurantNavbar;


