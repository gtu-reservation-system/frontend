import React, { useState } from 'react';
import './EditUserProfileForm.css'

const EditUserProfileForm = ({
 name,
 phoneNumber,
 email,
 profilePhoto,
 setName,
 setPhoneNumber, 
 setEmail,
 setProfilePhoto,
 error,
 onSubmit
}) => {
 const [formError, setFormError] = useState('');
 const [showPhotoDialog, setShowPhotoDialog] = useState(false);

 const profilePhotos = [
   '/wizard.jpg',
   '/darkwizard.jpg', 
   '/redwitch.jpg',
   '/redwitch2.jpg'
 ];

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
   if (!name || !phoneNumber || !email) {
     setFormError('Lütfen tüm alanları doldurun');
     return;
   }
   if (name.length > 30) {
     setFormError('İsim 30 karakterden uzun olamaz.');
     return;
   }
   if (!isPhoneNumberValid(phoneNumber)) {
     setFormError('Geçerli bir telefon numarası girin (5-15 rakam).');
     return;
   }
   if (!isEmailValid(email)) {
     setFormError('Geçerli bir e-posta adresi girin.');
     return;
   }
   setFormError('');
   onSubmit(e);
 };

 const handlePhotoSelect = (photo) => {
   setProfilePhoto(photo);
   setShowPhotoDialog(false);
 };

 return (
   <div className="form-container">
     <div className="login-form">
       {/* Profile Photo Section */}
       <div className="profile-photo-section">
         <img
           src={profilePhoto}
           alt="Profile"
           className="profile-photo"
         />
         <button
           type="button"
           onClick={() => setShowPhotoDialog(true)}
           className="select-photo-button"
         >
           Profil Fotoğrafı Seç
         </button>
       </div>

       {/* Form */}
       <form onSubmit={handleSubmit} className="user-form">
         {(formError || error) && (
           <p className="error-message">{formError || error}</p>
         )}
         
         <div className="input-group">
           <label htmlFor="name">İsim ve soyisim</label>
           <input
             type="text"
             id="name"
             value={name}
             onChange={(e) => setName(e.target.value)}
           />
         </div>

         <div className="input-group">
           <label htmlFor="phoneNumber">Telefon numarası</label>
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

         <button type="submit">Bilgileri Güncelle</button>
       </form>

       {/* Photo Selection Modal */}
       {showPhotoDialog && (
         <div className="modal-overlay">
           <div className="modal-content">
             <h3 className="modal-title">Profil Fotoğrafı Seç</h3>
             <div className="photo-grid">
               {profilePhotos.map((photo, index) => (
                 <button
                   key={index}
                   onClick={() => handlePhotoSelect(photo)}
                   className={`photo-option ${profilePhoto === photo ? 'selected' : ''}`}
                 >
                   <img
                     src={photo}
                     alt={`Profile ${index + 1}`}
                     className="photo-option-img"
                   />
                 </button>
               ))}
             </div>
             <button
               onClick={() => setShowPhotoDialog(false)}
               className="modal-close-button"
             >
               Kapat
             </button>
           </div>
         </div>
       )}
     </div>
   </div>
 );
};

export default EditUserProfileForm;