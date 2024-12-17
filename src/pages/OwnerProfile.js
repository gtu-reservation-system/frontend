import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css'; 
import './Home.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const OwnerProfile = () => {
  const [ownerData, setOwnerData] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const id = sessionStorage.getItem('ownerId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError('Restoran sayfasına giriş yapılmamış!');
      return;
    }

    const fetchOwnerData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/${id}`);
        setOwnerData(response.data);
      } catch (error) {
        console.error("Profil verileri alınırken hata oluştu:", error);
        setError('Profil verileri yüklenemedi');
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

    fetchOwnerData();
    fetchComments();
  }, [id]);

  const handleEditProfile = () => navigate('/edit-ownerProfile');
  const handleReservationsRedirect = () => navigate('/owner-reservations');
  const handlePasswordChange = () => navigate('/owner-change-password');
  const handleDishesRedirect = () => navigate('/popular-dishes');

  const handleDeleteAccount = async () => {
    if (window.confirm('Hesabınızı silmek istediğinizden emin misiniz?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/restaurants/${id}`);
        sessionStorage.removeItem('ownerId');
        navigate('/');
      } catch (error) {
        console.error('Hesap silinirken hata oluştu:', error);
        setError('Hesap silinemedi');
      }
    }
  };

  const tableCounts = ownerData.tables?.reduce(
    (counts, table) => {
      counts[table.capacity] = (counts[table.capacity] || 0) + 1;
      return counts;
    },
    { 2: 0, 4: 0, 6: 0 }
  );

  const specialDays = [
    ownerData.birthdayParty && 'Doğum Günü',
    ownerData.anniversary && 'Yıldönümü',
    ownerData.jobMeeting && 'İş Yemeği',
    ownerData.proposal && 'Evlilik Teklifi',
  ].filter(Boolean);

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
            <button className="sidebar-item sidebar-item-active">Restoran Profil</button>
            <button className="sidebar-item" onClick={handleReservationsRedirect}>
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
          <div className="owner-profile">
            <div className="profile-section">
              <div className="profile-info">
                {ownerData.logo ? (
                  <img 
                    src={ownerData.logo} 
                    alt="Restoran Logo" 
                    className="profile-image" 
                  />
                ) : (
                  <div className="profile-image" style={{backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    Logo Yok
                  </div>
                )}
                <div className="profile-details">
                  <h1 className="profile-name">{ownerData.name}</h1>
                  <p className="profile-email">{ownerData.email}</p>
                </div>
              </div>
              <div className="profile-actions">
                <button 
                  className="edit-profile-btn" 
                  onClick={handleEditProfile}
                >
                  Profili Düzenle
                </button>
                <button 
                  className="logout-btn" 
                  onClick={handleDeleteAccount}
                >
                  Hesabı Sil
                </button>
              </div>
            </div>

            <div className="comments-section">
              <h2 className="comments-header">Restoran Detayları</h2>
              <div className="comment-item">
                <div className="comment-details">
                  <div className="comment-text">
                    <p><strong>Adres:</strong> {ownerData.address}</p>
                    <p><strong>Telefon Numarası:</strong> {ownerData.phoneNumber}</p>
                    <p><strong>Çalışma Saatleri:</strong> {ownerData.operatingHours}</p>
                  </div>
                </div>
              </div>

              <div className="comment-item">
                <div className="comment-details">
                  <div className="comment-text">
                    <p><strong>2 Kişilik Masa Sayısı:</strong> {tableCounts?.[2]}</p>
                    <p><strong>4 Kişilik Masa Sayısı:</strong> {tableCounts?.[4]}</p>
                    <p><strong>6 Kişilik Masa Sayısı:</strong> {tableCounts?.[6]}</p>
                  </div>
                </div>
              </div>

              <div className="comment-item">
                <div className="comment-details">
                  <div className="comment-text">
                    <p><strong>Şartlar:</strong> {ownerData.additionalCondition || 'Şartlar belirtilmemiş'}</p>
                    <p><strong>Özel Günler:</strong> {specialDays.length > 0 ? specialDays.join(', ') : 'Özel günler belirtilmemiş'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="comments-section">
              <h2 className="comments-header">Yorumlar</h2>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-details">
                      <div className="comment-text">
                        <p className="comment-restaurant">
                          {comment.user?.name || 'Bilinmeyen Kullanıcı'}
                        </p>
                        <p className="comment-comment">{comment.comment}</p>
                        <div className="comment-meta">
                          <span className="comment-date">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                          <span className="comment-rating">
                            Puan: {comment.rating} / 5
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Yorum bulunmamaktadır.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
