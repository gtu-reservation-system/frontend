import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfileForm from '../components/EditUserProfileForm';

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [id, setUserId] = useState(null); 
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
    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/${id}`);
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
  }, [id]);

  const handlePasswordChangeRedirect = () => {
    navigate('/change-password');
  };

  const handleEditProfileRedirect = () => {
    navigate('/edit-user-profile'); 
  };

  return (
    <div className="user-profile">
      <h2>Profilim</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}

      <div className="profile-info">
        <UserProfileForm
          fullName={fullName}
          phoneNumber={phoneNumber}
          email={email}
          setFullName={setFullName}
          setPhoneNumber={setPhoneNumber}
          setEmail={setEmail}
          error={error}
          onSubmit={() => {}}
        />
      </div>

      <button onClick={handleEditProfileRedirect}>Profilimi Düzenle</button>
      <button onClick={handlePasswordChangeRedirect}>Şifre Değiştir</button>
    </div>
  );
};

export default UserProfile;



