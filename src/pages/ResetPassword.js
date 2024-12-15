import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ResetPasswordForm from '../components/ResetPasswordForm';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ResetPassword = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handlePasswordReset = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/reset`, data);
      if (response.status === 200) {
        setMessage('Şifre başarıyla sıfırlandı!');
        navigate('/login');
        setError('');
      }
    } catch (err) {
      console.error('Password reset failed:', err);
      setError('Şifre sıfırlama sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      setMessage('');
    }
  };

  return (
    <div className="forgot-password-token-page">
      <h2>Şifreyi Sıfırla</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <ResetPasswordForm onSubmit={handlePasswordReset} />
    </div>
  );
};

export default ResetPassword;
