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
      setError('Owner not logged in!');
      return;
    }

    const fetchOwnerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/restaurants/${id}`);
        setOwnerData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError('Error loading profile data');
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
      formData.append('websiteLink', updatedData.websiteLink);

      const response = await axios.put(`http://localhost:8080/api/restaurants${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate('/owner-profile');  
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError('Error updating profile.');
    }
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
    </div>
  );
};

export default EditOwnerProfile;
