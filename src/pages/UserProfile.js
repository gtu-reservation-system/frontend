import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css'; 
import './Home.css';

const UserProfile = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [comments, setComments] = useState([]);
  const [id, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError('Kullanıcı giriş yapmamış!');
      return;
    }
  }, []);

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/${id}`);
          const data = response.data;
          setName(data.name);
          setPhoneNumber(data.phoneNumber);
          setEmail(data.email);
        } catch (error) {
          console.error("Kullanıcı verileri alınırken bir hata oluştu:", error);
          setError('Kullanıcı verileri yüklenemedi.');
        }
      };

      const fetchUserComments = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/comments/user/${id}`);
          setComments(response.data);
        } catch (error) {
          console.error("Kullanıcı yorumları alınırken bir hata oluştu:", error);
        }
      };

      fetchUserData();
      fetchUserComments();
    }
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleEditProfileRedirect = () => {
    navigate('/edit-userProfile');
  };

  const handlePasswordChangeRedirect = () => {
    navigate('/change-password');
  };

  const handleReservationsRedirect = () => {
    navigate('/user-reservations');
  };

  return (
    <div className="page-container">
      <div className="header">
        <div className="header-content">
          {/* Navigation elements here */}
        </div>
      </div>
      
      <div style={{ display: 'flex' }}>
        <div className="sidebar">
          <div className="sidebar-menu">
            <button 
              className="sidebar-item sidebar-item-active" 
              onClick={() => navigate()} /* NEEDS TO BE HANDLED */
            >
              Profile
            </button>
            <button 
              className="sidebar-item" 
              onClick={handleReservationsRedirect}
            >
              My Reservations
            </button>
            <button 
              className="sidebar-item" 
              onClick={handlePasswordChangeRedirect}
            >
              Change password
            </button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div className="profile-section">
            <div className="profile-info">
              <img 
                src="https://via.placeholder.com/128" 
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
                Edit profile
              </button>
              <button 
                className="logout-btn" 
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>

          <div className="comments-header">Comments</div>

          {comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <div className="comment-details">
                <img 
                  src="https://via.placeholder.com/56" 
                  alt="Restaurant" 
                  className="comment-image" 
                />
                <div className="comment-text">
                  <div className="comment-restaurant">{comment.restaurantName}</div>
                  <div className="comment-date">{comment.date}</div>
                </div>
              </div>
              <div className="comment-rating">{comment.rating}/5</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
