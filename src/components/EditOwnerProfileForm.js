import React, { useState } from 'react';

const EditOwnerProfileForm = ({ ownerData, onSubmit, error }) => {
  const [restaurantName, setRestaurantName] = useState(ownerData.restaurantName || '');
  const [address, setAddress] = useState(ownerData.address || '');
  const [phoneNumber, setPhoneNumber] = useState(ownerData.phoneNumber || '');
  const [email, setEmail] = useState(ownerData.email || '');
  const [numberOfTables, setNumberOfTables] = useState(ownerData.numberOfTables || '');
  const [maxCapacity, setMaxCapacity] = useState(ownerData.maxCapacity || '');
  const [operatingHours, setOperatingHours] = useState(ownerData.operatingHours || '');
  const [websiteLink, setWebsiteLink] = useState(ownerData.websiteLink || '');
  const [acceptConditions, setAcceptConditions] = useState(ownerData.acceptConditions || 'no');
  const [additionalCondition, setAdditionalCondition] = useState(ownerData.additionalCondition || '');
  const [specialDays, setSpecialDays] = useState(ownerData.specialDays || 'no');

  const [formError, setFormError] = useState('');

  const isPhoneNumberValid = (phone) => {
    const phoneRegex = /^[0-9]{5,15}$/;
    return phoneRegex.test(phone);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError(''); 

    if (!restaurantName || !address || !phoneNumber || !email || !numberOfTables || !maxCapacity) {
      setFormError('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    if (!isPhoneNumberValid(phoneNumber)) {
      setFormError('Lütfen geçerli bir telefon numarası girin (5-15 haneli).');
      return;
    }

    if (!isEmailValid(email)) {
      setFormError('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    onSubmit({
      restaurantName,
      address,
      phoneNumber,
      email,
      numberOfTables,
      maxCapacity,
      operatingHours,
      websiteLink,
      additionalCondition,
      specialDays,
      acceptConditions,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {formError && <p className="error-message">{formError}</p>} 
      {error && <p className="error-message">{error}</p>} 
      
      <div>
        <label>Restoran Adı:</label>
        <input
          type="text"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
      </div>

      <div>
        <label>Restoran Adresi:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <label>Telefon Numarası:</label>
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
        <label>Masa Sayısı:</label>
        <input
          type="number"
          value={numberOfTables}
          onChange={(e) => setNumberOfTables(e.target.value)}
        />
      </div>

      <div>
        <label>Max Kapasite:</label>
        <input
          type="number"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(e.target.value)}
        />
      </div>

      <div>
        <label>Çalışma Saatleri:</label>
        <input
          type="text"
          value={operatingHours}
          onChange={(e) => setOperatingHours(e.target.value)}
          placeholder="Örnek: 09:00 - 22:00"
        />
      </div>
      
      <div>
        <label>Web Sitesi Linki:</label>
        <input
          type="url"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
        />
      </div>

      <div>
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
        <div>
          <label>Şartlarınız:</label>
          <input
            type="text"
            value={additionalCondition}
            onChange={(e) => setAdditionalCondition(e.target.value)}
          />
        </div> )}

      <div>
        <label>Özel Gün Rezervasyonları:</label>
        <div>
          <label>
            <input
              type="radio"
              name="specialDays"
              value="yes"
              onChange={() => setSpecialDays('yes')}
            />
            Evet
          </label>
          <label>
            <input
              type="radio"
              name="specialDays"
              value="no"
              onChange={() => setSpecialDays('no')}
            />
            Hayır
          </label>
        </div>
      </div>

      <button type="submit">Profili Güncelle</button>
    </form>
  );
};

export default EditOwnerProfileForm;
