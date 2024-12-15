import React, { useState } from 'react';

const ForgotPasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Lütfen e-posta adresinizi girin.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Geçerli bir e-posta adresi girin.');
      return;
    }
    setError('');
    onSubmit(email); 
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <div>
        <label htmlFor="email">E-posta adresiniz</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresinizi girin"
        />
      </div>
      <button type="submit">Şifre sıfırlama talebi</button>
    </form>
  );
};

export default ForgotPasswordForm;
