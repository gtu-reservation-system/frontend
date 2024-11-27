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
      console.error("Fotoğraflar güncellenirken hata oluştu:", error);
      setError('Fotoğraflar güncellenirken hata oluştu');
    }
  };

  const handleReservationsRedirect = () => {
    navigate('/owner-reservations');
  };

  return (
    <div className="owner-profile">
      <h1>Restoran Profili</h1>
      {error && <p className="error-message">{error}</p>}

      <div>
        <h2>{ownerData.restaurantName}</h2>
        <p><strong>Adres:</strong> {ownerData.address}</p>
        <p><strong>Telefon Numarası:</strong> {ownerData.phoneNumber}</p>
        <p><strong>E-posta:</strong> {ownerData.email}</p>
        <p><strong>Masaların Sayısı:</strong> {ownerData.numberOfTables}</p>
        <p><strong>Max Kapasite:</strong> {ownerData.maxCapacity}</p>
        <p><strong>Çalışma Saatleri:</strong> {ownerData.operatingHours}</p>
        <p><strong>Şartlar:</strong> {ownerData.additionalCondition}</p>
        <p><strong>Özel Günler:</strong> {ownerData.specialDays}</p>
        <p><strong>Web Sitesi Bağlantısı:</strong> <a href={ownerData.websiteLink} target="_blank" rel="noopener noreferrer">{ownerData.websiteLink}</a></p>

        {ownerData.photos && ownerData.photos.length > 0 && (
          <div className="photos">
            <h3>Restoran Fotoğrafları</h3>
            <div className="photo-gallery">
              {ownerData.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Restaurant fotoğrafı ${index + 1}`} className="restaurant-photo" />
              ))}
            </div>
          </div>
        )}

        <div>
          <label>Yeni Fotoğraflar Yükle:</label>
          <input type="file" multiple accept="image/*" onChange={handlePhotoChange} />
        </div>
        <div>
          <label>Logo Yükle:</label>
          <input type="file" accept="image/*" onChange={handleLogoChange} />
        </div>

        <button onClick={handleUpdatePhotos}>Fotoğrafları Güncelle</button>
        <button onClick={handleEditProfile}>Profili Düzenle</button>
        <button onClick={handleReservationsRedirect}>Rezervasyonlar</button>
      </div>
    </div>
  );
};

export default OwnerProfile;
