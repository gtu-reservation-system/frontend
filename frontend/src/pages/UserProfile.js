import React, { useState } from 'react';

const UserProfile = ({ userData }) => {
  const [fullName, setFullName] = useState(userData.fullName);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [email, setEmail] = useState(userData.email);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!fullName || !phoneNumber || !email) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    setError('');

    console.log('Updated User Data:', { fullName, phoneNumber, email });
    
    setMessage('Profil bilgileri başarıyla güncellendi.');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (!newPassword || newPassword !== confirmPassword) {
      setError('Şifreler eşleşmiyor veya boş.');
      return;
    }

    setError('');

    console.log('New Password:', newPassword);
    
    setMessage('Şifreniz başarıyla değiştirildi. Bilgilendirme e-postası gönderildi.');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="user-profile">
      <h2>Profilim</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      
      <form onSubmit={handleUpdate}>
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

      <h3>Şifre Değiştir</h3>
      <form onSubmit={handlePasswordChange}>
        <div className="input-group">
          <label htmlFor="newPassword">Yeni Şifre</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="confirmPassword">Yeni Şifreyi Onayla</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit">Şifreyi Değiştir</button>
      </form>
    </div>
  );
};

export default UserProfile;

