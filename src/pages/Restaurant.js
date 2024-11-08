import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReservationForm from '../components/ReservationForm';

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
        const response = await axios.get(`http://localhost:8080/api/restaurants/${id}`);
        setRestaurant(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Restoran verileri alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

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
        onReserve={(data) => console.log('Reservation data:', data)}
        restaurantId={restaurant.id}
        availableTimeSlots={restaurant.availableTimeSlots}
        maxGuests={restaurant.maxGuests}
        terms={restaurant.terms}
        ownerId={ownerId} 
      />
    </div>
  );
};

export default Restaurant;

