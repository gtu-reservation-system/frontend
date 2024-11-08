import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', formData);

      if (response.status === 200) {
        const { userId, role } = response.data; 

        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role); 

        if (role === 'owner') {
          navigate('/ownerProfile');
        } else {
          navigate('/userProfile');
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;


