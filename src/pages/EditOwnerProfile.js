import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProfileForm from '../components/EditOwnerProfileForm';
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
      formData.append('numberOfTables', updatedData.numberOfTables);
      formData.append('maxCapacity', updatedData.maxCapacity);
      formData.append('operatingHours', updatedData.operatingHours);
      formData.append('additionalCondition', updatedData.additionalCondition);
      formData.append('specialDays', updatedData.specialDays);
      formData.append('websiteLink', updatedData.websiteLink);

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
      <EditProfileForm
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


