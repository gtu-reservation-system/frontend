import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserSignupForm from '../components/UserSignupForm';

const UserSignup = () => {
  const navigate = useNavigate(); 

  const handleUserSignup = () => {
    navigate('/');
  };

  return <UserSignupForm onSubmit={handleUserSignup} />;
};

export default UserSignup;

