import React, { useState } from 'react';

const UserSignupForm = ({ onSubmit }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isPhoneNumberValid = (phone) => {
    const phoneRegex = /^[0-9]{5,15}$/; 
    return phoneRegex.test(phone);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordStrong = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isCorrectLength = password.length >= 8 && password.length <= 12;
  
    return hasUpperCase && hasLowerCase && hasNumber && isCorrectLength;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !phoneNumber || !email || !password) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    if (fullName.length > 30) {
      alert("İsim 30 karakterden uzun olamaz.");
      return;
    }

    if (!isPhoneNumberValid(phoneNumber)) {
      setError('Geçerli bir telefon numarası girin (5-15 rakam).');
      return;
    }

    if (!isEmailValid(email)) {
      setError('Geçerli bir e-posta adresi girin.');
      return;
    }

    if (!isPasswordStrong(password)) {
      setError('Şifre 8 ile 12 karakter arasında olmalıdır. Bir büyük harf, bir küçük harf ve bir rakam içermelidir.');
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
