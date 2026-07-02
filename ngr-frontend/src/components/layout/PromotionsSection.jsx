import React from 'react';

function PromotionsSection({
  PROMOTIONS,
  setSelectedPromotion
}) {
  return (
    <section id="promociones-section">
      <div className="section-title">
        <h2>Promociones</h2>
      </div>
      <div className="promo-grid">
        {PROMOTIONS.map(promo => (
          <div 
            key={promo.id} 
            className="promo-card" 
            onClick={() => setSelectedPromotion(promo)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={promo.img}
              onError={(e) => { e.target.src = promo.fallbackImg; }}
              className="promo-image"
              alt={promo.title}
            />
            <div className="promo-overlay"></div>
            <div className="promo-content">
              <h3>{promo.title}</h3>
              <p>{promo.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PromotionsSection;
