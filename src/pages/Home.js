import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', !isDarkMode);
  };

  return (
    <div className={`home-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <header className="hero">
        <div className="hero-content">
          <h1>Her Durum İçin Bir Masa Ayırtın</h1>
          <p>İlk buluşmalardan, doğum günlerine, yıldönümlerinden, iş yemeklerine kadar hayat lezzetlidir. Neden en iyi puan almış restoranlarda rezervasyon yaparak kutlamıyorsunuz?</p>
          <div className="hero-actions">
            <button onClick={() => navigate('/Restaurants')}>Restoranları Keşfedin</button>
          </div>
        </div>
      </header>

      <section className="why-opentable">
        <h2>Neden Rezerve'den Rezervasyon Yapmalısınız?</h2>
        <p>Rezerve ağı restoranları ve müşterileri buluşturur, doğru masayı bulup rezervasyon yapmanıza yardımcı olur ve restoranların kişiye özel hizmet sunarak müşterilerini memnun etmelerine desték olur.</p>
      </section>

      <div className="image-gallery">
        <img src="/image1.jpg" alt="restoran resmi 1" />
        <img src="/image2.jpg" alt="restoran resmi 2" />
        <img src="/image3.jpg" alt="restoran resmi 3" />
        <img src="/image4.jpg" alt="restoran resmi 4" />
      </div>
    </div>
  );
};

export default Home;