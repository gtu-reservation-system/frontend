import React from 'react';

const EditUserProfileForm = ({ fullName, phoneNumber, email, setFullName, setPhoneNumber, setEmail, error, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
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

      <button type="submit">Bilgileri Güncelle</button>
    </form>
  );
};

export default EditUserProfileForm;
