import React from 'react';

function UserProfileModal({
  showProfileModal,
  setShowProfileModal,
  avatarColor,
  setAvatarColor,
  userName,
  setUserName,
  userMotto,
  setUserMotto,
  userEmail,
  setUserEmail,
  userPhone,
  setUserPhone,
  userBirthdate,
  setUserBirthdate,
  userFavoriteDish,
  setUserFavoriteDish,
  userLanguage,
  setUserLanguage,
  emailPromoOptIn,
  setEmailPromoOptIn,
  whatsappOptIn,
  setWhatsappOptIn,
  triggerToast,
  AVATAR_COLORS
}) {
  if (!showProfileModal) return null;

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal-box animate-fade">
        <button className="close-profile-modal" onClick={() => setShowProfileModal(false)}>✕</button>
        
        <div className="profile-header-meta">
          <div className="profile-avatar-big" style={{ background: avatarColor, transition: 'background 0.3s ease' }}>
            {userName ? userName.split(' ').map(n => n[0]).join('') : 'U'}
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{userName || 'Usuario NGR'}</h2>
            {userMotto && (
              <p style={{ margin: '2px 0 6px 0', fontSize: '12px', fontStyle: 'italic', color: '#64748b', fontWeight: '500' }}>
                "{userMotto}"
              </p>
            )}
            <span className="loyalty-badge-gold" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)' }}>
              <i className="fa-solid fa-circle-check"></i> Cuenta Verificada NGR
            </span>
          </div>
        </div>

        {/* ESTADÍSTICAS Y ACTIVIDAD DE CUENTA */}
        <div style={{ 
          background: 'linear-gradient(135deg, #fffcf9, #fff5eb)', 
          border: '1px solid #ffe3cb', 
          borderRadius: '18px', 
          padding: '16px', 
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '15px',
          textAlign: 'center'
        }}>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Pedidos NGR</span>
            <strong style={{ fontSize: '20px', color: '#ff6b00', fontWeight: '800' }}>14 <span style={{ fontSize: '12px', fontWeight: '600' }}>órdenes</span></strong>
          </div>
          <div style={{ width: '1px', height: '35px', background: '#ffe3cb' }}></div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Miembro NGR</span>
            <strong style={{ fontSize: '16px', color: '#ff6b00', fontWeight: '800' }}>{new Date().toLocaleString('es-PE', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}</strong>
          </div>
          <div style={{ width: '1px', height: '35px', background: '#ffe3cb' }}></div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Sello Favorito</span>
            <strong style={{ fontSize: '13px', color: '#ff6b00', fontWeight: '800', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {userFavoriteDish.replace('Hamburguesas ', '').replace('Pizza ', '').replace('Pollo ', '').replace('Chifas ', '').replace('Donuts ', '')}
            </strong>
          </div>
        </div>

        {/* PERSONAL DATA & AVATAR CUSTOMIZATION */}
        <div className="profile-section-block" style={{ background: '#fff9f5', border: '1px solid #ffe8d6', borderRadius: '18px', padding: '16px', marginBottom: '20px' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff6b00', margin: '0 0 12px 0', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase' }}>
            <i className="fa-solid fa-user-pen"></i> Datos Personales y Personalización
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* 2-Column fields for Name & Email */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Nombre Completo</label>
                <input 
                  type="text" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)} 
                  placeholder="Escribe tu nombre..."
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #ebdcd3',
                    fontSize: '13px',
                    outline: 'none',
                    background: 'white',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                  onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                />
              </div>

              <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Correo Electrónico</label>
                <input 
                  type="email" 
                  value={userEmail} 
                  onChange={(e) => setUserEmail(e.target.value)} 
                  placeholder="correo@ejemplo.com"
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #ebdcd3',
                    fontSize: '13px',
                    outline: 'none',
                    background: 'white',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                  onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                />
              </div>
            </div>

            {/* 2-Column fields for Phone & Birthday */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Número de Teléfono</label>
                <input 
                  type="text" 
                  value={userPhone} 
                  onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, ''))} 
                  placeholder="987 654 321"
                  maxLength="9"
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #ebdcd3',
                    fontSize: '13px',
                    outline: 'none',
                    background: 'white',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                  onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                />
              </div>

              <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Cumpleaños 🎂</label>
                <input 
                  type="date" 
                  value={userBirthdate} 
                  onChange={(e) => setUserBirthdate(e.target.value)} 
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #ebdcd3',
                    fontSize: '13px',
                    outline: 'none',
                    background: 'white',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                  onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                />
              </div>
            </div>

            {/* 2-Column fields for Motto & Favorite Brand */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Lema Foodie Personal 🍕</label>
                <input 
                  type="text" 
                  value={userMotto} 
                  onChange={(e) => setUserMotto(e.target.value)} 
                  placeholder="¡Frase o lema favorito!"
                  maxLength="45"
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #ebdcd3',
                    fontSize: '13px',
                    outline: 'none',
                    background: 'white',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                  onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                />
              </div>

              <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Marca Favorita NGR</label>
                <select 
                  value={userFavoriteDish} 
                  onChange={(e) => setUserFavoriteDish(e.target.value)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: '1.5px solid #ebdcd3',
                    fontSize: '13px',
                    outline: 'none',
                    background: 'white',
                    transition: 'border-color 0.2s',
                    height: '41px'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                  onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                >
                  <option value="Hamburguesas Bembos">Bembos 🍔</option>
                  <option value="Pizza Papa Johns">Papa Johns 🍕</option>
                  <option value="Pollo Belisario">Don Belisario 🍗</option>
                  <option value="Chifas China Wok">China Wok 🥡</option>
                  <option value="Donuts Dunkin">Dunkin 🍩</option>
                  <option value="Pollo Popeyes">Popeyes 🍗</option>
                </select>
              </div>
            </div>

            {/* Avatar Color Picker */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Personaliza el Color de tu Avatar</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                {AVATAR_COLORS.map((col, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setAvatarColor(col.value);
                      triggerToast(`🎨 ¡Color de avatar actualizado a ${col.name}!`, "success");
                    }}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: col.value,
                      border: avatarColor === col.value ? '2.5px solid #ff6b00' : '1px solid #cbd5e1',
                      cursor: 'pointer',
                      boxShadow: avatarColor === col.value ? '0 0 8px rgba(255, 107, 0, 0.4)' : 'none',
                      transform: avatarColor === col.value ? 'scale(1.15)' : 'none',
                      transition: 'transform 0.2s, border-color 0.2s'
                    }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* PREFERENCIAS Y NOTIFICACIONES */}
        <div className="profile-section-block" style={{ borderTop: '1px solid #edf2f7', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#ff6b00', textTransform: 'uppercase', marginBottom: '12px' }}>
            <i className="fa-solid fa-sliders" style={{ marginRight: '6px' }}></i> Preferencias y Ajustes de Cuenta
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Preferred Language */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '12.5px', color: '#334155', display: 'block' }}>Idioma de Preferencia</strong>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Idioma del catálogo y notificaciones</span>
              </div>
              <select 
                value={userLanguage} 
                onChange={(e) => setUserLanguage(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1.5px solid #ebdcd3',
                  fontSize: '12.5px',
                  background: 'white',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="Español">Español 🇵🇪</option>
                <option value="English">English 🇺🇸</option>
              </select>
            </div>

            {/* Email Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '12.5px', color: '#334155', display: 'block' }}>Recibir Ofertas Exclusivas</strong>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Descuentos y novedades de marcas NGR por email</span>
              </div>
              <label className="switch-toggle" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '22px' }}>
                <input 
                  type="checkbox" 
                  checked={emailPromoOptIn} 
                  onChange={(e) => {
                    setEmailPromoOptIn(e.target.checked);
                    triggerToast(e.target.checked ? "📧 Suscrito a ofertas NGR!" : "🔕 Cancelaste suscripción a ofertas.", "info");
                  }} 
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  inset: 0,
                  backgroundColor: emailPromoOptIn ? '#ff6b00' : '#cbd5e1',
                  borderRadius: '34px',
                  transition: '0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '16px',
                    width: '16px',
                    left: emailPromoOptIn ? '20px' : '4px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}></span>
                </span>
              </label>
            </div>

            {/* Whatsapp Toggle */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ fontSize: '12.5px', color: '#334155', display: 'block' }}>Alertas de Pedido por WhatsApp</strong>
                <span style={{ fontSize: '11px', color: '#64748b' }}>Sincronización GPS en tiempo real de tu delivery</span>
              </div>
              <label className="switch-toggle" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '22px' }}>
                <input 
                  type="checkbox" 
                  checked={whatsappOptIn} 
                  onChange={(e) => {
                    setWhatsappOptIn(e.target.checked);
                    triggerToast(e.target.checked ? "💬 Alertas de entrega activas por WhatsApp!" : "🔕 Alertas de WhatsApp desactivadas.", "info");
                  }} 
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  inset: 0,
                  backgroundColor: whatsappOptIn ? '#ff6b00' : '#cbd5e1',
                  borderRadius: '34px',
                  transition: '0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '16px',
                    width: '16px',
                    left: whatsappOptIn ? '20px' : '4px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}></span>
                </span>
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserProfileModal;
