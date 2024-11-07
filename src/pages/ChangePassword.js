import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const isPasswordValid = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 8;
    return hasUpperCase && hasLowerCase && hasNumber && isLongEnough;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Yeni şifre ve onay şifresi eşleşmiyor.');
      return;
    }

    if (!isPasswordValid(newPassword)) {
      setError('Yeni şifre en az 8 karakter olmalı ve bir büyük harf, bir küçük harf ve bir rakam içermelidir.');
      return;
    }

    setError('');

    try {
      const response = await axios.post('http://localhost:8080/api/change-password', {
        currentPassword,
        newPassword
      });

      if (response.status === 200) {
        setMessage('Şifreniz başarıyla değiştirildi!');
      }
    } catch (error) {
      console.error("Password change failed:", error);
      setError('Şifre değiştirirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div className="change-password">
      <h2>Şifre Değiştir</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

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
    </div>
  );
};

export default ChangePassword;
