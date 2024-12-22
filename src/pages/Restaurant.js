import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReservationForm from '../components/ReservationForm.js';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false); 

  const userId = sessionStorage.getItem('userId');

  const handleReservation = async (reservationData) => {
    try {
      if (!userId) {
        navigate('/login', { state: { from: `/restaurant/${id}` } });
        return;
      }

      const restaurantId = Number(id);
      const numberOfPeople = Number(reservationData.guests);
      const reservationStartTime = `${reservationData.date}T${reservationData.time}:00`;

      const reservationPayload = {
        restaurantId,
        userId: Number(userId),
        numberOfPeople,
        reservationStartTime,
        allergy: reservationData.hasAllergies ? reservationData.allergens : null,
        tag: reservationData.selectedTag || null,
      };

      const response = await axios.post(`${API_BASE_URL}/api/reservations`, reservationPayload);
      if (response.status === 201) {
        alert('Rezervasyonunuz başarıyla oluşturuldu!');
      }
    } catch (error) {
      console.error('Error creating reservation:', error.response ? error.response.data : error.message);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const toggleFavorite = async () => {
    try {
      setIsUpdatingFavorite(true);
  
      const favoritePayload = {
        userId: Number(userId),
        restaurantId: Number(id),
      };
  
      if (isFavorite) {
        const response = await axios.delete(`${API_BASE_URL}/api/favorites/${userId}/${id}`);
        if (response.status === 200) {
          setIsFavorite(false);
          alert('Favorilerden kaldırıldı!');
        }
      } else {
        const response = await axios.post(`${API_BASE_URL}/api/favorites`, favoritePayload);
        if (response.status === 201) {
          setIsFavorite(true); 
          alert('Favorilere eklendi!');
        }
      }
    } catch (error) {
      console.error('Favori durumu güncellenirken hata:', error.response ? error.response.data : error.message);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsUpdatingFavorite(false);
    }
  };
  
  

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/${id}`);
        const fetchedRestaurant = response.data;

        const availableSlots = getAvailableTimeSlots(fetchedRestaurant.operatingHours);

        setRestaurant(fetchedRestaurant);
        setAvailableTimeSlots(availableSlots);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Restoran verileri alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/${id}/menu-items`);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Popüler yemekler alınırken hata oluştu:", error);
        setError("Popüler yemekler yüklenemedi");
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/comments/restaurant/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Yorumlar yüklenirken hata oluştu:", error);
        setError('Yorumlar yüklenemedi');
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/favorites/${userId}`);
        const favoriteRestaurantIds = response.data.map((favorite) => favorite.restaurant.id);
        setIsFavorite(favoriteRestaurantIds.includes(Number(id)));
      } catch (error) {
        console.error('Favoriler alınamadı:', error.response ? error.response.data.message : error.message);
      }
    };

    const checkLoginStatus = () => {
      setIsLoggedIn(!!userId);
    };

    checkLoginStatus();
    fetchMenuItems();
    fetchRestaurantData();
    fetchComments();
    if (userId) {
      fetchFavorites();
    }
  }, [id, userId]);

  const getAvailableTimeSlots = (operatingHours) => {
    const slots = [];
    if (operatingHours) {
      const [startTime, endTime] = operatingHours.split('-');
      let currentTime = parseInt(startTime.split(':')[0], 10);
      const endHour = parseInt(endTime.split(':')[0], 10); 
    
      while (currentTime < endHour) {
        const startHour = `${currentTime < 10 ? '0' : ''}${currentTime}:00`;
        slots.push(startHour);  
        currentTime += 1;
      }
    }
    return slots;
  };

  if (loading) {
    return <h2>Yükleniyor...</h2>;
  }

  return (
    <div>
      <div>
        <img src={restaurant.logo} alt="Restoran Logo" className="restaurant-logo" />
        <h1>{restaurant.name}</h1>
      </div>
      <button className="favorite-button" onClick={toggleFavorite} disabled={isUpdatingFavorite}>
      {isFavorite ? '⭐ Favorilerden Kaldır' : '☆ Favorilere Ekle'}
    </button>


      <div>
        <p><strong>Fotoğraflar:</strong></p>
        {restaurant.photos && restaurant.photos.length > 0 ? (
          <div className="photo-gallery">
            {restaurant.photos.map((photo, index) => (
              <img key={index} src={photo} alt={`Restaurant fotoğrafı ${index + 1}`} className="restaurant-photo" />
            ))}
          </div>
        ) : (
          <p>Fotoğraflar bulunmamaktadır</p>
        )}
      </div>
      <strong>Adres:</strong> <p>{restaurant.address}</p>
      <strong>Etiketler:</strong> <p>{restaurant.tags?.join(', ')}</p>
      <strong>Çalışma Saatleri:</strong> <p>{restaurant.operatingHours}</p>
      <strong>Web Sitesi:</strong>{' '}
      <p>
        <a href={restaurant.websiteLink} target="_blank" rel="noopener noreferrer">
          {restaurant.websiteLink}
        </a>
      </p>
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
                  <p><strong>Etiketler:</strong> {item.tags?.join(", ") || "Yok"}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Yemekler bulunmamaktadır.</p>
          )}
        </div>
      </div>
      <div className="comments-section">
        <h2>Yorumlar</h2>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p><strong>Kullanıcı:</strong> {comment.user?.name || 'Bilinmeyen Kullanıcı'}</p>
                <p><strong>Yorum:</strong> {comment.comment}</p>
                <p><strong>Puan:</strong> {comment.rating} / 5</p>
                <p><strong>Tarih:</strong> {new Date(comment.createdAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Yorum bulunmamaktadır.</p>
        )}
      </div>

      <ReservationForm
        onSubmit={handleReservation}
        availableTimeSlots={availableTimeSlots || []}
        maxGuests={restaurant.maxGuests}
        terms={restaurant.additionalCondition}
        reservationTags={[
          restaurant.birthdayParty && 'Doğum Günü',
          restaurant.anniversary && 'Yıldönümü',
          restaurant.jobMeeting && 'İş Yemeği',
          restaurant.proposal && 'Evlilik Teklifi',
        ].filter(Boolean)}
      />
    </div>
  );
};

export default Restaurant;
