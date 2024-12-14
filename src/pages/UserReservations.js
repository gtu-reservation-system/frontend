import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserReservations = () => {
  const [pastReservations, setPastReservations] = useState([]);
  const [pendingReservations, setPendingReservations] = useState([]);
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`${API_BASE_URL}/api/reservations/user/${userId}`);
        const reservations = response.data;

        const now = moment();

        const past = [];
        const pending = [];
        const upcoming = [];

        reservations.forEach(reservation => {
          const reservationTime = moment(reservation.reservationStartTime);

          if (reservationTime.isBefore(now)) {
            past.push(reservation);
          } else if (!reservation.confirmed) {
            pending.push(reservation);
          } else {
            upcoming.push(reservation);
          }
        });

        setPastReservations(past);
        setPendingReservations(pending);
        setUpcomingReservations(upcoming);

      } catch (error) {
        console.error("Error fetching reservations:", error);
        setError('Rezervasyonlar yüklenemedi.');
      }
    };

    fetchReservations();
  }, []);

  const handleCancel = async (reservationId, type) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/reservations/${reservationId}`);
      if (type === 'pending') {
        setPendingReservations(prev => prev.filter(res => res.id !== reservationId));
      } else if (type === 'upcoming') {
        setUpcomingReservations(prev => prev.filter(res => res.id !== reservationId));
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
      alert('Rezervasyon iptal edilemedi.');
    }
  };

  const renderReservations = (reservations, type) => (
    reservations.map(res => (
      <li key={res.id}>
        {res.restaurant.name} - {moment(res.reservationStartTime).format("YYYY-MM-DD HH:mm")}
        {(type === 'pending' || type === 'upcoming') && (
          <button
            onClick={() => handleCancel(res.id, type)}
            style={{ marginLeft: '10px' }}
          >
            İptal Et
          </button>
        )}
      </li>
    ))
  );

  return (
    <div className="user-reservations">
      <h2>Rezervasyonlarım</h2>
      {error && <p className="error-message">{error}</p>}

      <button onClick={() => navigate('/userProfile')}>Profilim</button>

      <section>
        <h3>Geçmiş</h3>
        <ul>{renderReservations(pastReservations)}</ul>
      </section>

      <section>
        <h3>Onay Bekleyen</h3>
        <ul>{renderReservations(pendingReservations, 'pending')}</ul>
      </section>

      <section>
        <h3>Yaklaşan</h3>
        <ul>{renderReservations(upcomingReservations, 'upcoming')}</ul>
      </section>
    </div>
  );
};

export default UserReservations;
