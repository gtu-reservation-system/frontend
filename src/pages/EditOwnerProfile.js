import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EditOwnerProfileForm from '../components/EditOwnerProfileForm';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
  const [error, setError] = useState('');
  const [id, setOwnerId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOwnerId = sessionStorage.getItem('ownerId');
    if (storedOwnerId) {
      setOwnerId(storedOwnerId);
    } else {
      setError('Restoran sayfasına giriş yapılmamış!');
      return;
    }
  }, []);

  useEffect(() => {
    if (id) {
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
    }
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!ownerData.name || !ownerData.phoneNumber || !ownerData.email) {
      setError('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }
    setError('');

    try {
      const response = await axios.put(`${API_BASE_URL}/api/restaurants/${id}`, ownerData);
      if (response.status === 200) {
        navigate('/ownerProfile');
      }
    } catch (error) {
      console.error('Profil güncelleme sırasında bir hata oluştu:', error);
      setError('Profil güncellenirken bir hata oluştu.');
    }
  };

  const handleBackToProfile = () => {
    navigate('/ownerProfile');
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: '20px',
    fontFamily: "'Be Vietnam Pro', 'sans-serif'",
    padding: '20px',
  };

  return (
    <div className="edit-owner-profile">
      <h2 style={titleStyle}>Restoran Profili Düzenle</h2>
      <button
        onClick={handleBackToProfile}
        className="back-button"
        style={{
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'block',
          marginBottom: '10px',
          color: 'black',
          fontWeight: 'bold',
        }}
      >
        &#8592;
      </button>
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
        error={error}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default EditOwnerProfile;