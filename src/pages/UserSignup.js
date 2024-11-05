import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserSignupForm from '../components/UserSignupForm';

const UserSignup = () => {
  const navigate = useNavigate(); 

  const handleUserSignup = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/signup', formData);

      if (response.status === 201) { 
        navigate('/');
      }
    } catch (error) {
      console.error("User signup failed:", error);
      alert("Kayıt işlemi başarısız! Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return <UserSignupForm onSubmit={handleUserSignup} />;
};

export default UserSignup;

