import React, { useState } from 'react';
import './EditUserProfileForm.css';

const EditUserProfileForm = ({
  name,
  phoneNumber,
  email,
  setName,
  setPhoneNumber, 
  setEmail,
  error,
  onSubmit
}) => {
  const [formError, setFormError] = useState('');

  const isPhoneNumberValid = (phone) => {
    const phoneRegex = /^[0-9]{5,15}$/;
    return phoneRegex.test(phone);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phoneNumber || !email) {
      setFormError('Lütfen tüm alanları doldurun');
      return;
    }
    if (name.length > 30) {
      setFormError('İsim 30 karakterden uzun olamaz.');
      return;
    }
    if (!isPhoneNumberValid(phoneNumber)) {
      setFormError('Geçerli bir telefon numarası girin (5-15 rakam).');
      return;
    }
    if (!isEmailValid(email)) {
      setFormError('Geçerli bir e-posta adresi girin.');
      return;
    }
    setFormError('');
    onSubmit(e);
  };

  return (
    <div className="form-container">
      <div className="login-form">
        {/* Form */}
        <form onSubmit={handleSubmit} className="user-form">
          {(formError || error) && (
            <p className="error-message">{formError || error}</p>
          )}
          
          <div className="input-group">
            <label htmlFor="name">İsim ve soyisim</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          <button type="submit">Bilgileri Güncelle</button>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfileForm;
