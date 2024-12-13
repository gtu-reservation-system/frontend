import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditOwnerProfileForm from '../components/EditOwnerProfileForm';

const EditOwnerProfile = () => {
  const [ownerData, setOwnerData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    tables: [],
    operatingHours: '',
    websiteLink: '',
    acceptConditions: null,
    additionalCondition: '',
    birthdayParty: false,
    anniversary: false,
    jobMeeting: false,
    proposal: false,
    tags: [],
    photos: [],
    logo: null,
  });
  const [error, setError] = useState(null);
  const id = localStorage.getItem('ownerId');
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (!id) {
      setError('Restoran sayfasına giriş yapılmamış!');
      return;
    }

    const fetchOwnerData = async () => {

      try {
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/${id}`);
        setOwnerData({
          ...response.data,
          acceptConditions: response.data.additionalCondition ? 'yes' : 'no',
        });
      } catch (error) {
        console.error('Profil verileri alınırken hata oluştu:', error);
        setError('Profil verileri yüklenemedi');
      }
    };

    fetchOwnerData();
  }, [id]);


  const handleOwnerProfile = () => {
    navigate('/ownerProfile');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(`${API_BASE_URL}/api/restaurants/${id}`, ownerData);
      if (response.status === 200) {
        console.log('Profil başarıyla güncellendi:', response.data);
        navigate('/ownerProfile'); 
      }
    } catch (error) {
      console.error('Profil güncelleme sırasında bir hata oluştu:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };
  
  return (
    <div className="owner-profile">
      <h1>Restoran Profili Güncelle</h1>
      {error && <p className="error-message">{error}</p>}

      <EditOwnerProfileForm
        name={ownerData.name}
        address={ownerData.address}
        phoneNumber={ownerData.phoneNumber}
        email={ownerData.email}
        twoPersonTables={ownerData.tables.filter((table) => table.capacity === 2).length}
        fourPersonTables={ownerData.tables.filter((table) => table.capacity === 4).length}
        sixPersonTables={ownerData.tables.filter((table) => table.capacity === 6).length}
        operatingHours={ownerData.operatingHours}
        websiteLink={ownerData.websiteLink}
        acceptConditions={ownerData.acceptConditions}
        additionalCondition={ownerData.additionalCondition}
        specialDays={[
          ownerData.birthdayParty && 'Doğum Günü',
          ownerData.anniversary && 'Yıldönümü',
          ownerData.jobMeeting && 'İş Yemeği',
          ownerData.proposal && 'Evlilik Teklifi',
        ].filter(Boolean)}
        tags={ownerData.tags.join(', ')}
        photos={ownerData.photos}
        logo={ownerData.logo}
        setName={(value) => setOwnerData({ ...ownerData, name: value })}
        setAddress={(value) => setOwnerData({ ...ownerData, address: value })}
        setPhoneNumber={(value) => setOwnerData({ ...ownerData, phoneNumber: value })}
        setEmail={(value) => setOwnerData({ ...ownerData, email: value })}
        setTwoPersonTables={(value) => {
          const newTables = Array.from({ length: value }, (_, i) => ({
            available: true,
            capacity: 2,
            name: `Table 2-${i + 1}`,
          }));
          setOwnerData((prevData) => ({
            ...prevData,
            tables: [...prevData.tables.filter((table) => table.capacity !== 2), ...newTables],
          }));
        }}
        setFourPersonTables={(value) => {
          const newTables = Array.from({ length: value }, (_, i) => ({
            available: true,
            capacity: 4,
            name: `Table 4-${i + 1}`,
          }));
          setOwnerData((prevData) => ({
            ...prevData,
            tables: [...prevData.tables.filter((table) => table.capacity !== 4), ...newTables],
          }));
        }}
        setSixPersonTables={(value) => {
          const newTables = Array.from({ length: value }, (_, i) => ({
            available: true,
            capacity: 6,
            name: `Table 6-${i + 1}`,
          }));
          setOwnerData((prevData) => ({
            ...prevData,
            tables: [...prevData.tables.filter((table) => table.capacity !== 6), ...newTables],
          }));
        }}
        
        setOperatingHours={(value) => setOwnerData({ ...ownerData, operatingHours: value })}
        setWebsiteLink={(value) => setOwnerData({ ...ownerData, websiteLink: value })}
        setAcceptConditions={(value) => setOwnerData({ ...ownerData, acceptConditions: value })}
        setAdditionalCondition={(value) => setOwnerData({ ...ownerData, additionalCondition: value })}
        setSpecialDays={(value) => {
          setOwnerData({
            ...ownerData,
            birthdayParty: value.includes('Doğum Günü'),
            anniversary: value.includes('Yıldönümü'),
            jobMeeting: value.includes('İş Yemeği'),
            proposal: value.includes('Evlilik Teklifi'),
          });
        }}
        setTags={(value) => setOwnerData({ ...ownerData, tags: value.split(', ') })}
        setPhotos={(files) => setOwnerData({ ...ownerData, photos: Array.from(files).map((file) => URL.createObjectURL(file)) })}
        setLogo={(file) => setOwnerData({ ...ownerData, logo: URL.createObjectURL(file) })}
        onSubmit={handleFormSubmit}
      />

      <button onClick={handleOwnerProfile}>Profilim</button>
    </div>
  );
};

export default EditOwnerProfile;
