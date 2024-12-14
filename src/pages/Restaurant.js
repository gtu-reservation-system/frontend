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
  const [error, setError] = useState(null);

  const handleReservation = async (reservationData) => {
    try {
      const userId = localStorage.getItem('userId');
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
      console.log('Response:', response.data);  
      alert('Rezervasyonunuz başarıyla oluşturuldu!');
    } catch (error) {
      console.error('Error creating reservation:', error.response ? error.response.data : error.message);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
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
  
    fetchRestaurantData();
  }, [id]);
  
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

  if (error) {
    return <h2>Hata: {error}</h2>;
  }

  if (!restaurant) {
    return <h2>Restoran verisi bulunamadı.</h2>;
  }

  return (
    <div>
<div>
  <img src={restaurant.logo} alt="Restoran Logo" className="restaurant-logo" />
  <h1>{restaurant.name}</h1>
</div>

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
