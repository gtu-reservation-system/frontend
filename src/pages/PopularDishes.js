import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PopularDishes = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const restaurantId = sessionStorage.getItem('ownerId'); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!restaurantId) {
      setError('Restoran ID eksik!');
      return;
    }

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/${restaurantId}/menu-items`);
        setMenuItems(response.data);
      } catch (error) {
        console.error('Popüler yemekler alınırken hata oluştu:', error);
        setError('Popüler yemekler yüklenemedi');
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

  return (
    <div className="popular-dishes">
      <h1>Popüler Yemekler</h1>
      {error && <p className="error-message">{error}</p>}

      <div>
        {menuItems.length > 0 ? (
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p><strong>Açıklama:</strong> {item.description}</p>
                <p><strong>Fiyat:</strong> {item.price} ₺</p>
                <p><strong>Etiketler:</strong> {item.tags?.join(', ') || 'Yok'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Yemekler bulunmamaktadır.</p>
        )}
      </div>

      <button onClick={() => navigate('/ownerProfile')}>Profil</button>
    </div>
  );
};

export default PopularDishes;
