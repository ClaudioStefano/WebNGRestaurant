import React from 'react';

function Hero() {
  const handleScrollToPromos = () => {
    const el = document.getElementById('promociones-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero">
      <div className="hero-text">
        <h1>"Conectamos tus antojos con momentos felices."</h1>
        <p>
          Bienvenidos al lugar donde se cocinan las mejores experiencias digitales de tus 
          restaurantes favoritos. Todo lo que te gusta, en un solo lugar.
        </p>
        <button onClick={handleScrollToPromos}>Ver promociones</button>
      </div>
      <img
        src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1200&auto=format&fit=crop"
        alt="Delicious Burger"
      />
    </div>
  );
}

export default Hero;
