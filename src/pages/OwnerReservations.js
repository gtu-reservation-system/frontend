import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const OwnerReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const restaurantId = localStorage.getItem('ownerId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!restaurantId) {
      setError('Restoran giriş yapılmamış!');
      return;
    }

    const fetchReservations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/reservations/restaurant/${restaurantId}`);
        setReservations(response.data);
      } catch (error) {
        console.error("Rezervasyonlar alınırken hata oluştu:", error);
        setError('Rezervasyonlar yüklenemedi');
      }
    };

    fetchReservations();
  }, [restaurantId]);

  const pastReservations = reservations.filter(reservation => new Date(reservation.reservationTime) < new Date());
  const pendingReservations = reservations.filter(reservation => reservation.status === 'pending');
  const upcomingReservations = reservations.filter(reservation => reservation.status === 'confirmed' && new Date(reservation.reservationTime) >= new Date());

  const handleReservationAction = async (reservationId, action) => {
    try {
      await axios.post(`${API_BASE_URL}/api/reservations/${reservationId}/${action}`);
      alert(`Rezervasyon ${action === 'approve' ? 'onaylandı' : 'reddedildi'}. Kullanıcıya bildirim gönderildi.`);
      setReservations(prev => prev.filter(res => res.id !== reservationId));
    } catch (error) {
      console.error(`Rezervasyon ${action} işleminde hata oluştu:`, error);
      setError('Rezervasyon işleminde hata oluştu');
    }
  };

  return (
    <div className="owner-reservations">
      <h1>Restoran Rezervasyonları</h1>
      {error && <p className="error-message">{error}</p>}

      <button onClick={() => navigate('/ownerProfile')}>Profilim</button>

      <section>
        <h2>Geçmiş</h2>
        {pastReservations.length > 0 ? (
          <ul>
            {pastReservations.map((reservation) => (
              <li key={reservation.id}>
                <p><strong>Kullanıcı Adı:</strong> {reservation.user.name}</p>
                <p><strong>Rezervasyon Zamanı:</strong> {new Date(reservation.reservationTime).toLocaleString()}</p>
                <p><strong>Masası:</strong> {reservation.table.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Geçmiş rezervasyon bulunmamaktadır.</p>
        )}
      </section>

      <section>
        <h2>Onay Bekleyen</h2>
        {pendingReservations.length > 0 ? (
          <ul>
            {pendingReservations.map((reservation) => (
              <li key={reservation.id}>
                <p><strong>Kullanıcı Adı:</strong> {reservation.user.name}</p>
                <p><strong>Rezervasyon Zamanı:</strong> {new Date(reservation.reservationTime).toLocaleString()}</p>
                <p><strong>Masası:</strong> {reservation.table.name}</p>
                <button onClick={() => handleReservationAction(reservation.id, 'approve')}>Onayla</button>
                <button onClick={() => handleReservationAction(reservation.id, 'reject')}>Reddet</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Onay bekleyen rezervasyon bulunmamaktadır.</p>
        )}
      </section>

      <section>
        <h2>Yaklaşan</h2>
        {upcomingReservations.length > 0 ? (
          <ul>
            {upcomingReservations.map((reservation) => (
              <li key={reservation.id}>
                <p><strong>Kullanıcı Adı:</strong> {reservation.user.name}</p>
                <p><strong>Rezervasyon Zamanı:</strong> {new Date(reservation.reservationTime).toLocaleString()}</p>
                <p><strong>Masası:</strong> {reservation.table.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Yaklaşan rezervasyon bulunmamaktadır.</p>
        )}
      </section>
    </div>
  );
};

export default OwnerReservations;

