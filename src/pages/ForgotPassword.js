import React, { useState } from 'react';
import axios from 'axios';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ForgotPassword = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = async (email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/forgot-password`, { email });
      if (response.status === 200) {
        setMessage('E-posta gönderildi!');
        setError('');
      }
    } catch (err) {
      console.error('Password reset request failed:', err);
      setError('Şifre sıfırlama talebi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      setMessage('');
    }
  };

  return (
    <div className="forgot-password-page">
      <h2>Şifremi Unuttum</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <ForgotPasswordForm onSubmit={handleForgotPassword} />
    </div>
  );
};

export default ForgotPassword;
