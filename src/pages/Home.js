import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <header style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Her Durum İçin Bir Masa Ayırtın</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          İlk buluşmalardan, doğum günlerine, yıldönümlerinden, iş yemeklerine kadar hayat lezzetlidir. 
          Neden en iyi puan almış restoranlarda rezervasyon yaparak kutlamıyorsunuz?
        </p>
        <button
          style={{
            padding: '0.8rem 1.5rem',
            backgroundColor: '#e63946',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            marginTop: '1rem'
          }}
          onClick={() => navigate('/restaurants')}
          onMouseOver={(e) => e.target.style.backgroundColor = '#d62828'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#e63946'}
        >
          Restoranları Keşfedin
        </button>
      </header>

      <section style={{ textAlign: 'center', padding: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Neden Rezerve’den Rezervasyon Yapmalısınız?</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}> 
          Rezerve ağı restoranları ve müşterileri buluşturur, doğru masayı bulup rezervasyon yapmanıza yardımcı olur ve restoranların 
          kişiye özel hizmet sunarak müşterilerini memnun etmelerine destek olur.
        </p>
      </section>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', padding: '2rem' }}>
        <img src="/image1.jpg" alt="restoran resmi 1" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
        <img src="/image2.jpg" alt="restoran resmi 2" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
        <img src="/image3.jpg" alt="restoran resmi 3" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
        <img src="/image4.jpg" alt="restoran resmi 4" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
      </div>
    </div>
  );
};

export default Home;




