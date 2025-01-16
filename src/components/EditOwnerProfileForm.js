import React, { useState } from 'react';
import './EditUserProfileForm.css';

const EditOwnerProfileForm = ({ 
  name, address, phoneNumber, email, twoPersonTables, fourPersonTables, sixPersonTables, operatingHours,
  websiteLink, acceptConditions, additionalCondition, specialDays, tags, photos, logo, setName, setAddress, 
  setPhoneNumber, setEmail, setTwoPersonTables, setFourPersonTables, setSixPersonTables, setOperatingHours, 
  setWebsiteLink, setAcceptConditions, setAdditionalCondition, setSpecialDays, setTags, setPhotos, setLogo, onSubmit 
}) => {
  const [formError, setFormError] = useState('');
  const availableSpecialDays = ['Doğum Günü', 'İş Yemeği', 'Yıldönümü', 'Evlilik Teklifi'];

  // Validation functions remain the same
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

  const handleSpecialDayChange = (e) => {
    const selectedDay = e.target.value;
    if (e.target.checked) {
      setSpecialDays([...specialDays, selectedDay]);
    } else {
      setSpecialDays(specialDays.filter((day) => day !== selectedDay));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phoneNumber || !email || !address || !operatingHours 
        || !acceptConditions == null) {
      setFormError('Lütfen tüm alanları doldurun.');
      return;
    }

    // All other validation checks remain the same
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

    if (parseInt(twoPersonTables) < 0 || parseInt(fourPersonTables) < 0 || parseInt(sixPersonTables) < 0) {
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
    <div className="form-container">
      <div className="login-form">
        <form onSubmit={handleSubmit} className="user-form">
          {formError && <p className="error-message">{formError}</p>}

          {/* Basic Information Section */}
          <div className="form-section">
            <h3>Temel Bilgiler</h3>
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
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <label htmlFor="address">Adres</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* Restaurant Details Section */}
          <div className="form-section">
            <h3>Restoran Detayları</h3>
            <div className="input-group">
              <label htmlFor="operatingHours">Çalışma Saatleri (ör. 09.00 - 22.00)</label>
              <input
                type="text"
                id="operatingHours"
                value={operatingHours}
                onChange={(e) => setOperatingHours(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="websiteLink">Web Sitesi</label>
              <input
                type="url"
                id="websiteLink"
                value={websiteLink}
                onChange={(e) => setWebsiteLink(e.target.value)}
              />
            </div>
          </div>

          {/* Table Configuration Section */}
          <div className="form-section">
            <h3>Masa Düzeni</h3>
            <div className="table-grid">
              <div className="input-group">
                <label htmlFor="twoPersonTables">2 Kişilik</label>
                <input
                  type="number"
                  id="twoPersonTables"
                  value={twoPersonTables}
                  min={0}
                  onChange={(e) => setTwoPersonTables(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </div>

              <div className="input-group">
                <label htmlFor="fourPersonTables">4 Kişilik</label>
                <input
                  type="number"
                  id="fourPersonTables"
                  value={fourPersonTables}
                  min={0}
                  onChange={(e) => setFourPersonTables(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </div>

              <div className="input-group">
                <label htmlFor="sixPersonTables">6 Kişilik</label>
                <input
                  type="number"
                  id="sixPersonTables"
                  value={sixPersonTables}
                  min={0}
                  onChange={(e) => setSixPersonTables(e.target.value === '' ? '' : Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* Special Days and Conditions Section */}
          <div className="form-section">
            <h3>Özel Günler ve Şartlar</h3>
            <div className="special-days-grid">
              {availableSpecialDays.map((day) => (
                <label key={day} className="checkbox-label">
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

            <div className="conditions-section">
              <div className="radio-group">
                <label>Özel Şartlar:</label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="acceptConditions"
                    value="yes"
                    checked={acceptConditions === 'yes'}
                    onChange={() => setAcceptConditions('yes')}
                  />
                  Var
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="acceptConditions"
                    value="no"
                    checked={acceptConditions === 'no'}
                    onChange={() => setAcceptConditions('no')}
                  />
                  Yok
                </label>
              </div>

              {acceptConditions === 'yes' && (
                <div className="input-group">
                  <input
                    type="text"
                    value={additionalCondition}
                    onChange={(e) => setAdditionalCondition(e.target.value)}
                    placeholder="Özel şartlarınızı belirtin"
                  />
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="submit-button">Profili Güncelle</button>
        </form>
      </div>
    </div>
  );
};

export default EditOwnerProfileForm;
