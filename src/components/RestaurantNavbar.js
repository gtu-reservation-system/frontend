import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';

const RestaurantNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const userId = localStorage.getItem('userId') || localStorage.getItem('ownerId');
    const userRole = localStorage.getItem('role');

    if (userId && userRole) {
      setIsLoggedIn(true);  
      setRole(userRole);   
    }
  }, []);

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

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('ownerId');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole('');
    navigate('/'); 
  };

  return (
    <div className="home-navbar">
      <div className="logo" onClick={() => navigate('/')}>
      <img src="/icon.png" alt="Logo" />
        Rezerve</div>
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
                <button onClick={() => navigate('/signup/owner')}>Restoran</button>
                <button onClick={() => navigate('/signup/user')}>Kullanıcı</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => navigate(role === 'user' ? '/userProfile' : '/ownerProfile')}>
            <FontAwesomeIcon icon={faUser} /> Profil
          </button>
        )}

        {!isLoggedIn ? (
          <button onClick={() => navigate('/login')}>Giriş Yap</button>
        ) : (
          <button onClick={handleLogout}>Çıkış Yap</button>
        )}
      </nav>
    </div>
  );
};

export default RestaurantNavbar;




