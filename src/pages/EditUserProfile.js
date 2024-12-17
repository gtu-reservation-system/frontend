import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfileForm from '../components/EditUserProfileForm'; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const EditUserProfile = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [id, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem('userId');
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
          const response = await axios.get(`${API_BASE_URL}/api/users/${id}`);
          const data = response.data;

          setName(data.name);
          setPhoneNumber(data.phoneNumber);
          setEmail(data.email);
          setPassword(data.password);
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
      const response = await axios.put(`${API_BASE_URL}/api/users/${id}`, {
        name, phoneNumber, password, email
      });
  
      if (response.status === 200) {
        navigate('/userProfile');
      }
    } catch (error) {
      console.error('Profil güncellenirken bir hata oluştu:', error);
      setError('Profil güncellenirken bir hata oluştu.');
    }
  };

  const handleBackToProfile = () => {
    navigate('/userProfile');
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: '20px',
    fontFamily: "'Be Vietnam Pro', 'sans-serif'",
    padding: '20px'
  };

  return (
    <div className="edit-user-profile">
      <h2 style ={titleStyle}>Profilimi Düzenle</h2>
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

