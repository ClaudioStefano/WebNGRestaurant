import React from 'react';

function PublicHero({
  setLoginMode,
  setShowLoginModal,
  isLoggedIn
}) {
  if (isLoggedIn) return null;

  return (
    <div id="publicPage" style={{ position: 'relative' }}>
      {/* Top-Right "Crear Cuenta" button */}
      <div style={{ position: 'absolute', top: '30px', right: '40px', zIndex: 10 }}>
        <button 
          onClick={() => { setLoginMode('signup'); setShowLoginModal(true); }}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '30px',
            fontSize: '14.5px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.25)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <i className="fa-solid fa-user-plus" style={{ marginRight: '8px' }}></i> Crear cuenta
        </button>
      </div>

      <div className="public-hero">
        <div className="public-overlay"></div>
        <div className="public-content">
          <div className="public-logo">NGR</div>
          <h1>Nexus Group Restaurants</h1>
          <p>Descubre las mejores marcas gastronómicas del Perú.</p>
          <button id="openLogin" onClick={() => setShowLoginModal(true)}>
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublicHero;
