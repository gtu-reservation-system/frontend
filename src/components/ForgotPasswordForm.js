// ForgotPasswordForm.js
import React, { useState } from 'react';

const ForgotPasswordForm = ({ onSubmit }) => {
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
    onSubmit({ email });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Şifremi Unuttum</h2>
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
  );
};

export default ForgotPasswordForm;