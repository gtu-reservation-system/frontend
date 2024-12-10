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
      formDataToSend.append('operatingHours', formData.operatingHours);
      formDataToSend.append('websiteLink', formData.websiteLink);

      const tables = [];

      for (let i = 0; i < parseInt(formData.twoPersonTables); i++) {
        tables.push({
          name: `Table ${i + 1}`,
          available: true,
          capacity: 2,
          restaurant_id: 0,
        });
      }

      for (let i = 0; i < parseInt(formData.fourPersonTables); i++) {
        tables.push({
          name: `Table ${i + 1}`,
          available: true,
          capacity: 4,
          restaurant_id: 0,
        });
      }

      for (let i = 0; i < parseInt(formData.sixPersonTables); i++) {
        tables.push({
          name: `Table ${i + 1}`,
          available: true,
          capacity: 6,
          restaurant_id: 0,
        });
      }

      formDataToSend.append('tables', JSON.stringify(tables));

      formData.photos.forEach((photo, index) => {
        formDataToSend.append(`photos[${index}]`, photo);
      });
      formDataToSend.append('logo', formData.logo);

      formDataToSend.append(
        'additionalCondition',
        formData.acceptConditions === 'yes' ? formData.additionalCondition : ''
      );

      formDataToSend.append('specialDays', JSON.stringify(formData.specialDays));
      
      const tagsArray = formData.tags.split(',').map(tag => tag.trim());
      formDataToSend.append('tags', JSON.stringify(tagsArray));

      const response = await axios.post('http://localhost:8080/api/restaurants', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {

        const restaurantId = response.data.id;

        tables.forEach(table => {
          table.restaurant_id = restaurantId; 
        });

        localStorage.setItem('ownerId', response.data.id);
        localStorage.setItem('role', response.data.role);
        navigate('/login');
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
