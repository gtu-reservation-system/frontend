import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginForm from '../components/LoginForm';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, formData);

      if (response.status === 200) {
        const { id, role } = response.data; 

        sessionStorage.setItem('role', role); 

        if (role === 'user') {
          sessionStorage.setItem('userId', id);
          navigate('/userProfile');
        } else {
          sessionStorage.setItem('ownerId', id);
          navigate('/ownerProfile');
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
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
    <div className="main-content">
      <div className="login-form-container">
        <h2 style={titleStyle}>Giriş Yap</h2>
        <LoginForm onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;


