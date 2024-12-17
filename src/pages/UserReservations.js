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
  const [comment, setComment] = useState(''); 
  const [rating, setRating] = useState(5); 
  const [restaurantId, setRestaurantId] = useState(null); 
  const [userId, setUserId] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserIdAndReservations = async () => {
      const storedUserId = sessionStorage.getItem('userId');
      if (storedUserId) {
        setUserId(Number(storedUserId));
      }

      if (storedUserId) {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/reservations/user/${storedUserId}`);
          const reservations = response.data;
          setRestaurantId(reservations[0]?.restaurant?.id);
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
      }
    };

    fetchUserIdAndReservations();
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

  const handleAddComment = async (reservationId) => {
    if (!comment.trim()) {
      alert("Lütfen bir yorum girin.");
      return;
    }

    try {
      if (userId) {
        const newComment = {
          userId, 
          restaurantId, 
          comment, 
          rating 
        };
    
        await axios.post(`${API_BASE_URL}/api/comments`, newComment);

        setPastReservations(prevReservations => 
          prevReservations.map(reservation => 
            reservation.id === reservationId ? { ...reservation, comment: comment, rating: rating } : reservation
          )
        );

        setComment('');
        setRating(5);
        alert('Yorum başarıyla eklendi.');
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert('Yorum eklenemedi.');
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
        {type === 'past' && (
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Yorumunuzu buraya yazın"
              rows="4"
              style={{ width: '100%', marginTop: '10px' }}
            />
            <div style={{ marginTop: '10px' }}>
              <label>Rating: </label>
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                {[1, 2, 3, 4, 5].map(r => (
                  <option key={r} value={r}>{r} Yıldız</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => handleAddComment(res.id)}
              style={{ marginTop: '10px' }}
            >
              Yorum Ekle
            </button>
          </div>
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
        <ul>{renderReservations(pastReservations, 'past')}</ul>
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
