import React, { useState } from 'react';
import './EditUserProfileForm.css'

const ReservationForm = ({ onSubmit, availableTimeSlots, terms, reservationTags }) => {
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

    if (guests > 6) {
      setErrorMessage(`6 kişiden fazla için lütfen restoranla iletişime geçin.`);
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
    onSubmit({
      date,
      time,
      guests,
      hasAllergies,
      allergens,
      selectedTag,
    });

    // Reset form
    setDate('');
    setTime('');
    setGuests(1);
    setHasAllergies(false);
    setAllergens('');
    setSelectedTag('');
    setAgreed(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{errorMessage}</p>
          </div>
        )}

        <div className="space-y-4">
          {/* Date and Time Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="input-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tarih
              </label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                min={new Date().toISOString().split("T")[0]} 
                max={new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0]} 
                required 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="input-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Saat
              </label>
              <select 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Saat seçin</option>
                {availableTimeSlots.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Guests Section */}
          <div className="input-group">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kişi Sayısı
            </label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              min="1"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {guests > 6 && (
              <p className="mt-1 text-sm text-red-600">
                6 kişiden fazla için lütfen restoranla iletişime geçin.
              </p>
            )}
          </div>

          {/* Allergies Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Herhangi bir alerjiniz var mı?
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="hasAllergies" 
                  checked={hasAllergies} 
                  onChange={() => setHasAllergies(true)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Evet</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="radio" 
                  name="hasAllergies" 
                  checked={!hasAllergies} 
                  onChange={() => setHasAllergies(false)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Hayır</span>
              </label>
            </div>
          </div>

          {hasAllergies && (
            <div className="input-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alerji Bilginizi Girin
              </label>
              <textarea 
                value={allergens} 
                onChange={(e) => setAllergens(e.target.value)} 
                placeholder="Neye alerjiniz olduğunu belirtin"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
              />
            </div>
          )}

          {/* Reservation Tags Section */}
          {reservationTags && reservationTags.length > 0 && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Rezervasyon Etiketi
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center">
                  <input 
                    type="radio" 
                    name="reservationTag" 
                    value="" 
                    checked={selectedTag === ''} 
                    onChange={() => setSelectedTag('')}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Hiçbiri</span>
                </label>
                {reservationTags.map(tag => (
                  <label key={tag} className="flex items-center">
                    <input 
                      type="radio" 
                      name="reservationTag" 
                      value={tag} 
                      checked={selectedTag === tag} 
                      onChange={() => setSelectedTag(tag)}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Terms Section */}
          {terms && (
            <div className="flex items-start space-x-2">
              <input 
                type="checkbox" 
                checked={agreed} 
                onChange={() => setAgreed(!agreed)}
                className="mt-1"
              />
              <span className="text-sm text-gray-700">{terms}</span>
            </div>
          )}
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Rezervasyon Talebimi Gönder
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;