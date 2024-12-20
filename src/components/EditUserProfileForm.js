import React, { useState } from 'react';

const EditUserProfileForm = ({ name, phoneNumber, email, setName, setPhoneNumber, setEmail, onSubmit }) => {
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
    <form onSubmit={handleSubmit}>
      {formError && <p className="error-message">{formError}</p>}
      
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
  );
};

export default EditUserProfileForm;
