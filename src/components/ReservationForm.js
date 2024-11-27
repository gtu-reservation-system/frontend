import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReservationForm = ({ onReserve, restaurantId, availableTimeSlots, maxGuests, terms, reservationTags }) => {
  const [fullName, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [hasAllergies, setHasAllergies] = useState(false);
  const [allergens, setAllergens] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [agreed, setAgreed] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!fullName || !date || !time || !guests) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
  
    if (guests > maxGuests) {
      alert(`${maxGuests} kişiden fazla için lütfen restoranla iletişime geçin.`);
      return;
    }
  
    if (hasAllergies && !allergens) {
      alert("Lütfen alerji bilginizi girin.");
      return;
    }
  
    if (terms && !agreed) { 
      alert("Lütfen şartları kabul edin.");
      return;
    }
  
    try {
      const authResponse = await axios.get('http://localhost:8080/api/auth/check');
      const isAuthenticated = authResponse.data.isAuthenticated;
  
      if (!isAuthenticated) {
        navigate('/login', { state: { from: `http://localhost:8080/reservation/${restaurantId}` } });
        return;
      }
  
      const userId = authResponse.data.user.id;
  
      const reservationData = {
        restaurantId,
        userId,
        reservationTime: `${date}T${time}`,
        reservationTag: selectedTag,
      };
  
      await axios.post('http://localhost:8080/api/reservations', reservationData);

      onReserve(reservationData);
      setName('');
      setDate('');
      setTime('');
      setGuests(1);
      setHasAllergies(false);
      setAllergens('');
      setSelectedTag('');
      setAgreed(false);
  
      alert("Rezervasyon başarılı!");
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Rezervasyon Yap</h2>
      <div>
        <label>İsim-Soyisim:</label>
        <input type="text" value={fullName} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Tarih:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Saat:</label>
        <select value={time} onChange={(e) => setTime(e.target.value)} required>
          <option value="" disabled>Saat seçin</option>
          {availableTimeSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Kişi Sayısı:</label>
        <input type="number" value={guests} onChange={(e) => setGuests(Number(e.target.value))} min="1" max={maxGuests} required />
        {guests > maxGuests && (
          <p style={{ color: 'red' }}>
            {maxGuests} kişiden fazla için lütfen restoranla iletişime geçin.
          </p>
        )}
      </div>
      <div>
        <label>Herhangi bir alerjiniz var mı?</label>
        <div>
          <label>
            <input type="radio" name="hasAllergies" value="yes" checked={hasAllergies === true} onChange={() => setHasAllergies(true)} />
            Evet
          </label>
          <label>
            <input type="radio" name="hasAllergies" value="no" checked={hasAllergies === false} onChange={() => setHasAllergies(false)} />
            Hayır
          </label>
        </div>
      </div>
      {hasAllergies && (
        <div>
          <label>Alerji Bilginizi Girin:</label>
          <textarea value={allergens} onChange={(e) => setAllergens(e.target.value)} placeholder="Neye alerjiniz olduğunu belirtin" />
        </div>
      )}
      {reservationTags && reservationTags.length > 0 && (
        <div>
          <label>Rezervasyon Etiketi:</label>
          <div>
            {reservationTags.map(tag => (
              <label key={tag}>
                <input type="radio" name="reservationTag" value={tag} checked={selectedTag === tag} onChange={() => setSelectedTag(tag)} />
                {tag}
              </label>
            ))}
          </div>
        </div>
      )}
      {terms && ( 
        <div>
          <label>
            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
            {terms}
          </label>
        </div>
      )}
      <button type="submit" disabled={!agreed && terms}>Rezervasyon Talebimi Gönder</button>
    </form>
  );
};

export default ReservationForm;
