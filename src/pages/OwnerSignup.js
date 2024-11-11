import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OwnerSignupForm from '../components/OwnerSignupForm';

const OwnerSignup = () => {
  const navigate = useNavigate();

  const handleOwnerSignup = async (formData) => {  
    try {
      const formDataToSend = new FormData();

      formDataToSend.append('restaurantName', formData.restaurantName);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('numberOfTables', formData.numberOfTables);
      formDataToSend.append('maxCapacity', formData.maxCapacity);
      formDataToSend.append('operatingHours', formData.operatingHours);
      formDataToSend.append('websiteLink', formData.websiteLink);

      formData.photos.forEach((photo, index) => {
        formDataToSend.append(`photos[${index}]`, photo);
      });
      formDataToSend.append('logo', formData.logo);

      const response = await axios.post('http://localhost:8080/api/restaurants', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        localStorage.setItem('ownerId', response.data.id);
        localStorage.setItem('role', 'owner'); 
        navigate('/');
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

  return <OwnerSignupForm onSubmit={handleOwnerSignup} />;
};

export default OwnerSignup;
