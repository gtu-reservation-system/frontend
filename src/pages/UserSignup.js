import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserSignupForm from '../components/UserSignupForm';
import './UserSignup.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const UserSignup = () => {
  const navigate = useNavigate();

  const handleUserSignup = async (formData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users`, formData);

      if (response.status === 200) {
        alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert('Bu e-posta veya telefon numarası ile bir hesap zaten var. Lütfen giriş yapın.');
      } else {
        console.error('Kayıt işlemi başarısız:', error);
        alert('Kayıt işlemi başarısız! Lütfen bilgilerinizi kontrol edin.');
      }
    }
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
    <div className="signup-page">
      <h2 style={titleStyle}>Kullanıcı Kaydı</h2>
        <UserSignupForm onSubmit={handleUserSignup} />
    </div>
  );
};

export default UserSignup;



