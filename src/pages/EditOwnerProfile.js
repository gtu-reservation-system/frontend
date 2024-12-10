import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditOwnerProfileForm from '../components/EditOwnerProfileForm';
import { useNavigate } from 'react-router-dom';

const EditOwnerProfile = () => {
  const [ownerData, setOwnerData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const id = localStorage.getItem('ownerId'); 

  useEffect(() => {
    if (!id) {
      setError('Restoran sayfasına giriş yapılmamış!');
      return;
    }

    const fetchOwnerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/restaurants/${id}`);
        setOwnerData(response.data);
      } catch (error) {
        console.error("Profil verileri alınırken hata oluştu:", error);
        setError('Profil verileri yüklenemedi');
      }
    };

    fetchOwnerData();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      const formData = new FormData();

      formData.append('restaurantName', updatedData.restaurantName);
      formData.append('address', updatedData.address);
      formData.append('phoneNumber', updatedData.phoneNumber);
      formData.append('email', updatedData.email);
      formData.append('operatingHours', updatedData.operatingHours);
      formData.append('websiteLink', updatedData.websiteLink);

      const tables = [];

      for (let i = 0; i < parseInt(updatedData.twoPersonTables); i++) {
        tables.push({
          name: `Table ${i + 1}`,
          available: true,
          capacity: 2,
          restaurant_id: 0,
        });
      }

      for (let i = 0; i < parseInt(updatedData.fourPersonTables); i++) {
        tables.push({
          name: `Table ${i + 1}`,
          available: true,
          capacity: 4,
          restaurant_id: 0,
        });
      }

      for (let i = 0; i < parseInt(updatedData.sixPersonTables); i++) {
        tables.push({
          name: `Table ${i + 1}`,
          available: true,
          capacity: 6,
          restaurant_id: 0,
        });
      }

      formData.append('tables', JSON.stringify(tables));

      updatedData.photos.forEach((photo, index) => {
        formData.append(`photos[${index}]`, photo);
      });
      formData.append('logo', updatedData.logo);

      formData.append(
        'additionalCondition',
        updatedData.acceptConditions === 'yes' ? updatedData.additionalCondition : ''
      );
      formData.append('specialDays', JSON.stringify(updatedData.specialDays));
      
      const tagsArray = updatedData.tags.split(',').map(tag => tag.trim());
      formData.append('tags', JSON.stringify(tagsArray));

      const response = await axios.put(`http://localhost:8080/api/restaurants/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        alert('Profil başarıyla güncellendi!');
        navigate('/ownerProfile');  
      }
    } catch (error) {
      console.error("Profil güncellenirken hata oluştu:", error);
      setError('Profil güncellenirken hata oluştu.');
    }
  };

  const handleViewProfile = () => {
    navigate('/ownerProfile');
  };

  return (
    <div className="edit-profile-page">
      <h1>Profili Düzenle</h1>
      {error && <p className="error-message">{error}</p>}
      <EditOwnerProfileForm
        ownerData={ownerData}  
        onSubmit={handleSubmit} 
        error={error}
      />
      <button onClick={handleViewProfile} className="view-profile-button">
        Profili Görüntüle
      </button>
    </div>
  );
};

export default EditOwnerProfile;
