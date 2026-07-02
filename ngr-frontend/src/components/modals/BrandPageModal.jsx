import React from 'react';

function BrandPageModal({
  selectedBrandName,
  handleCloseBrandPage,
  BRANDS,
  BRAND_DETAILS,
  BRAND_MILESTONES
}) {
  if (!selectedBrandName || !BRAND_DETAILS[selectedBrandName]) return null;

  const brandData = BRAND_DETAILS[selectedBrandName];
  const activeBrand = BRANDS.find(b => b.name === selectedBrandName);

  return (
    <div className="profile-modal-overlay brand-page-overlay">
      <div className="profile-modal-box brand-page-box animate-scale-up" style={{ maxWidth: '580px', width: '90%' }}>
        <button className="close-profile-modal" onClick={handleCloseBrandPage}>✕</button>
        
        {/* Brand Cover Photo */}
        <div className="brand-page-hero" style={{ 
          backgroundImage: `url(${brandData.cover})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '180px',
          borderRadius: '20px',
          position: 'relative',
          marginBottom: '25px',
          overflow: 'hidden'
        }}>
          <div className="brand-hero-overlay" style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))'
          }}></div>
          
          <div className="brand-hero-title-block" style={{
            position: 'absolute',
            bottom: '20px',
            left: '25px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div className="brand-logo-circle" style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
              fontSize: '28px'
            }}>
              {activeBrand?.fallbackLogo || "🍔"}
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.3)', color: 'white' }}>{selectedBrandName}</h1>
              <span style={{ fontSize: '11px', opacity: 0.9, fontWeight: '600', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px' }}>
                Desde {brandData.founded}
              </span>
            </div>
          </div>
        </div>

        {/* Historical Context Section */}
        <div className="profile-section-block" style={{ paddingBottom: '20px', borderBottom: '1px solid #edf2f7', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.8px', color: '#ff6b00', textTransform: 'uppercase', marginBottom: '8px' }}>
            <i className="fa-solid fa-book-open" style={{ marginRight: '6px' }}></i> Nuestra Historia & Tradición
          </h3>
          <p className="panel-sub" style={{ fontSize: '13px', lineHeight: '1.6', color: '#475569', margin: 0 }}>
            {brandData.history}
          </p>
          <div className="brand-slogan-box" style={{ 
            marginTop: '12px', 
            background: '#fff8f0', 
            borderLeft: '4px solid #ff6b00', 
            padding: '8px 15px', 
            borderRadius: '0 8px 8px 0', 
            fontStyle: 'italic',
            fontSize: '12.5px',
            color: '#b45309',
            fontWeight: '600'
          }}>
            "{brandData.slogan}"
          </div>
        </div>

        {/* BRAND MILESTONES TIMELINE */}
        <div className="profile-section-block" style={{ paddingBottom: 0, borderBottom: 'none', marginBottom: 0 }}>
          <h3 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.8px', color: '#ff6b00', textTransform: 'uppercase', marginBottom: '15px' }}>
            <i className="fa-solid fa-timeline" style={{ marginRight: '6px' }}></i> Hitos Históricos de la Marca
          </h3>
          
          <div className="timeline-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #e2e8f0', marginLeft: '10px' }}>
            {BRAND_MILESTONES[selectedBrandName]?.map((m, idx) => (
              <div key={idx} className="timeline-node animate-fade-in" style={{ position: 'relative' }}>
                {/* Pulsing dot */}
                <div style={{ 
                  position: 'absolute', 
                  left: '-26px', 
                  top: '3px', 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%', 
                  background: '#ff6b00',
                  boxShadow: '0 0 8px #ff6b00'
                }}></div>
                
                <strong style={{ fontSize: '13px', color: '#ff6b00', display: 'block', marginBottom: '2px' }}>{m.year} - {m.title}</strong>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.4' }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandPageModal;
