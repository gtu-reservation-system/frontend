import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReservationForm from '../components/ReservationForm';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ownerId = localStorage.getItem('ownerId');

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Restoran verileri alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

  const handleReserve = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/reservations`, data);
      console.log('Reservation successful:', response.data);
      alert('Rezervasyon başarılı!');
    } catch (error) {
      console.error("Error submitting reservation:", error);
      alert('Rezervasyon sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
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
      <h1>{restaurant.name}</h1>
      <p>{restaurant.description}</p>

      <ReservationForm
        onReserve={handleReserve}
        restaurantId={restaurant.id}
        availableTimeSlots={restaurant.availableTimeSlots}
        maxGuests={restaurant.maxGuests}
        terms={restaurant.terms}
        reservationTags={restaurant.reservationTags} 
        ownerId={ownerId}
      />
    </div>
  );
};

export default Restaurant;


