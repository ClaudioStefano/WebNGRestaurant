import React from 'react';

function AddressesModal({
  showAddressesModal,
  setShowAddressesModal,
  savedAddresses,
  setSavedAddresses,
  activeAddress,
  setActiveAddress,
  selectedCity,
  setSelectedCity,
  newAddressTag,
  setNewAddressTag,
  newAddressCity,
  setNewAddressCity,
  newAddressDistrict,
  setNewAddressDistrict,
  newAddressText,
  setNewAddressText,
  triggerToast,
  CITIES,
  CITY_DISTRICTS
}) {
  if (!showAddressesModal) return null;

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal-box animate-fade" style={{ maxWidth: '500px' }}>
        <button className="close-profile-modal" onClick={() => setShowAddressesModal(false)}>✕</button>
        
        <div className="profile-header-meta">
          <div className="profile-avatar-big" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
            <i className="fa-solid fa-location-dot"></i>
          </div>
          <div>
            <h2>Mis Direcciones de Entrega</h2>
            <span className="loyalty-badge-gold" style={{ background: '#fef3c7', color: '#b45309', border: '1px solid rgba(180, 83, 9, 0.15)' }}>
              <i className="fa-solid fa-house-chimney"></i> {savedAddresses.length} Guardadas
            </span>
          </div>
        </div>

        <p className="panel-sub" style={{ marginTop: '-15px' }}>
          Administra tus direcciones guardadas y selecciona cuál quieres usar para tus entregas de marcas NGR.
        </p>

        {/* List of saved addresses */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', maxHeight: '250px', overflowY: 'auto', paddingRight: '4px' }}>
          {savedAddresses.map(addr => (
            <div 
              key={addr.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 15px',
                borderRadius: '16px',
                background: 'white',
                border: activeAddress?.id === addr.id ? '2.5px solid #ff6b00' : '1px solid #e2e8f0',
                boxShadow: activeAddress?.id === addr.id ? '0 4px 15px rgba(255, 107, 0, 0.1)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{addr.tag === 'Casa' ? '🏠' : addr.tag === 'Trabajo' ? '💼' : '📍'}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '13.5px', color: '#1e293b' }}>{addr.tag}</strong>
                    {activeAddress?.id === addr.id && (
                      <span style={{ fontSize: '9px', fontWeight: '800', background: '#fff0e5', color: '#ff6b00', padding: '2px 6px', borderRadius: '8px', textTransform: 'uppercase' }}>Activa</span>
                    )}
                    <span style={{ fontSize: '10px', background: '#f1f5f9', color: '#64748b', padding: '2px 6px', borderRadius: '6px', fontWeight: '700' }}>
                      {addr.city || 'Lima Metropolitana'}
                    </span>
                  </div>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{addr.address}, {addr.district}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                {activeAddress?.id !== addr.id && (
                  <button 
                    onClick={() => {
                      setActiveAddress(addr);
                      setSelectedCity(addr.city || 'Lima Metropolitana'); // SYNCHRONIZE NAVBAR CITY!
                      triggerToast(`📍 Dirección activa: ${addr.tag} (${addr.address})`, "success");
                    }}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '10px',
                      border: 'none',
                      background: '#ff6b00',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Activar
                  </button>
                )}
                <button 
                  onClick={() => {
                    if (savedAddresses.length <= 1) {
                      triggerToast("⚠️ Debes tener al menos una dirección guardada", "error");
                      return;
                    }
                    const isDeletingActive = activeAddress?.id === addr.id;
                    const filtered = savedAddresses.filter(a => a.id !== addr.id);
                    setSavedAddresses(filtered);
                    if (isDeletingActive) {
                      setActiveAddress(filtered[0]);
                    }
                    triggerToast("❌ Dirección eliminada", "success");
                  }}
                  style={{
                    padding: '6px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '10px',
                    border: 'none',
                    background: '#fee2e2',
                    color: '#ef4444',
                    fontSize: '11px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  title="Eliminar dirección"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Address Form */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '15px', textAlign: 'left' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '13.5px', fontWeight: '800', color: '#1e293b' }}>Agregar Nueva Dirección</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Casa', 'Trabajo', 'Otro'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setNewAddressTag(tag)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '10px',
                    border: '1.5px solid',
                    borderColor: newAddressTag === tag ? '#ff6b00' : '#ebdcd3',
                    background: newAddressTag === tag ? '#fff0e5' : 'white',
                    color: newAddressTag === tag ? '#ff6b00' : '#475569',
                    fontWeight: '700',
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{tag === 'Casa' ? '🏠' : tag === 'Trabajo' ? '💼' : '📍'}</span>
                  <span>{tag}</span>
                </button>
              ))}
            </div>

             <div style={{ display: 'flex', gap: '8px' }}>
               <select
                 value={newAddressCity}
                 onChange={(e) => {
                   const city = e.target.value;
                   setNewAddressCity(city);
                   const districts = CITY_DISTRICTS[city] || ['Zona Centro', 'Zona Norte', 'Zona Sur'];
                   setNewAddressDistrict(districts[0]);
                 }}
                 style={{
                   flex: 1,
                   padding: '10px 14px',
                   borderRadius: '10px',
                   border: '1.5px solid #ebdcd3',
                   fontSize: '12px',
                   outline: 'none',
                   transition: 'all 0.2s',
                   background: 'white'
                 }}
                 onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                 onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
               >
                 {CITIES.map(c => (
                   <option key={c} value={c}>{c}</option>
                 ))}
               </select>

               <select
                 value={newAddressDistrict}
                 onChange={(e) => setNewAddressDistrict(e.target.value)}
                 style={{
                   flex: 1,
                   padding: '10px 14px',
                   borderRadius: '10px',
                   border: '1.5px solid #ebdcd3',
                   fontSize: '12px',
                   outline: 'none',
                   transition: 'all 0.2s',
                   background: 'white'
                 }}
                 onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                 onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
               >
                 {(CITY_DISTRICTS[newAddressCity] || ['Zona Centro', 'Zona Norte', 'Zona Sur']).map(dist => (
                   <option key={dist} value={dist}>{dist}</option>
                 ))}
               </select>
             </div>

             <div style={{ display: 'flex', gap: '8px' }}>
               <input 
                 type="text" 
                 placeholder={`Dirección en ${newAddressCity} (ej. Av. Larco 452)`} 
                 value={newAddressText}
                 onChange={(e) => setNewAddressText(e.target.value)}
                 style={{
                   flex: 1,
                   padding: '10px 14px',
                   borderRadius: '10px',
                   border: '1.5px solid #ebdcd3',
                   fontSize: '12px',
                   outline: 'none',
                   transition: 'all 0.2s'
                 }}
                 onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                 onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
               />
             </div>

             <button
               onClick={() => {
                 if (!newAddressText.trim()) {
                   triggerToast("⚠️ Por favor escribe una dirección válida", "error");
                   return;
                 }
                 const nextId = savedAddresses.length > 0 ? Math.max(...savedAddresses.map(a => a.id)) + 1 : 1;
                 const newAddr = {
                   id: nextId,
                   tag: newAddressTag,
                   address: newAddressText.trim(),
                   district: newAddressDistrict,
                   city: newAddressCity,
                   isDefault: false
                 };
                 setSavedAddresses([...savedAddresses, newAddr]);
                 setActiveAddress(newAddr); // Auto-set active!
                 setSelectedCity(newAddressCity); // SYNCHRONIZE NAVBAR CITY!
                 setNewAddressText('');
                 triggerToast(`✅ Dirección "${newAddr.tag}" agregada en ${newAddressCity} y activada`, "success");
               }}
              style={{
                padding: '11px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #ff6b00, #ff8c3a)',
                color: 'white',
                border: 'none',
                fontWeight: '700',
                fontSize: '12.5px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 107, 0, 0.2)',
                transition: 'all 0.2s',
                marginTop: '5px'
              }}
            >
              Agregar Dirección 📍
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddressesModal;
