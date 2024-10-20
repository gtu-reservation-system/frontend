import React, { useState } from 'react';

const OwnerSignupForm = ({ onSubmit }) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [numberOfTables, setNumberOfTables] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [photos, setPhotos] = useState([]);
  const [logo, setLogo] = useState(null);
  const [websiteLink, setWebsiteLink] = useState(''); 
  const [error, setError] = useState('');

  const handlePhotosChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length < 3) {
      setError('Lütfen en az 3 fotoğraf yükleyin.');
      return;
    }
    setPhotos(selectedFiles);
    setError('');
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!restaurantName || !phoneNumber || !email || !password || !address || photos.length < 3 || !logo || !numberOfTables || !maxCapacity || !operatingHours) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    setError('');
    onSubmit({ restaurantName, phoneNumber, email, password, address, photos, logo, numberOfTables, maxCapacity, operatingHours, websiteLink });
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      {error && <p className="error-message">{error}</p>}

      <div className="input-group">
        <label htmlFor="restaurantName">Restoran adı</label>
        <input
          type="text"
          id="restaurantName"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="address">Restoran adresi</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="phoneNumber">Telefon numarası</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">E-posta</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Şifre</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="numberOfTables">Masa sayısı</label>
        <input
          type="number"
          id="numberOfTables"
          value={numberOfTables}
          onChange={(e) => setNumberOfTables(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="maxCapacity">Maksimum kapasite</label>
        <input
          type="number"
          id="maxCapacity"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="operatingHours">Çalışma saatleri</label>
        <input
          type="text"
          id="operatingHours"
          value={operatingHours}
          onChange={(e) => setOperatingHours(e.target.value)}
          placeholder="Örnek: 09.00 - 22.00"
        />
      </div>

      <div className="input-group">
        <label htmlFor="photos">Restoran fotoğrafları (en az 3 adet)</label>
        <input
          type="file"
          id="photos"
          accept="image/*"
          multiple
          onChange={handlePhotosChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="logo">Restoran logosu</label>
        <input
          type="file"
          id="logo"
          accept="image/*"
          onChange={handleLogoChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="websiteLink">Website linki (opsiyonel)</label>
        <input
          type="url"
          id="websiteLink"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
        />
      </div>

      <button type="submit">Kayıt Ol</button>
    </form>
  );
};

export default OwnerSignupForm;
