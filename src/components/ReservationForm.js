import React, { useState } from 'react';

const ReservationForm = ({ onSubmit, availableTimeSlots, maxGuests, terms, reservationTags }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [hasAllergies, setHasAllergies] = useState(false);
  const [allergens, setAllergens] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !time || !guests) {
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
