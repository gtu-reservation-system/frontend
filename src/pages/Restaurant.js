import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../components/ReservationForm.js';
import ReservationForm from '../components/ReservationForm.js';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ownerId = localStorage.getItem('ownerId');

  const handleReservation = (reservationData) => {
    console.log('Reservation confirmed:', reservationData);
    alert('Rezervasyonunuz başarıyla oluşturuldu!');
  };

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

      <p><img src={restaurant.logo} alt="Restoran Logo" className="restaurant-logo" /> <h1>{restaurant.name}</h1></p> 
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
      <strong>Etiketler:</strong> <p> {restaurant.tags?.join(', ')}</p>
      <strong>Çalışma Saatleri:</strong> <p>{restaurant.operatingHours}</p>
      <strong>Web Sitesi:</strong> <p> <a href={restaurant.websiteLink} target="_blank" rel="noopener noreferrer">{restaurant.websiteLink}</a> </p>

      <ReservationForm 
        onReserve={handleReservation} 
        restaurantId={id}
        availableTimeSlots={restaurant.availableTimeSlots || []} 
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


