import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError('User not logged in!');
      return;
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
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
    }
  }, [userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!fullName || !phoneNumber || !email) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    setError('');

    try {
      const response = await axios.put(`http://localhost:8080/api/users/${userId}`, {
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

  const handlePasswordChangeRedirect = () => {
    navigate('/change-password');
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

      <button onClick={handlePasswordChangeRedirect}>Şifre Değiştir</button>
    </div>
  );
};

export default UserProfile;


