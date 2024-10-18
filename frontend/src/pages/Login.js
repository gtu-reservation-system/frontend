import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/'); 
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default LoginPage;

