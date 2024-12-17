import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import OwnerSignupForm from '../components/OwnerSignupForm';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const OwnerSignup = () => {
  const navigate = useNavigate();

  const handleOwnerSignup = async (formData) => {
    try {
      const formDataToSend = new FormData();
  
      const restaurantData = {
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        operatingHours: formData.operatingHours,
        websiteLink: formData.websiteLink,
        additionalCondition:
        formData.acceptConditions === 'yes' ? formData.additionalCondition : '',
        birthdayParty: formData.specialDays.includes('doğum günü'),
        anniversary: formData.specialDays.includes('yıldönümü'),
        jobMeeting: formData.specialDays.includes('iş yemeği'),
        proposal: formData.specialDays.includes('evlilik teklifi'),
        tags: formData.tags.split(',').map((tag) => tag.trim()),
      };
  
      const tables = [];
      let tableIndex = 1;
      ['twoPersonTables', 'fourPersonTables', 'sixPersonTables'].forEach((type, index) => {
        const capacity = [2, 4, 6][index];
        for (let i = 0; i < parseInt(formData[type]); i++) {
          tables.push({
            name: `Table ${tableIndex++}`,
            available: true,
            capacity: capacity,
          });
        }
      });
      restaurantData.tables = tables;
  
      formDataToSend.append('restaurant', JSON.stringify(restaurantData));
  
      if (formData.logo) {
        formDataToSend.append('logoPhoto', formData.logo);
      }
  
      formData.photos.forEach((photo) => {
        formDataToSend.append('photos', photo);
      });

      const response = await axios.post(`${API_BASE_URL}/api/restaurants`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
  
      if (response.status === 200) {
        sessionStorage.setItem('ownerId', response.data.id);
        sessionStorage.setItem('role', response.data.role);
  
        alert('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz.');
        setTimeout(() => navigate('/login'), 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('Bu e-posta ile bir hesap zaten var. Lütfen giriş yapın.');
      } else {
        console.error('Owner signup failed:', error);
        alert('Kaydolma işlemi başarısız! Lütfen bilgilerinizi kontrol edin.');
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
    padding: '20px',
  };

  return (
    <div>
      <h2 style={titleStyle}>Restoran Kaydı</h2>
      <OwnerSignupForm onSubmit={handleOwnerSignup} />
    </div>
  );
};

export default OwnerSignup;