import React from 'react';
import { useNavigate } from 'react-router-dom';
import OwnerSignupForm from '../components/OwnerSignupForm';

const OwnerSignup = () => {
  const navigate = useNavigate();

  const handleOwnerSignup = () => {  
    navigate('/'); 
  };

  return <OwnerSignupForm onSubmit={handleOwnerSignup} />;
};

export default OwnerSignup;
