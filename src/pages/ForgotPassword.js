// ForgotPasswordPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const handleForgotPassword = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/forgot`, formData);
      if (response.status === 200) {
        navigate('/reset-password');
      }
    } catch (error) {
      console.error("Password reset request failed:", error);
      alert('Şifre sıfırlama talebi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="forgot-password">
      <ForgotPasswordForm onSubmit={handleForgotPassword} />
    </div>
  );
};

export default ForgotPasswordPage;