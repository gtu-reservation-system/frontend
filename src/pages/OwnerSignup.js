import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OwnerSignupForm from '../components/OwnerSignupForm';

const OwnerSignup = () => {
  const navigate = useNavigate();

  const handleOwnerSignup = async (formData) => {  
    try {
      const formDataToSend = new FormData();

      formDataToSend.append('name', formData.restaurantName);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('twoPersonTables', formData.twoPersonTables);
      formDataToSend.append('fourPersonTables', formData.fourPersonTables);
      formDataToSend.append('sixPersonTables', formData.sixPersonTables);
      formDataToSend.append('operatingHours', formData.operatingHours);
      formDataToSend.append('websiteLink', formData.websiteLink);

      formData.photos.forEach((photo, index) => {
        formDataToSend.append(`photos[${index}]`, photo);
      });
      formDataToSend.append('logo', formData.logo);

      const response = await axios.post('http://localhost:8080/api/users', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        localStorage.setItem('ownerId', response.data.id);
        localStorage.setItem('role', response.data.role); 
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Bu e-posta ile bir hesap zaten var. Lütfen giriş yapın.");
      } else {
        console.error("Owner signup failed:", error);
        alert("Kaydolma işlemi başarısız! Lütfen bilgilerinizi kontrol edin.");
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
    <div >
    <h2 style={titleStyle}>Restoran Kaydı</h2>
    <OwnerSignupForm onSubmit={handleOwnerSignup} />
    </div>
  );
};

export default OwnerSignup;
