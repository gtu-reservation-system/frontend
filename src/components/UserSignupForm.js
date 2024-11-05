import React, { useState } from 'react';

const UserSignupForm = ({ onSubmit }) => {
  const [fullName, setFullName] = useState(''); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !phoneNumber || !email || !password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    setError('');
    onSubmit({ fullName, phoneNumber, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">

      {error && <p className="error-message">{error}</p>}

      <div className="input-group">
        <label htmlFor="fullName">İsim ve soyisim</label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="phoneNumber">Telefon numarası</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">E-posta</label>
        <input
          type="email"
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

      <button type="submit">Kayıt Ol</button>
    </form>
  );
};

export default UserSignupForm;
