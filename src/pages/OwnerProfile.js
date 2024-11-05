import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerProfile = ({ ownerData, onUpdate }) => {
  const [photos, setPhotos] = useState(ownerData.photos || []);
  const [restaurantName, setRestaurantName] = useState(ownerData.restaurantName);
  const [address, setAddress] = useState(ownerData.address);
  const [phoneNumber, setPhoneNumber] = useState(ownerData.phoneNumber);
  const [email, setEmail] = useState(ownerData.email);
  const [numberOfTables, setNumberOfTables] = useState(ownerData.numberOfTables);
  const [maxCapacity, setMaxCapacity] = useState(ownerData.maxCapacity);
  const [operatingHours, setOperatingHours] = useState(ownerData.operatingHours);
  const [websiteLink, setWebsiteLink] = useState(ownerData.websiteLink || '');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/owners/profile');
        const data = response.data;

        setRestaurantName(data.restaurantName);
        setAddress(data.address);
        setPhoneNumber(data.phoneNumber);
        setEmail(data.email);
        setNumberOfTables(data.numberOfTables);
        setMaxCapacity(data.maxCapacity);
        setOperatingHours(data.operatingHours);
        setWebsiteLink(data.websiteLink || '');
        setPhotos(data.photos || []);
      } catch (error) {
        console.error("Profil bilgileri alınırken bir hata oluştu:", error);
        alert('Profil bilgileri yüklenemedi.');
      }
    };

    fetchOwnerData();
  }, []);

  const handlePhotoChange = (e) => {
    const newPhotos = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('restaurantName', restaurantName);
      formData.append('address', address);
      formData.append('phoneNumber', phoneNumber);
      formData.append('email', email);
      formData.append('numberOfTables', numberOfTables);
      formData.append('maxCapacity', maxCapacity);
      formData.append('operatingHours', operatingHours);
      formData.append('websiteLink', websiteLink);
      photos.forEach((photo) => {
        formData.append('photos', photo);
      });

      const response = await axios.put('http://localhost:8080/api/owners/profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        onUpdate({ 
          restaurantName,
          address,
          phoneNumber,
          email,
          numberOfTables,
          maxCapacity,
          operatingHours,
          websiteLink,
          photos 
        });
      }
    } catch (error) {
      console.error("Profil güncelleme sırasında hata:", error);
      alert('Profil güncellenirken bir hata oluştu.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Lütfen tüm alanları doldurun.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Yeni şifreler eşleşmiyor.');
      return;
    }

    setPasswordError('');

    try {
      const response = await axios.put('http://localhost:8080/api/owners/change-password', {
        currentPassword,
        newPassword
      });

      if (response.status === 200) {
        setPasswordMessage('Şifreniz başarıyla değiştirildi.');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      console.error("Şifre değişikliği sırasında hata:", error);
      setPasswordError('Şifre değiştirilemedi. Lütfen mevcut şifrenizi kontrol edin.');
    }
  };

  return (
    <div className="owner-profile">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Restoran adı:</label>
          <input 
            type="text" 
            value={restaurantName} 
            onChange={(e) => setRestaurantName(e.target.value)} 
          />
        </div>
        <div>
          <label>Restoran adresi:</label>
          <input 
            type="text" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
          />
        </div>
        <div>
          <label>Telefon numarası:</label>
          <input 
            type="tel" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
          />
        </div>
        <div>
          <label>E-posta:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div>
          <label>Masa sayısı:</label>
          <input 
            type="number" 
            value={numberOfTables} 
            onChange={(e) => setNumberOfTables(e.target.value)} 
          />
        </div>
        <div>
          <label>Maksimum kapasite:</label>
          <input 
            type="number" 
            value={maxCapacity} 
            onChange={(e) => setMaxCapacity(e.target.value)} 
          />
        </div>
        <div>
          <label>Çalışma saatleri:</label>
          <input 
            type="text" 
            value={operatingHours} 
            onChange={(e) => setOperatingHours(e.target.value)} 
            placeholder="Örnek: 09.00 - 22.00"
          />
        </div>
        <div>
          <label>Website linki:</label>
          <input 
            type="url" 
            value={websiteLink} 
            onChange={(e) => setWebsiteLink(e.target.value)} 
          />
        </div>
        <button type="submit">Güncelle</button>
      </form>

      <h3>Yüklenen fotoğraflar:</h3>
      <div className="photo-gallery">
        <h3>Logo:</h3>
        {ownerData.logo ? (
          <img src={URL.createObjectURL(ownerData.logo)} alt="Restaurant Logo" />
        ) : (
          <p>Logo yüklenmemiş.</p>
        )}

        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <div key={index} className="photo-item">
              <img src={URL.createObjectURL(photo)} alt={`Restaurant Photo ${index + 1}`} />
              <button onClick={() => handleRemovePhoto(index)}>Sil</button>
            </div>
          ))
        ) : (
          <p>Fotoğraf yüklenmemiş.</p>
        )}
      </div>

      <h3>Fotoğraf yükle:</h3>
      <input type="file" multiple accept="image/*" onChange={handlePhotoChange} />

      <h3>Şifre Değiştir</h3>
      {passwordError && <p className="error-message">{passwordError}</p>}
      {passwordMessage && <p className="success-message">{passwordMessage}</p>}
      <form onSubmit={handlePasswordChange}>
        <div>
          <label>Mevcut Şifre:</label>
          <input 
            type="password" 
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)} 
          />
        </div>
        <div>
          <label>Yeni Şifre:</label>
          <input 
            type="password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
          />
        </div>
        <div>
          <label>Yeni Şifreyi Onayla:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        <button type="submit">Şifreyi Değiştir</button>
      </form>
    </div>
  );
};

export default OwnerProfile;
