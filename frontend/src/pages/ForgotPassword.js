import React, { useState } from 'react';

const ForgotPassword = () => {
  const [identifier, setIdentifier] = useState(''); 
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isEmail, setIsEmail] = useState(true); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!identifier) {
      setError('Lütfen e-posta adresinizi veya telefon numaranızı girin.');
      return;
    }

    setError('');
    if (isEmail) {
      setMessage('E-posta gönderildi! Lütfen gelen kutunuzu kontrol edin.');
    } else {
      setMessage('SMS gönderildi! Lütfen telefonunuzu kontrol edin.');
    }
  };

  return (
    <div className="forgot-password">
      <h2>Şifremi Unuttum</h2>
      <div>
        {isEmail ? (
          <button type="button" onClick={() => setIsEmail(false)}>Telefon numarası ile</button>
        ) : (
          <button type="button" onClick={() => setIsEmail(true)}>E-posta ile</button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <div className="input-group">
          <label htmlFor="identifier">
            {isEmail ? 'E-posta adresiniz' : 'Telefon numaranız'}
          </label>
          <input
            type={isEmail ? 'email' : 'tel'}
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        <button type="submit">Şifre sıfırlama talebi</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
