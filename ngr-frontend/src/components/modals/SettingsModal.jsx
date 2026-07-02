import React from 'react';

function SettingsModal({
  showSettingsModal,
  setShowSettingsModal,
  dietPreference,
  setDietPreference,
  whatsappNotifications,
  setWhatsappNotifications,
  oneClickPay,
  setOneClickPay,
  triggerToast
}) {
  if (!showSettingsModal) return null;

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal-box animate-fade">
        <button className="close-profile-modal" onClick={() => setShowSettingsModal(false)}>✕</button>
        
        <div className="profile-header-meta">
          <div className="profile-avatar-big" style={{ background: 'linear-gradient(135deg, #475569, #334155)' }}>
            <i className="fa-solid fa-gear"></i>
          </div>
          <div>
            <h2>Configuración de Perfil</h2>
            <span className="loyalty-badge-gold" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid rgba(71, 85, 105, 0.15)' }}>
              Ajustes Inteligentes IA
            </span>
          </div>
        </div>

        <p className="panel-sub" style={{ marginTop: '-15px' }}>
          Personaliza tu experiencia de compras NGR. Nuestro motor de IA optimizará las sugerencias basándose en estos parámetros.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); triggerToast("⚙️ Preferencias guardadas y sincronizadas con IA NGR", "success"); setShowSettingsModal(false); }} className="settings-user-form">
          
          {/* Diet selection preference */}
          <div className="profile-section-block">
            <h3>Preferencia Alimenticia (Filtro IA)</h3>
            <p className="panel-sub">El sistema prioritizará los platos que coincidan con tu dieta y colocará alertas de escasez y recomendación</p>
            <div className="diet-options-grid">
              {[
                { id: 'ninguna', label: 'Ninguna (Dieta estándar)' },
                { id: 'vege', label: 'Vegetariano' },
                { id: 'sin-lactosa', label: 'Sin Lactosa' },
                { id: 'bajo-sodio', label: 'Bajo en Sodio' }
              ].map(opt => (
                <label key={opt.id} className={`diet-radio-card ${dietPreference === opt.id ? 'active-radio' : ''}`}>
                  <input 
                    type="radio" 
                    name="diet-pref" 
                    value={opt.id}
                    checked={dietPreference === opt.id}
                    onChange={() => {
                      setDietPreference(opt.id);
                      if (opt.id === 'ninguna') {
                        triggerToast("🥗 Filtro de dieta desactivado", "info");
                      } else {
                        const label = opt.id === 'vege' ? 'Vegetariano' : opt.id === 'sin-lactosa' ? 'Sin Lactosa' : 'Bajo en Sodio';
                        triggerToast(`🎯 IA activó dieta: ${label}`, "info");
                      }
                    }}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Toggles settings */}
          <div className="profile-section-block">
            <h3>Ajustes de Plataforma</h3>
            
            <div className="sett-toggle-row">
              <div>
                <strong>Notificaciones GPS por WhatsApp</strong>
                <span className="form-help">Recibe la localización en tiempo real de tu repartidor NGR</span>
              </div>
              <label className="switch-toggle-custom">
                <input 
                  type="checkbox" 
                  checked={whatsappNotifications}
                  onChange={() => setWhatsappNotifications(!whatsappNotifications)}
                />
                <span className="slider-round-custom"></span>
              </label>
            </div>

            <div className="sett-toggle-row" style={{ marginTop: '15px' }}>
              <div>
                <strong>Pago Rápido 1-Click (Visa/Yape)</strong>
                <span className="form-help">Habilita compras inmediatas saltándote el checkout convencional</span>
              </div>
              <label className="switch-toggle-custom">
                <input 
                  type="checkbox" 
                  checked={oneClickPay}
                  onChange={() => setOneClickPay(!oneClickPay)}
                />
                <span className="slider-round-custom"></span>
              </label>
            </div>
          </div>

          <div className="favorites-action-footer">
            <button type="submit" className="btn-auto-combo-favorites" style={{ background: 'var(--grad-primary)' }}>
              Guardar Preferencias
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default SettingsModal;
