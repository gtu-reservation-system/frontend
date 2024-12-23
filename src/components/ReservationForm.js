import React, { useState } from 'react';

const ReservationForm = ({ onSubmit, availableTimeSlots, maxGuests, terms, reservationTags }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [hasAllergies, setHasAllergies] = useState(false);
  const [allergens, setAllergens] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const today = new Date().toISOString().split("T")[0];
  
    if (!date || !time || !guests) {
      setErrorMessage("Lütfen tüm alanları doldurun.");
      return;
    }
  
    if (date === today) {
      setErrorMessage("Aynı gün içinde rezervasyon yapılamaz. Lütfen başka bir tarih seçin.");
      return;
    }
  
    if (guests > maxGuests) {
      setErrorMessage(`${maxGuests} kişiden fazla için lütfen restoranla iletişime geçin.`);
      return;
    }
  
    if (hasAllergies && !allergens) {
      setErrorMessage("Lütfen alerji bilginizi girin.");
      return;
    }
  
    if (terms && !agreed) {
      setErrorMessage("Lütfen şartları kabul edin.");
      return;
    }
  
    if (!availableTimeSlots.includes(time)) {
      setErrorMessage("Bu saat diliminde uygun masa bulunmamaktadır. Lütfen başka bir saat seçin.");
      return;
    }
  
    setErrorMessage('');
    const reservationData = {
      date,
      time,
      guests,
      hasAllergies,
      allergens,
      selectedTag,
    };
  
    onSubmit(reservationData);
    setDate('');
    setTime('');
    setGuests(1);
    setHasAllergies(false);
    setAllergens('');
    setSelectedTag('');
    setAgreed(false);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Rezervasyon Yap</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <label>Tarih:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          min={new Date().toISOString().split("T")[0]} 
          max={new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0]} 
          required 
        />
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
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          min="1"
          max={maxGuests}
          required
        />
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
            <input type="radio" name="hasAllergies" value="yes" checked={hasAllergies} onChange={() => setHasAllergies(true)} />
            Evet
          </label>
          <label>
            <input type="radio" name="hasAllergies" value="no" checked={!hasAllergies} onChange={() => setHasAllergies(false)} />
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
            <label>
              <input 
                type="radio" 
                name="reservationTag" 
                value="" 
                checked={selectedTag === ''} 
                onChange={() => setSelectedTag('')} 
              />
              Hiçbiri
            </label>
            {reservationTags.map(tag => (
              <label key={tag}>
                <input 
                  type="radio" 
                  name="reservationTag" 
                  value={tag} 
                  checked={selectedTag === tag} 
                  onChange={() => setSelectedTag(tag)} 
                />
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
      <button type="submit">Rezervasyon Talebimi Gönder</button>
    </form>
  );
};

export default ReservationForm;