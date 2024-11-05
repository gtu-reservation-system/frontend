import React, { useState } from 'react';

const LoginForm = ({ onSubmit }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailOrPhone || !password) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    setError(''); 
    onSubmit({ emailOrPhone, password }); 
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
