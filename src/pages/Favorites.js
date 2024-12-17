import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      setError('Lütfen giriş yapınız.');
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api`/*the rest*/);
        setFavorites(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Favoriler alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  const handleRemoveFavorite = async (restaurantId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api`/*the rest*/);
      setFavorites(favorites.filter((restaurant) => restaurant.id !== restaurantId));
      alert('Favorilerden kaldırıldı.');
    } catch (err) {
      alert('Favorilerden kaldırılırken bir hata oluştu.');
    }
  };

  const handleReservationsRedirect = () => {
    navigate('/user-reservations');
  };

  const handlePasswordChangeRedirect = () => {
    navigate('/user-change-password');
  };

  if (loading) return <h2>Yükleniyor...</h2>;
  if (error) return <h2>Hata: {error}</h2>;

  if (favorites.length === 0) {
    return <h2>Hiç favori restoranınız yok.</h2>;
  }

  return (
    <div style={{ display: 'flex' }}>
      <div className="sidebar">
        <div className="sidebar-menu">
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
        <ul>
          {favorites.map((restaurant) => (
            <li key={restaurant.id} className="favorite-item">
              <div>
                <img src={restaurant.logo} alt={restaurant.name} className="favorite-logo" />
                <h3>{restaurant.name}</h3>
                <p>{restaurant.address}</p>
              </div>
              <button onClick={() => handleRemoveFavorite(restaurant.id)}>
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
