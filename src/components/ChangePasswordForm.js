import React, { useState } from 'react';

const ChangePasswordForm = ({ onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const isPasswordValid = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isCorrectLength = password.length >= 8 && password.length <= 12;
    return hasUpperCase && hasLowerCase && hasNumber && isCorrectLength;
  };

  const validateForm = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun.');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError('Yeni şifre ve onay şifresi eşleşmiyor.');
      return false;
    }

    if (!isPasswordValid(newPassword)) {
      setError('Yeni şifre en az 8 karakter olmalı ve bir büyük harf, bir küçük harf ve bir rakam içermelidir.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ currentPassword, newPassword });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="change-password-form">
      {error && <p className="error-message">{error}</p>}

      <div className="input-group">
        <label htmlFor="currentPassword">Mevcut Şifre</label>
        <input
          type="password"
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="newPassword">Yeni Şifre</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="confirmPassword">Yeni Şifreyi Onayla</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button type="submit">Şifreyi Değiştir</button>
    </form>
  );
};

export default ChangePasswordForm;
