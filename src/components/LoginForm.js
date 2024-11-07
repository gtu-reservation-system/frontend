import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!emailOrPhone || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{5,10}$/;
    
    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      setError('Geçerli bir e-posta veya telefon numarası girin.');
      return false;
    }

    if (password.length < 6 || password.length > 12) {
      setError('Şifre 6 ile 12 karakter arasında olmalıdır.');
      return false;
    }

    setError(''); 
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({ emailOrPhone, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <p className="error-message">{error}</p>} 

      <div className="input-group">
        <label htmlFor="emailOrPhone">E-posta veya telefon numarası</label>
        <input
          type="text"
          id="emailOrPhone"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
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
