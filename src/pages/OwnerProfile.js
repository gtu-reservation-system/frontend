import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const OwnerProfile = () => {
  const [ownerData, setOwnerData] = useState({});
  const [error, setError] = useState(null);
  const id = localStorage.getItem('ownerId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setError('Restoran sayfasına giriş yapılmamış!');
      return;
    }

    const fetchOwnerData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/${id}`);
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

  const handleReservationsRedirect = () => {
    navigate('/owner-reservations');
  };

  const handlePasswordChange = () => {
    navigate('/owner-change-password');
  };

  const tableCounts = ownerData.tables?.reduce(
    (counts, table) => {
      counts[table.capacity] = (counts[table.capacity] || 0) + 1;
      return counts;
    },
    { 2: 0, 4: 0, 6: 0 }
  );

  const specialDays = [
    ownerData.birthdayParty && 'Doğum Günü',
    ownerData.anniversary && 'Yıldönümü',
    ownerData.jobMeeting && 'İş Yemeği',
    ownerData.proposal && 'Evlilik Teklifi',
  ].filter(Boolean);

  return (
    <div className="owner-profile">
      <h1>Restoran Profili</h1>
      {error && <p className="error-message">{error}</p>}

      <div>
        <h2>{ownerData.name}</h2>
        <p><strong>Adres:</strong> {ownerData.address}</p>
        <p><strong>Telefon Numarası:</strong> {ownerData.phoneNumber}</p>
        <p><strong>E-posta:</strong> {ownerData.email}</p>
        <p><strong>2 Kişilik Masa Sayısı:</strong> {tableCounts?.[2]}</p>
        <p><strong>4 Kişilik Masa Sayısı:</strong> {tableCounts?.[4]}</p>
        <p><strong>6 Kişilik Masa Sayısı:</strong> {tableCounts?.[6]}</p>
        <p><strong>Çalışma Saatleri:</strong> {ownerData.operatingHours}</p>
        <p><strong>Şartlar:</strong> {ownerData.additionalCondition || 'Şartlar belirtilmemiş'}</p>
        <p><strong>Özel Günler:</strong> {specialDays.length > 0 ? specialDays.join(', ') : 'Özel günler belirtilmemiş'}</p>
        <p><strong>Etiketler:</strong> {ownerData.tags?.join(', ') || 'Etiketler bulunmamaktadır'}</p>
        <p>
          <strong>Web Sitesi Bağlantısı:</strong>{' '}
          {ownerData.websiteLink ? (
            <a href={ownerData.websiteLink} target="_blank" rel="noopener noreferrer">{ownerData.websiteLink}</a>
          ) : (
            'Web sitesi bulunmamaktadır'
          )}
        </p>

        <div>
          <p><strong>Logo:</strong></p>
          {ownerData.logo ? (
            <img src={ownerData.logo} alt="Restoran Logo" className="restaurant-logo" />
          ) : (
            <p>Logo bulunmamaktadır</p>
          )}
        </div>

        <div>
          <p><strong>Fotoğraflar:</strong></p>
          {ownerData.photos && ownerData.photos.length > 0 ? (
            <div className="photo-gallery">
              {ownerData.photos.map((photo, index) => (
                <img key={index} src={photo} alt={`Restaurant fotoğrafı ${index + 1}`} className="restaurant-photo" />
              ))}
            </div>
          ) : (
            <p>Fotoğraflar bulunmamaktadır</p>
          )}
        </div>

        <button onClick={handleEditProfile}>Profili Düzenle</button>
        <button onClick={handleReservationsRedirect}>Rezervasyonlar</button>
        <button onClick={handlePasswordChange}>Şifre Değiştir</button>
      </div>
    </div>
  );
};

export default OwnerProfile;
