import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChangePasswordForm from '../components/ChangePasswordForm';
import '../components/UserSignupForm.css';
import UserProfileNavbar from '../components/UserProfileNavbar';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserChangePassword = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = async (formData) => {
    const { currentPassword, newPassword } = formData;
    const userId = sessionStorage.getItem('userId'); 

    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`);
      const { password: storedPassword, name, email, phoneNumber } = response.data;

      if (storedPassword !== currentPassword) {
        setError('Mevcut şifre yanlış. Lütfen doğru şifreyi girin.');
        return;
      }

      const updateResponse = await axios.put(`${API_BASE_URL}/api/users/${userId}`, {
        name,
        email,
        phoneNumber,
        password: newPassword,
      });

      if (updateResponse.status === 200) {
        setMessage('Şifreniz başarıyla değiştirildi!');
        setError('');
      }
    } catch (err) {
      console.error('Password change failed:', err);
      setError('Şifre değiştirirken bir hata oluştu. Lütfen tekrar deneyin.');
      setMessage('');
    }
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: '20px',
    fontFamily: "'Be Vietnam Pro', 'sans-serif'",
    padding: '20px',
  };

  const handleProfileRedirect = () => {
    navigate('/userProfile');
  };

  const handleReservationsRedirect = () => {
    navigate('/user-reservations');
  };

  const handleFavoritesRedirect = () => {
    navigate('/favorites');
  };
  
  return (
    <div className="page-container">
      <UserProfileNavbar />

      <div style={{ display: 'flex' }}>
        <div className="sidebar">
        <div className="sidebar-menu">
        <button
          className="sidebar-item"
          onClick={handleProfileRedirect}
        >
          Profil
        </button>
        <button
          className="sidebar-item"
          onClick={handleReservationsRedirect}
        >
          Rezervasyonlarım
        </button>
        <button
          className="sidebar-item"
          onClick={handleFavoritesRedirect}
        >
          Favorilerim
        </button>
        <button
          className="sidebar-item sidebar-item-active"
          onClick={() => {}}
        >
          Şifre Değiştir
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

export default UserChangePassword;
