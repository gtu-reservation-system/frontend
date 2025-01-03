import React, { useState } from 'react';
import './LoginForm.css'

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{5,10}$/;

    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      setError('Geçerli bir e-posta veya telefon numarası girin.');
      return false;
    }

    if (password.length < 8 || password.length > 12) {
      setError('Şifre 8 ile 12 karakter arasında olmalıdır.');
      return false;
    }

    setError(''); 
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <p className="error-message">{error}</p>} 

      <div className="input-group">
        <label htmlFor="email">E-posta</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Şifre</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit">Giriş Yap</button>

      <div className="forgot-password">
        <a href="/forgot-password">Şifremi unuttum?</a>
      </div>
    </form>
  );
};

export default LoginForm;
