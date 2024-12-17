import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./UserReservations.css";
import './Home.css';  // Added to ensure sidebar styles are imported

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const OwnerReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);
  const restaurantId = sessionStorage.getItem('ownerId');
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

  // Handlers for navigation
  const handlePasswordChange = () => navigate('/owner-change-password');
  const handleDishesRedirect = () => navigate('/popular-dishes');
  const handleProfileRedirect = () => navigate('/ownerProfile');

  // Reservation categories
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
    <div className="page-container">
      <div className="header">
        <div className="header-content">
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-menu">
            <button className="sidebar-item" onClick={handleProfileRedirect}>
              Restoran Profil
            </button>
            <button className="sidebar-item sidebar-item-active">
              Rezervasyonlar
            </button>
            <button className="sidebar-item" onClick={handleDishesRedirect}>
              Popüler Yemekler
            </button>
            <button className="sidebar-item" onClick={handlePasswordChange}>
              Şifre Değiştir
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <div className="owner-reservations">
            <h1>Restoran Rezervasyonları</h1>
            {error && <p className="error-message">{error}</p>}

            <div className="reservations-container">
              {/* Past Reservations */}
              <section className="reservations-column">
                <h3>Geçmiş Rezervasyonlar</h3>
                {pastReservations.length > 0 ? (
                  <ul>
                    {pastReservations.map((reservation) => (
                      <li key={reservation.id}>
                        <div>
                          <p><strong>Kullanıcı Adı:</strong> {reservation.user.name}</p>
                          <p><strong>Rezervasyon Zamanı:</strong> {new Date(reservation.reservationTime).toLocaleString()}</p>
                          <p><strong>Masası:</strong> {reservation.table.name}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Geçmiş rezervasyon bulunmamaktadır.</p>
                )}
              </section>

              {/* Pending Reservations */}
              <section className="reservations-column">
                <h3>Onay Bekleyen Rezervasyonlar</h3>
                {pendingReservations.length > 0 ? (
                  <ul>
                    {pendingReservations.map((reservation) => (
                      <li key={reservation.id}>
                        <div>
                          <p><strong>Kullanıcı Adı:</strong> {reservation.user.name}</p>
                          <p><strong>Rezervasyon Zamanı:</strong> {new Date(reservation.reservationTime).toLocaleString()}</p>
                          <p><strong>Masası:</strong> {reservation.table.name}</p>
                        </div>
                        <div>
                          <button onClick={() => handleReservationAction(reservation.id, 'approve')}>Onayla</button>
                          <button onClick={() => handleReservationAction(reservation.id, 'reject')}>Reddet</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Onay bekleyen rezervasyon bulunmamaktadır.</p>
                )}
              </section>

              {/* Upcoming Reservations */}
              <section className="reservations-column">
                <h3>Yaklaşan Rezervasyonlar</h3>
                {upcomingReservations.length > 0 ? (
                  <ul>
                    {upcomingReservations.map((reservation) => (
                      <li key={reservation.id}>
                        <div>
                          <p><strong>Kullanıcı Adı:</strong> {reservation.user.name}</p>
                          <p><strong>Rezervasyon Zamanı:</strong> {new Date(reservation.reservationTime).toLocaleString()}</p>
                          <p><strong>Masası:</strong> {reservation.table.name}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Yaklaşan rezervasyon bulunmamaktadır.</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerReservations;