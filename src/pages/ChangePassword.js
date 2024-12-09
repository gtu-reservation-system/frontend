import React, { useState } from 'react';
import axios from 'axios';
import ChangePasswordForm from '../components/ChangePasswordForm';
import '../components/UserSignupForm.css'

const ChangePassword = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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

  return (
    <div className="change-password-page">
      <h2 style={titleStyle}>Şifre Değiştir</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      
      <ChangePasswordForm onSubmit={handlePasswordChange} />
    </div>
  );
};

export default ChangePassword;
