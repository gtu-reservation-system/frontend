import React, { useState } from 'react';

const ResetPasswordForm = ({ onSubmit }) => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!token) {
      setError('Lütfen şifre sıfırlama tokenını girin.');
      return false;
    }
    if (!newPassword || newPassword.length < 6 || newPassword.length > 12) {
      setError('Şifre 6 ile 12 karakter arasında olmalıdır.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ token, newPassword });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <div className="input-group">
        <label htmlFor="token">Şifre Sıfırlama Tokenı</label>
        <input
          type="text"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Tokenınızı girin"
        />
      </div>
      <div className="input-group">
        <label htmlFor="newPassword">Yeni Şifre</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Yeni şifrenizi girin"
        />
      </div>
      <button type="submit">Şifreyi Sıfırla</button>
    </form>
  );
};

export default ResetPasswordForm;
