import React, { useState } from 'react';

const EditOwnerProfileForm = ({ name, address, phoneNumber, email, twoPersonTables, fourPersonTables, sixPersonTables, operatingHours,
  websiteLink, acceptConditions, additionalCondition, specialDays, tags, photos, logo, setName, setAddress, setPhoneNumber, setEmail,
  setTwoPersonTables, setFourPersonTables,setSixPersonTables, setOperatingHours, setWebsiteLink, setAcceptConditions, setAdditionalCondition,
  setSpecialDays, setTags, setPhotos, setLogo, onSubmit }) => {
  const [formError, setFormError] = useState('');

  const availableSpecialDays = ['Doğum Günü', 'İş Yemeği', 'Yıldönümü', 'Evlilik Teklifi'];

  const handleSpecialDayChange = (e) => {
    const selectedDay = e.target.value;
    if (e.target.checked) {
      setSpecialDays([...specialDays, selectedDay]);
    } else {
      setSpecialDays(specialDays.filter((day) => day !== selectedDay));
    }
  };


  const isPhoneNumberValid = (phone) => {
    const phoneRegex = /^[0-9]{5,15}$/;
    return phoneRegex.test(phone);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isHoursValid = (operatingHours) => {
    const hoursRegex = /^\s*\d{1,2}\.\d{2}\s*-\s*\d{1,2}\.\d{2}\s*$/;
    return hoursRegex.test(operatingHours);
  };

  const isUrlValid = (websiteLink) => {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlRegex.test(websiteLink);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phoneNumber || !email || !address || !twoPersonTables || !fourPersonTables || !sixPersonTables || !operatingHours 
      || !acceptConditions == null || photos.length < 3|| !logo) {
      setFormError('Lütfen tüm alanları doldurun.');
      return;
    }

    if (name.length > 50) {
      setFormError('Restoran adı 50 karakterden uzun olamaz.');
      return;
    }

    if (!isPhoneNumberValid(phoneNumber)) {
      setFormError('Geçerli bir telefon numarası girin.');
      return;
    }

    if (!isEmailValid(email)) {
      setFormError('Geçerli bir e-posta adresi girin.');
      return;
    }
    if (!isHoursValid(operatingHours)) {
      setFormError('Geçerli bir çalışma saatleri formatı girin (ör. 09.00 - 22.00).');
      return;
    }

    if (
      parseInt(twoPersonTables) <= 0 ||
      parseInt(fourPersonTables) <= 0 ||
      parseInt(sixPersonTables) <= 0
    ) {
      setFormError('Masa sayısı sıfırdan küçük olamaz.');
      return;
    }

    if (!isUrlValid(websiteLink)) {
      setFormError('Geçerli bir website linki girin.');
      return;
    }

    setFormError('');
    onSubmit(e); 
  };

  return (
    <form onSubmit={handleSubmit}>
      {formError && <p className="error-message">{formError}</p>}

      <div className="input-group">
        <label htmlFor="name">Restoran Adı</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="address">Restoran Adresi</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="phoneNumber">Telefon Numarası</label>
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
        <label htmlFor="twoPersonTables">2 Kişilik Masa Sayısı</label>
        <input
          type="number"
          id="twoPersonTables"
          value={twoPersonTables || ''}
          min="1"
          onChange={(e) => {
            const value = e.target.value === '' ? '' : Number(e.target.value);
            setTwoPersonTables(value);
          }}
        />
      </div>

      <div className="input-group">
        <label htmlFor="fourPersonTables">4 Kişilik Masa Sayısı</label>
        <input
          type="number"
          id="fourPersonTables"
          value={fourPersonTables || ''}
          min="1"
          onChange={(e) => {
            const value = e.target.value === '' ? '' : Number(e.target.value);
            setFourPersonTables(value);
          }}
        />
      </div>

      <div className="input-group">
        <label htmlFor="sixPersonTables">6 Kişilik Masa Sayısı</label>
        <input
          type="number"
          id="sixPersonTables"
          value={sixPersonTables || ''}
          min="1"
          onChange={(e) => {
            const value = e.target.value === '' ? '' : Number(e.target.value);
            setSixPersonTables(value);
          }}
        />
      </div>

      <div className="input-group">
        <label htmlFor="operatingHours">Çalışma Saatleri</label>
        <input
          type="text"
          id="operatingHours"
          value={operatingHours}
          onChange={(e) => setOperatingHours(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="websiteLink">Web Sitesi Linki</label>
        <input
          type="url"
          id="websiteLink"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Şartlarınız var mı?</label>
        <div>
          <label>
            <input
              type="radio"
              name="acceptConditions"
              value="yes"
              checked={acceptConditions === 'yes'}
              onChange={() => setAcceptConditions('yes')}
            />
            Evet
          </label>
          <label>
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
      </div>

      {acceptConditions === 'yes' && (
        <div className="input-group">
          <label htmlFor="additionalCondition">Şartlarınız</label>
          <input
            type="text"
            id="additionalCondition"
            value={additionalCondition}
            onChange={(e) => setAdditionalCondition(e.target.value)}
          />
        </div>
      )}

      <div className="input-group">
        <label>Özel Günler</label>
        <div>
          {availableSpecialDays.map((day) => (
            <label key={day}>
              <input
                type="checkbox"
                value={day}
                checked={specialDays.includes(day)}
                onChange={handleSpecialDayChange}
              />
              {day}
            </label>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label htmlFor="tags">Etiketler</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="photos">Restoran Fotoğrafları</label>
        <input
          type="file"
          id="photos"
          accept="image/*"
          multiple
          onChange={(e) => setPhotos(e.target.files)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="logo">Restoran Logosu</label>
        <input
          type="file"
          id="logo"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
        />
      </div>

      <button type="submit">Profili Güncelle</button>
    </form>
  );
};

export default EditOwnerProfileForm;
