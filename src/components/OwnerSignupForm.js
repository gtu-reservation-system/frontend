import React, { useState } from 'react';
import './LoginForm.css';

const OwnerSignupForm = ({ onSubmit }) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [twoPersonTables, setTwoPersonTables] = useState('');
  const [fourPersonTables, setFourPersonTables] = useState('');
  const [sixPersonTables, setSixPersonTables] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [photos, setPhotos] = useState([]);
  const [logo, setLogo] = useState(null);
  const [websiteLink, setWebsiteLink] = useState('');
  const [acceptConditions, setAcceptConditions] = useState(null);
  const [specialDays, setSpecialDays] = useState([]);
  const [additionalCondition, setAdditionalCondition] = useState('');
  const [tags, setTags] = useState(''); 
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

  const handleSpecialDaysChange = (e) => {
    const value = e.target.value;
    setSpecialDays((prev) =>
      prev.includes(value) ? prev.filter((day) => day !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !restaurantName ||
      !phoneNumber ||
      !email ||
      !password ||
      !address ||
      photos.length < 3 ||
      !logo ||
      !twoPersonTables ||
      !fourPersonTables ||
      !sixPersonTables ||
      !operatingHours ||
      acceptConditions === null
    ) {
      setError('Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    if (restaurantName.length > 50) {
      alert('İsim 50 karakterden uzun olamaz.');
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
      setError(
        'Şifre 8 ile 12 karakter arasında olmalıdır. Bir büyük harf, bir küçük harf ve bir sayı içermelidir.'
      );
      setPassword('');
      return;
    }

    const hoursRegex = /^\s*\d{1,2}\.\d{2}\s*-\s*\d{1,2}\.\d{2}\s*$/;
    if (!hoursRegex.test(operatingHours)) {
      setError('Geçerli bir çalışma saatleri formatı girin (ör. 09.00 - 22.00).');
      return;
    }

    if (
      parseInt(twoPersonTables) <= 0 ||
      parseInt(fourPersonTables) <= 0 ||
      parseInt(sixPersonTables) <= 0
    ) {
      setError('Masa sayısı sıfırdan küçük olamaz.');
      return;
    }

    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (websiteLink && !urlRegex.test(websiteLink)) {
      setError('Geçerli bir website linki girin.');
      return;
    }

    setError('');
    onSubmit({
      restaurantName,
      phoneNumber,
      email,
      password,
      address,
      photos,
      logo,
      twoPersonTables,
      fourPersonTables,
      sixPersonTables,
      operatingHours,
      websiteLink,
      acceptConditions,
      specialDays,
      additionalCondition: acceptConditions === 'yes' ? additionalCondition : '',
      tags,
    });
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
        <label htmlFor="twoPersonTables">2 kişilik masa sayısı <span style={{ color: 'red' }}>*</span></label>
        <input
          type="number"
          id="twoPersonTables"
          value={twoPersonTables}
          min="1"
          onChange={(e) => setTwoPersonTables(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="fourPersonTables">4 kişilik masa sayısı <span style={{ color: 'red' }}>*</span></label>
        <input
          type="number"
          id="fourPersonTables"
          value={fourPersonTables}
          min="1"
          onChange={(e) => setFourPersonTables(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="sixPersonTables">6 kişilik masa sayısı <span style={{ color: 'red' }}>*</span></label>
        <input
          type="number"
          id="sixPersonTables"
          value={sixPersonTables}
          min="1"
          onChange={(e) => setSixPersonTables(e.target.value)}
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
          <label htmlFor="acceptConditions">
            Şartlarınız var mı? <span style={{ color: 'red' }}>*</span>
          </label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="radio"
              name="acceptConditions"
              value="yes"
              checked={acceptConditions === 'yes'}
              onChange={() => setAcceptConditions('yes')}
            />
            Evet
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <input
              type="radio"
              name="acceptConditions"
              value="no"
              checked={acceptConditions === 'no'}
              onChange={() => setAcceptConditions('no')}
            />
            Hayır
          </label>
        </div>
        {acceptConditions === 'yes' && (
          <div>
            <label htmlFor="additionalCondition">Şartlarınızı belirtin:</label>
            <input
              type="text"
              id="additionalCondition"
              value={additionalCondition}
              onChange={(e) => setAdditionalCondition(e.target.value)}
            />
          </div>
        )}
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
        <label htmlFor="specialDays">
          Özel gün rezervasyonları alıyor musunuz?
        </label>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label>
            <input
              type="checkbox"
              value="doğum günü"
              checked={specialDays.includes('doğum günü')}
              onChange={handleSpecialDaysChange}
            />
            Doğum Günü
          </label>
          <label>
            <input
              type="checkbox"
              value="yıldönümü"
              checked={specialDays.includes('yıldönümü')}
              onChange={handleSpecialDaysChange}
            />
            Yıldönümü
          </label>
          <label>
            <input
              type="checkbox"
              value="iş yemeği"
              checked={specialDays.includes('iş yemeği')}
              onChange={handleSpecialDaysChange}
            />
            İş Yemeği
          </label>
          <label>
            <input
              type="checkbox"
              value="evlilik teklifi"
              checked={specialDays.includes('evlilik teklifi')}
              onChange={handleSpecialDaysChange}
            />
            Evlilik Teklifi
          </label>
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="tags">Restoran etiketleri </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Virgülle ayırarak girin (örn. pizza, kebap)"
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
