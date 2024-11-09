import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfileForm from '../components/EditUserProfileForm'; 

const EditUserProfile = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [id, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError('Kullanıcı giriş yapmamış!');
      return;
    }
  }, []);

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/users/${id}`);
          const data = response.data;

          setName(data.name);
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !phoneNumber || !email) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    setError('');

    try {
      const response = await axios.put(`http://localhost:8080/api/users/${id}`, {
        name,
        phoneNumber,
        email
      });

      if (response.status === 200) {
        navigate('/userProfile');
      }
    } catch (error) {
      console.error("Profil güncellenirken bir hata oluştu:", error);
      setError('Profil güncellenirken bir hata oluştu.');
    }
  };

  const handleBackToProfile = () => {
    navigate('/userProfile');
  };

  return (
    <div className="edit-user-profile">
      <h2>Profilimi Düzenle</h2>
      <UserProfileForm
        name={name}
        phoneNumber={phoneNumber}
        email={email}
        setName={setName}
        setPhoneNumber={setPhoneNumber}
        setEmail={setEmail}
        error={error}
        onSubmit={handleUpdate}
      />
      <button onClick={handleBackToProfile} className="back-button">
        Profili Görüntüle
      </button>
    </div>
  );
};

export default EditUserProfile;

