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
        const { id, role } = response.data; 

        localStorage.setItem('userId', id);
        localStorage.setItem('role', role); 

        if (role === 'user') {
          navigate('/userProfile');
        } else {
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


