import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    '/image1.jpg',
    '/image2.jpg',
    '/image3.jpg',
    '/image4.jpg'
  ];

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode === 'true') {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % carouselImages.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
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
     
      <div className="red-panel-up"> </div>
     
      <section className="why-opentable">
        <h2>Neden Rezerve'den Rezervasyon Yapmalısınız?</h2>
        <p>Rezerve ağı restoranları ve müşterileri buluşturur, doğru masayı bulup rezervasyon yapmanıza yardımcı olur ve restoranların kişiye özel hizmet sunarak müşterilerini memnun etmelerine destek olur.</p>
      </section>

      <div className="white-panel">
        <div className="carousel-container">
          <button 
            className="carousel-button prev" 
            onClick={prevImage}
          >
            <ChevronLeft size={32} />
          </button>
          
          <div className="carousel-image-wrapper">
            <img 
              src={carouselImages[currentImageIndex]} 
              alt={`Restoran resmi ${currentImageIndex + 1}`} 
              className="carousel-image"
            />
          </div>
          
          <button 
            className="carousel-button next" 
            onClick={nextImage}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      <div className="red-panel"> </div>
      
    </div>
  );
};

export default Home;