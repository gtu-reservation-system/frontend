import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/profile');
        const data = response.data;

        setFullName(data.fullName);
        setPhoneNumber(data.phoneNumber);
        setEmail(data.email);
      } catch (error) {
        console.error("Kullanıcı verileri alınırken bir hata oluştu:", error);
        setError('Kullanıcı verileri yüklenemedi.');
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!fullName || !phoneNumber || !email) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    setError('');

    try {
      const response = await axios.put('http://localhost:8080/api/users/profile', {
        fullName,
        phoneNumber,
        email
      });

      if (response.status === 200) {
        setMessage('Profil bilgileri başarıyla güncellendi.');
      }
    } catch (error) {
      console.error("Profil güncellenirken bir hata oluştu:", error);
      setError('Profil güncellenirken bir hata oluştu.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!newPassword || newPassword !== confirmPassword) {
      setError('Şifreler eşleşmiyor veya boş.');
      return;
    }

    setError('');

    try {
      const response = await axios.put('http://localhost:8080/api/users/change-password', {
        newPassword
      });

      if (response.status === 200) {
        setMessage('Şifreniz başarıyla değiştirildi. Bilgilendirme e-postası gönderildi.');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error("Şifre değişikliği sırasında hata:", error);
      setError('Şifre değiştirilemedi. Lütfen mevcut şifrenizi kontrol edin.');
    }
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
