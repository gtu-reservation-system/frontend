import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); 

  const userId = sessionStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      console.error('Lütfen giriş yapınız.');
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/favorites/${userId}`);
        setFavorites(response.data);
      } catch (err) {
        console.error(err.response ? err.response.data.message : 'Favoriler alınamadı.');
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleReservationsRedirect = () => {
    navigate('/user-reservations');
  };

  const handlePasswordChangeRedirect = () => {
    navigate('/user-change-password');
  };

  const handleRemoveFavorite = async (restaurantId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/favorites/${userId}/${restaurantId}`);
      setFavorites(favorites.filter((favorite) => favorite.restaurant.id !== restaurantId)); 
      setSuccessMessage('Favorilerden Kaldırıldı');  
      setTimeout(() => setSuccessMessage(''), 3000);  
    } catch (err) {
      console.error(err.response ? err.response.data.message : 'Favori kaldırılamadı.');
    }
  };


  return (
    <div style={{ display: 'flex' }}>
      <div className="sidebar">
        <div className="sidebar-menu">
          <button className="sidebar-item" onClick={() => navigate('/userProfile')}>
              Profil
            </button>
          <button className="sidebar-item" onClick={handleReservationsRedirect}>
            Rezervasyonlarım
          </button>
          <button className="sidebar-item sidebar-item-active">
            Favorilerim
          </button>
          <button className="sidebar-item" onClick={handlePasswordChangeRedirect}>
            Şifre Değiştir
          </button>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h1>Favori Restoranlar</h1>
        
        {successMessage && <div className="success-message">{successMessage}</div>}

        <ul>
          {favorites.map((restaurant) => (
            <li key={restaurant.restaurant.id} className="favorite-item">
              <div>
                <h3
                style={{ color: 'black', cursor: 'pointer' }}
                onClick={() => navigate(`/restaurants/${restaurant.restaurant.id}`)}>
                {restaurant.restaurantName}</h3>
              </div>
              <button onClick={() => handleRemoveFavorite(restaurant.restaurant.id)}>
                Favorilerden Kaldır
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
