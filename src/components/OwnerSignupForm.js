import React, { useState } from 'react';
import './LoginForm.css'

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

  const isPasswordStrong = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isCorrectLength = password.length >= 8 && password.length <= 12;
  
    return hasUpperCase && hasLowerCase && hasNumber && isCorrectLength;
  };
  

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

    if (restaurantName.length > 30) {
      alert("İsim 30 karakterden uzun olamaz.");
      return;
    }
 
    const phoneRegex = /^[0-9]{5,10}$/;
    if (!phoneRegex.test(phoneNumber)) {
       setError('Geçerli bir telefon numarası girin.');
       return;
    }
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
       setError('Geçerli bir e-posta adresi girin.');
       return;
    }
 
    if (!isPasswordStrong(password)) {
       setError('Şifre 8 ile 12 karakter arasında olmalıdır. Bir büyük harf, bir küçük harf ve bir sayı içermelidir.');
       setPassword(''); 
       return;
    }
 
    const hoursRegex = /^\s*\d{1,2}\.\d{2}\s*-\s*\d{1,2}\.\d{2}\s*$/;
    if (!hoursRegex.test(operatingHours)) {
       setError('Geçerli bir çalışma saatleri formatı girin (ör. 09.00 - 22.00).');
       return;
    }
 
    if (parseInt(numberOfTables) <= 0 || parseInt(maxCapacity) <= 0) {
       setError('Masa sayısı ve maksimum kapasite pozitif bir sayı olmalıdır.');
       return;
    }
 
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (websiteLink && !urlRegex.test(websiteLink)) {
       setError('Geçerli bir website linki girin.');
       return;
    }
 
    setError('');
    onSubmit({ restaurantName, phoneNumber, email, password, address, photos, logo, numberOfTables, maxCapacity, operatingHours, websiteLink });
 };
 

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      {error && <p className="error-message">{error}</p>}

      <div className="input-group">
        <label htmlFor="restaurantName">Restoran adı <span style={{ color: 'red' }}>*</span></label>
        <input
          type="text"
          id="restaurantName"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="address">Restoran adresi <span style={{ color: 'red' }}>*</span></label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="phoneNumber">Telefon numarası <span style={{ color: 'red' }}>*</span></label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">E-posta <span style={{ color: 'red' }}>*</span></label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Şifre <span style={{ color: 'red' }}>*</span></label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="numberOfTables">Masa sayısı <span style={{ color: 'red' }}>*</span></label>
        <input
          type="number"
          id="numberOfTables"
          value={numberOfTables}
          min="1"
          onChange={(e) => setNumberOfTables(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="maxCapacity">Maksimum kapasite <span style={{ color: 'red' }}>*</span></label>
        <input
          type="number"
          id="maxCapacity"
          value={maxCapacity}
          min="1"
          onChange={(e) => setMaxCapacity(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="operatingHours">Çalışma saatleri <span style={{ color: 'red' }}>*</span></label>
        <input
          type="text"
          id="operatingHours"
          value={operatingHours}
          onChange={(e) => setOperatingHours(e.target.value)}
          placeholder="Örnek: 09.00 - 22.00"
        />
      </div>

      <div className="input-group">
        <label htmlFor="photos">Restoran fotoğrafları (en az 3 adet) <span style={{ color: 'red' }}>*</span></label>
        <input
          type="file"
          id="photos"
          accept="image/*"
          multiple
          onChange={handlePhotosChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="logo">Restoran logosu <span style={{ color: 'red' }}>*</span></label>
        <input
          type="file"
          id="logo"
          accept="image/*"
          onChange={handleLogoChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="websiteLink">Website linki</label>
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

