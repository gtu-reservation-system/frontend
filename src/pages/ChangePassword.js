import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChangePasswordForm from '../components/ChangePasswordForm';
import '../components/UserSignupForm.css'
import ProfileNavbar from '../components/ProfileNavbar';

const ChangePassword = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/change-password', formData);
      if (response.status === 200) {
        setMessage('Şifreniz başarıyla değiştirildi!');
      }
    } catch (error) {
      console.error("Password change failed:", error);
      setError('Şifre değiştirirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: '20px',
    fontFamily: "'Be Vietnam Pro', 'sans-serif'",
    padding: '20px'
  };

  const handleProfileRedirect = () => {
    navigate('/UserProfile');
  };

  const handleReservationsRedirect = () => {
    navigate('/user-reservations');
  };

  return (
    <div className="page-container">
      {/* Add HomeNavbar here */}
      <ProfileNavbar />
      
      <div style={{ display: 'flex' }}>
        <div className="sidebar">
          <div className="sidebar-menu">
            <button
              className="sidebar-item"
              onClick={handleProfileRedirect}
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
              className="sidebar-item sidebar-item-active"
              onClick={() => {}}
            >
              Change password
            </button>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="change-password-page">
            <h2 style={titleStyle}>Şifre Değiştir</h2>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
            <ChangePasswordForm onSubmit={handlePasswordChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;