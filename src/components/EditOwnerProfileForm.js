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
      setFormError('Please fill out all required fields.');
      return;
    }

    if (!isPhoneNumberValid(phoneNumber)) {
      setFormError('Please enter a valid phone number (5-15 digits).');
      return;
    }

    if (!isEmailValid(email)) {
      setFormError('Please enter a valid email address.');
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
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {formError && <p className="error-message">{formError}</p>} 
      {error && <p className="error-message">{error}</p>} 
      
      <div>
        <label>Restaurant Name:</label>
        <input
          type="text"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
        />
      </div>

      <div>
        <label>Restaurant Address:</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Number of Tables:</label>
        <input
          type="number"
          value={numberOfTables}
          onChange={(e) => setNumberOfTables(e.target.value)}
        />
      </div>

      <div>
        <label>Max Capacity:</label>
        <input
          type="number"
          value={maxCapacity}
          onChange={(e) => setMaxCapacity(e.target.value)}
        />
      </div>

      <div>
        <label>Operating Hours:</label>
        <input
          type="text"
          value={operatingHours}
          onChange={(e) => setOperatingHours(e.target.value)}
          placeholder="Example: 09:00 - 22:00"
        />
      </div>

      <div>
        <label>Website Link:</label>
        <input
          type="url"
          value={websiteLink}
          onChange={(e) => setWebsiteLink(e.target.value)}
        />
      </div>

      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditOwnerProfileForm;


