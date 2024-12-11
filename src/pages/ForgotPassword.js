import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Lütfen e-posta adresinizi girin.');
      return;
    }

    if (!isEmailValid(email)) {
      setError('Geçerli bir e-posta adresi girin.');
      return;
    }

    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/forgot-password`, {
        email
      });

      if (response.status === 200) {
        setMessage('E-posta gönderildi!');
      }
    } catch (error) {
      console.error("Password reset request failed:", error);
      setError('Şifre sıfırlama talebi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
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
    <div className="forgot-password">
      <h2 style = {titleStyle}>Şifremi Unuttum</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <div className="input-group">
          <label htmlFor="email">E-posta adresiniz</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit">Şifre sıfırlama talebi</button>
      </form>
    </div>
  );
};

export default ForgotPassword;


