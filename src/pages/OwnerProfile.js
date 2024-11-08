import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OwnerProfile = () => {
  const [ownerData, setOwnerData] = useState({});
  const [error, setError] = useState(null);
  const [newPhotos, setNewPhotos] = useState([]);
  const [logo, setLogo] = useState(null);
  const id = localStorage.getItem('ownerId'); 
  const navigate = useNavigate(); 

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

  const handleEditProfile = () => {
    navigate('/edit-ownerProfile');
  };

  const handlePhotoChange = (e) => {
    setNewPhotos([...e.target.files]);
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleUpdatePhotos = async () => {
    const formData = new FormData();
    newPhotos.forEach((photo, index) => {
      formData.append(`photos[${index}]`, photo);
    });
    if (logo) {
      formData.append('logo', logo);
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/restaurants/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setOwnerData(response.data); 
      setNewPhotos([]);
      setLogo(null);
    } catch (error) {
      console.error("Error updating photos:", error);
      setError('Error updating photos');
    }
  };

  return (
    <div className="owner-profile">
      <h1>Owner Profile</h1>
      {error && <p className="error-message">{error}</p>}
      
      <div>
        <h2>{ownerData.restaurantName}</h2>
        <p><strong>Address:</strong> {ownerData.address}</p>
        <p><strong>Phone Number:</strong> {ownerData.phoneNumber}</p>
        <p><strong>Email:</strong> {ownerData.email}</p>
        <p><strong>Number of Tables:</strong> {ownerData.numberOfTables}</p>
        <p><strong>Max Capacity:</strong> {ownerData.maxCapacity}</p>
        <p><strong>Operating Hours:</strong> {ownerData.operatingHours}</p>
        <p><strong>Website Link:</strong> <a href={ownerData.websiteLink} target="_blank" rel="noopener noreferrer">{ownerData.websiteLink}</a></p>
        
        {ownerData.photos && ownerData.photos.length > 0 && (
          <div className="photos">
            <h3>Restaurant Photos</h3>
            <div className="photo-gallery">
              {ownerData.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Restaurant photo ${index + 1}`} className="restaurant-photo" />
              ))}
            </div>
          </div>
        )}

        <div>
          <label>Upload New Photos:</label>
          <input type="file" multiple accept="image/*" onChange={handlePhotoChange} />
        </div>
        <div>
          <label>Upload Logo:</label>
          <input type="file" accept="image/*" onChange={handleLogoChange} />
        </div>

        <button onClick={handleUpdatePhotos}>Update Photos</button>

        <button onClick={handleEditProfile}>Edit Profile</button> 
      </div>
    </div>
  );
};

export default OwnerProfile;

