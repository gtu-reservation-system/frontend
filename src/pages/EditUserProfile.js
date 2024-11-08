import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfileForm from '../components/EditUserProfileForm'; 

const EditUserProfile = () => {
  const [fullName, setFullName] = useState('');
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!fullName || !phoneNumber || !email) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    setError('');

    try {
      const response = await axios.put(`http://localhost:8080/api/users/${id}`, {
        fullName,
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

  return (
    <div className="edit-user-profile">
      <h2>Profilimi Düzenle</h2>
      <UserProfileForm
        fullName={fullName}
        phoneNumber={phoneNumber}
        email={email}
        setFullName={setFullName}
        setPhoneNumber={setPhoneNumber}
        setEmail={setEmail}
        error={error}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default EditUserProfile;
