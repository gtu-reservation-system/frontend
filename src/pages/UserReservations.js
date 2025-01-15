import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import './UserReservations.css';
import './Home.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserReservations = () => {
  const [pastReservations, setPastReservations] = useState([]);
  const [pendingReservations, setPendingReservations] = useState([]);
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [error, setError] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserIdAndReservations = async () => {
      const storedUserId = sessionStorage.getItem('userId');
      if (storedUserId) {
        setUserId(Number(storedUserId));
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/reservations/user/${storedUserId}`
          );
          const reservations = response.data;
          const now = moment();
  
          const past = [];
          const pending = [];
          const upcoming = [];
  
          reservations.forEach((reservation) => {
            const reservationTime = moment(reservation.reservationStartTime);
  
            if (reservation.status === 'APPROVED') {
              if (reservationTime.isBefore(now)) {
                past.push(reservation);  // Approved and past date
              } else {
                upcoming.push(reservation);  // Approved but upcoming
              }
            } else if (reservation.status === 'PENDING') {
              if (reservationTime.isBefore(now)) {
                // Skip the reservation if it's past but still pending
                return;
              } else {
                pending.push(reservation);  // Pending and upcoming
              }
            } else {
              if (reservationTime.isBefore(now)) {
                // Skip the reservation if it's past
                return;
              }
              upcoming.push(reservation);  // If no status, treat as upcoming
            }
          });
  
          setPastReservations(past);
          setPendingReservations(pending);
          setUpcomingReservations(upcoming);
        } catch (error) {
          console.error('Error fetching reservations:', error);
          setError('Rezervasyonlar yüklenemedi.');
        }
      }
    };
  
    fetchUserIdAndReservations();
  }, []);
  

  const handleCancel = async (reservationId, type, reservationStartTime) => {
    const now = moment();
    const reservationTime = moment(reservationStartTime);

    if (reservationTime.diff(now, 'hours') < 24) {
      alert('Rezervasyon saatine 24 saatten az kaldığı için iptal edilemez.');
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/reservations/${reservationId}`);
      if (type === 'pending') {
        setPendingReservations((prev) =>
          prev.filter((res) => res.id !== reservationId)
        );
      } else if (type === 'upcoming') {
        setUpcomingReservations((prev) =>
          prev.filter((res) => res.id !== reservationId)
        );
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      alert('Rezervasyon iptal edilemedi.');
    }
  };

  const handleAddComment = async () => {
    if (!comment.trim()) {
      alert('Lütfen bir yorum girin.');
      return;
    }

    try {
      if (userId) {
        const newComment = {
          userId,
          restaurantId: pastReservations.find(
            (r) => r.id === selectedReservationId
          )?.restaurant?.id,
          comment,
          rating,
        };

        await axios.post(`${API_BASE_URL}/api/comments`, newComment);

        setPastReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.id === selectedReservationId
              ? { ...reservation, comment: comment, rating: rating }
              : reservation
          )
        );

        setComment('');
        setRating(5);
        setSelectedReservationId(null);
        alert('Yorum başarıyla eklendi.');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Yorum eklenemedi.');
    }
  };

  const renderReservations = (reservations, type) =>
    reservations.map((res) => (
      <li key={res.id}>
        <div className="reservation-details">
          {res.restaurant.name} -{' '}
          {moment(res.reservationStartTime).format('YYYY-MM-DD HH:mm')}
        </div>
        {(type === 'pending' || type === 'upcoming') && (
          <button
            onClick={() =>
              handleCancel(res.id, type, res.reservationStartTime)
            }
          >
            İptal Et
          </button>
        )}
        {type === 'past' && (
          <button onClick={() => setSelectedReservationId(res.id)}>
            Yorum Ekle
          </button>
        )}
      </li>
    ));

  const renderCommentModal = () => {
    if (!selectedReservationId) return null;

    return (
      <div className="comment-modal">
        <div className="comment-modal-content">
          <h3>Yorum Ekle</h3>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Yorumunuzu buraya yazın"
            rows="4"
          />
          <div className="rating-container">
            <label>Rating: </label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <React.Fragment key={star}>
                  <input
                    type="radio"
                    id={`star${star}`}
                    name="rating"
                    value={star}
                    checked={rating === star}
                    onChange={() => setRating(star)}
                  />
                  <label htmlFor={`star${star}`}>&#9733;</label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="comment-modal-actions">
            <button onClick={handleAddComment}>Gönder</button>
            <button onClick={() => setSelectedReservationId(null)}>
              İptal
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="page-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-content">
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-menu">
            <button className="sidebar-item" onClick={() => navigate('/userProfile')}>
              Profil
            </button>
            <button className="sidebar-item sidebar-item-active">
              Rezervasyonlarım
            </button>
            <button className="sidebar-item" onClick={() => navigate('/favorites')}>
              Favorilerim
            </button>
            <button
              className="sidebar-item"
              onClick={() => navigate('/user-change-password')}
            >
              Şifre Değiştir
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <h2>Rezervasyonlarım</h2>
          {error && <p className="error-message">{error}</p>}

          <div className="reservations-container">
            <div className="reservations-column">
              <h3>Geçmiş Rezervasyonlar</h3>
              <ul>{renderReservations(pastReservations, 'past')}</ul>
            </div>

            <div className="reservations-column">
              <h3>Onay Bekleyen Rezervasyonlar</h3>
              <ul>{renderReservations(pendingReservations, 'pending')}</ul>
            </div>

            <div className="reservations-column">
              <h3>Yaklaşan Rezervasyonlar</h3>
              <ul>{renderReservations(upcomingReservations, 'upcoming')}</ul>
            </div>
          </div>

          {renderCommentModal()}
        </div>
      </div>
    </div>
  );
};

export default UserReservations;
