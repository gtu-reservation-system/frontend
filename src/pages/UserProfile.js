import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css'; 
import './Home.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState([]);
  const [id, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/users/${id}`);
          const data = response.data;
          setName(data.name);
          setEmail(data.email);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      const fetchUserComments = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/comments/user/${id}`);
          setComments(response.data);
        } catch (error) {
          console.error("Error fetching user comments:", error);
        }
      };

      fetchUserData();
      fetchUserComments();
    }
  }, [id]);

  const handleEditProfileRedirect = () => {
    navigate('/edit-userProfile');
  };

  const handlePasswordChangeRedirect = () => {
    navigate('/user-change-password');
  };

  const handleReservationsRedirect = () => {
    navigate('/user-reservations');
  };

  const handleFavoritesRedirect = () => {
    navigate('/favorites');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Hesabınızı silmek istediğinizden emin misiniz?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/users/${id}`);
        sessionStorage.removeItem('userId'); 
        navigate('/login');  
      } catch (error) {
        console.error('Hesap silinirken hata oluştu:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/comments/${commentId}`);
        setComments(comments.filter(comment => comment.id !== commentId));
      } catch (error) {
        console.error('Yorum silinirken hata oluştu:', error);
      }
    }
  };

  return (
    <div className="page-container">
      <div className="header">
        <div className="header-content">
        </div>
      </div>
      
      <div style={{ display: 'flex' }}>
        <div className="sidebar">
          <div className="sidebar-menu">
            <button className="sidebar-item sidebar-item-active">Profil</button>
            <button className="sidebar-item" onClick={handleReservationsRedirect}>
              Rezervasyonlarım
            </button>
            <button className="sidebar-item" onClick={handleFavoritesRedirect}>
              Favorilerim
            </button>
            <button className="sidebar-item" onClick={handlePasswordChangeRedirect}>
              Şifre Değiştir
            </button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="profile-section">
            <div className="profile-info">
              <img 
                src="wizard.jpg" 
                alt="Profile" 
                className="profile-image" 
              />
              <div className="profile-details">
                <div className="profile-name">{name}</div>
                <div className="profile-email">{email}</div>
              </div>
            </div>
            <div className="profile-actions">
              <button 
                className="edit-profile-btn" 
                onClick={handleEditProfileRedirect}
              >
                Profili Düzenle
              </button>
              <button 
                className="delete-account-btn" 
                onClick={handleDeleteAccount}
                style={{ backgroundColor: 'red', color: 'white' }}
              >
                Hesabı Sil
              </button>
            </div>
          </div>

          <div className="comments-header">Yorumlar</div>

          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <div className="comment-details">
                  <img 
                    src="https://via.placeholder.com/56" 
                    alt="Restaurant" 
                    className="comment-image" 
                  />
                  <div className="comment-text">
                    <div className="comment-restaurant">{comment.restaurantName}</div>
                    <div className="comment-comment">{comment.comment}</div>
                    <div className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="comment-rating">{comment.rating}/5</div>
                <button 
                  className="delete-comment-btn" 
                  onClick={() => handleDeleteComment(comment.id)} 
                  style={{ backgroundColor: 'red', color: 'white' }}
                >
                  Yorum Sil
                </button>
              </div>
            ))
          ) : (
            <div>Henüz yorum yapılmamış.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
