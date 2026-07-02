import React from 'react';

function PaymentPage({
  showPaymentPage,
  setShowPaymentPage,
  paymentView,
  setPaymentView,
  savedCards,
  setSavedCards,
  newCard,
  setNewCard,
  activeCouponCode,
  setActiveCouponCode,
  couponDiscount,
  setCouponDiscount,
  deliveryCost,
  setDeliveryCost,
  triggerToast
}) {
  if (!showPaymentPage) return null;

  return (
    <div className="payment-full-page animate-fade">
      <div className="payment-container">

        {/* Sidebar */}
        <div className="payment-sidebar">
          <div className="payment-sidebar-header">
            <h2>Mis Tarjetas</h2>
          </div>

          <div className="payment-menu">
            <div className={`payment-menu-item ${paymentView === 'add' ? 'active' : ''}`} onClick={() => setPaymentView('add')}>
              <i className="fa-solid fa-plus"></i> Agregar tarjeta
            </div>
            <div className={`payment-menu-item ${paymentView === 'list' ? 'active' : ''}`} onClick={() => setPaymentView('list')}>
              <i className="fa-solid fa-list-ul"></i> Ver mis tarjetas
            </div>
            <div className={`payment-menu-item ${paymentView === 'discounts' ? 'active' : ''}`} onClick={() => setPaymentView('discounts')}>
              <i className="fa-solid fa-tags"></i> Ver descuentos
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="payment-content">
          
          {/* BOTÓN CERRAR */}
          <button className="close-payment-btn" onClick={() => setShowPaymentPage(false)}>✕</button>

          {/* AGREGAR TARJETA */}
          {paymentView === 'add' && (
            <div className="add-card-section animate-fade-in">
              <h2>Agregar Nueva Tarjeta</h2>

              {/* Real-time Luxury Credit Card Preview */}
              <div className={`premium-preview-card ${
                newCard.bank === 'interbank' ? 'preview-card-interbank' :
                newCard.bank === 'bcp' ? 'preview-card-bcp' :
                newCard.bank === 'falabella' ? 'preview-card-falabella' :
                newCard.bank === 'bbva' ? 'preview-card-bbva' :
                newCard.bank === 'scotiabank' ? 'preview-card-scotiabank' : 'preview-card-default'
              }`} style={{ transform: 'scale(1)', margin: '0 auto 25px auto' }}>
                
                {/* Header: Chip and Bank Name */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="preview-card-chip"></div>
                  <span style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase', opacity: 0.95 }}>
                    {newCard.bank === 'interbank' ? "Interbank" :
                     newCard.bank === 'bcp' ? "BCP" :
                     newCard.bank === 'falabella' ? "Falabella" :
                     newCard.bank === 'bbva' ? "BBVA" :
                     newCard.bank === 'scotiabank' ? "Scotiabank" : ""}
                  </span>
                </div>

                {/* Number */}
                <div style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '3px', fontFamily: 'monospace', margin: '15px 0 5px 0', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                  {newCard.number || "**** **** **** ****"}
                </div>

                {/* Footer: Holder, Expiry, and Brand SVG Logo */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '8px', textTransform: 'uppercase', opacity: 0.6, letterSpacing: '1px' }}>Titular</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      {newCard.holder || "Nombre del Titular"}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
                    <span style={{ fontSize: '8px', textTransform: 'uppercase', opacity: 0.6, letterSpacing: '1px' }}>Expira</span>
                    <span style={{ fontSize: '12px', fontWeight: '700' }}>
                      {newCard.expiry || "MM/AA"}
                    </span>
                  </div>
                  <div style={{ opacity: 0.95 }}>
                    {newCard.type === 'visa' ? (
                      <svg viewBox="0 0 120 40" width="55" height="18"><path fill="white" d="M14.6 30.6l3.7-21.2H12.5l-3.7 21.2h5.8zm23.8-20.7c-1.1-.4-2.8-.8-4.9-.8-5.4 0-9.2 2.7-9.2 6.6 0 2.9 2.7 4.5 4.8 5.5 2.1 1 2.8 1.6 2.8 2.5 0 1.4-1.8 2-3.4 2-2.3 0-3.5-.3-5.4-1.1l-.8 4.3c1.3.6 3.7 1.1 6.2 1.1 5.7 0 9.4-2.7 9.4-6.9 0-2.3-1.4-4-4.7-5.5-2.2-1-3.5-1.7-3.5-2.8 0-1 .1-2.1 2.4-2.1.9 0 2.6.2 3.8.7l.5-4.4c-1.1-.3-2.6-.5-3.8-.5zm23.1.2h-4.4c-1.4 0-2.4.4-3 1.7L46.8 30.6h6.1l1.2-3.2h7.5l.7 3.2h5.4L61.5 10.1zm-8.8 13.5l2.4-6.3.8 6.3h-3.2zm24.1-13.5l-4.7 20.5h5.8l4.7-20.5h-5.8z" /><path fill="white" d="M5.4 10.1L.1 30.6h5.8L11.2 10.1H5.4z" opacity="0.9" /></svg>
                    ) : (
                      <svg viewBox="0 0 100 60" width="40" height="24"><circle cx="33" cy="30" r="28" fill="white" opacity="0.8" /><circle cx="67" cy="30" r="28" fill="white" opacity="0.9" /><path d="M50 8.4A28 28 0 0 1 61.8 30 28 28 0 0 1 50 51.6 28 28 0 0 1 38.2 30 28 28 0 0 1 50 8.4z" fill="#FFF" opacity="0.7" /></svg>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="form-grid">
                <input 
                  type="text" 
                  placeholder="Nombre del titular" 
                  maxLength="30" 
                  value={newCard.holder} 
                  onChange={(e) => setNewCard({...newCard, holder: e.target.value})} 
                />
                <input 
                  type="text" 
                  placeholder="Número de tarjeta" 
                  maxLength="19" 
                  value={newCard.number} 
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '').slice(0, 16);
                    
                    // Auto-detect brand based on prefixes
                    let brand = newCard.type;
                    if (val.startsWith('4')) {
                      brand = 'visa';
                    } else {
                      const firstTwo = parseInt(val.substring(0, 2), 10);
                      const firstFour = parseInt(val.substring(0, 4), 10);
                      const isMC2 = firstTwo >= 51 && firstTwo <= 55;
                      const isMC4 = firstFour >= 2221 && firstFour <= 2720;
                      if (isMC2 || isMC4) {
                        brand = 'mastercard';
                      }
                    }
                    
                    // Reset bank if it doesn't match the new brand
                    let finalBank = newCard.bank;
                    if (brand === 'visa' && !['bcp', 'bbva', 'interbank'].includes(finalBank)) {
                      finalBank = '';
                    } else if (brand === 'mastercard' && !['falabella', 'scotiabank', 'interbank'].includes(finalBank)) {
                      finalBank = '';
                    }
                    
                    val = val.replace(/(\d{4})/g, '$1 ').trim();
                    setNewCard({...newCard, number: val, type: brand, bank: finalBank});
                  }} 
                />
                <input 
                  type="text" 
                  placeholder="MM/AA" 
                  maxLength="5" 
                  value={newCard.expiry} 
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '');
                    if (val.length >= 2) val = val.slice(0,2) + '/' + val.slice(2,4);
                    setNewCard({...newCard, expiry: val});
                  }} 
                />
                <input 
                  type="text" 
                  placeholder="CVV" 
                  maxLength="3" 
                  value={newCard.cvv} 
                  onChange={(e) => setNewCard({...newCard, cvv: e.target.value.replace(/\D/g, '')})} 
                />
              </div>

              <div className="card-type-selector-horizontal">
                <button 
                  type="button"
                  className={`card-type-box ${newCard.type === 'visa' ? 'active' : ''}`}
                  onClick={() => {
                    let finalBank = newCard.bank;
                    if (!['bcp', 'bbva', 'interbank'].includes(finalBank)) {
                      finalBank = '';
                    }
                    setNewCard({...newCard, type: 'visa', bank: finalBank});
                  }}
                >
                  <svg viewBox="0 0 120 40" width="60" height="20"><path fill={newCard.type === 'visa' ? '#1a1f71' : '#a09890'} d="M14.6 30.6l3.7-21.2H12.5l-3.7 21.2h5.8zm23.8-20.7c-1.1-.4-2.8-.8-4.9-.8-5.4 0-9.2 2.7-9.2 6.6 0 2.9 2.7 4.5 4.8 5.5 2.1 1 2.8 1.6 2.8 2.5 0 1.4-1.8 2-3.4 2-2.3 0-3.5-.3-5.4-1.1l-.8 4.3c1.3.6 3.7 1.1 6.2 1.1 5.7 0 9.4-2.7 9.4-6.9 0-2.3-1.4-4-4.7-5.5-2.2-1-3.5-1.7-3.5-2.8 0-1 .1-2.1 2.4-2.1.9 0 2.6.2 3.8.7l.5-4.4c-1.1-.3-2.6-.5-3.8-.5zm23.1.2h-4.4c-1.4 0-2.4.4-3 1.7L46.8 30.6h6.1l1.2-3.2h7.5l.7 3.2h5.4L61.5 10.1zm-8.8 13.5l2.4-6.3.8 6.3h-3.2zm24.1-13.5l-4.7 20.5h5.8l4.7-20.5h-5.8z" /><path fill="#f79e1b" d="M5.4 10.1L.1 30.6h5.8L11.2 10.1H5.4z" /></svg>
                </button>

                <button 
                  type="button"
                  className={`card-type-box ${newCard.type === 'mastercard' ? 'active' : ''}`}
                  onClick={() => {
                    let finalBank = newCard.bank;
                    if (!['falabella', 'scotiabank', 'interbank'].includes(finalBank)) {
                      finalBank = '';
                    }
                    setNewCard({...newCard, type: 'mastercard', bank: finalBank});
                  }}
                >
                  <svg viewBox="0 0 100 60" width="45" height="27"><circle cx="33" cy="30" r="28" fill="#EB001B" /><circle cx="67" cy="30" r="28" fill="#F79E1B" opacity="0.9" /><path d="M50 8.4A28 28 0 0 1 61.8 30 28 28 0 0 1 50 51.6 28 28 0 0 1 38.2 30 28 28 0 0 1 50 8.4z" fill="#FF5F00" /></svg>
                </button>

                <select 
                  value={newCard.bank} 
                  onChange={(e) => setNewCard({...newCard, bank: e.target.value})}
                  className="bank-select-box"
                >
                  <option value="">Seleccionar banco (opcional)</option>
                  {newCard.type === 'visa' ? (
                    <>
                      <option value="bcp">BCP</option>
                      <option value="bbva">BBVA</option>
                      <option value="interbank">Interbank</option>
                    </>
                  ) : (
                    <>
                      <option value="falabella">Banco Falabella</option>
                      <option value="scotiabank">Scotiabank</option>
                      <option value="interbank">Interbank</option>
                    </>
                  )}
                </select>
              </div>

              <button className="btn-save-card-orange" onClick={() => {
                const rawDigits = newCard.number.replace(/\D/g, '');
                const rawCVV = newCard.cvv.replace(/\D/g, '');
                
                if (!newCard.holder.trim() || !newCard.number || !newCard.expiry || !newCard.cvv) {
                  triggerToast("⚠️ Por favor completa los campos obligatorios", "error");
                  return;
                }
                
                if (newCard.holder.trim().length > 30) {
                  triggerToast("⚠️ El nombre del titular no debe exceder los 30 caracteres", "error");
                  return;
                }
                
                if (rawCVV.length !== 3) {
                  triggerToast("⚠️ El código CVV debe tener exactamente 3 dígitos", "error");
                  return;
                }
                
                if (rawDigits.length !== 16) {
                  triggerToast("⚠️ El número de tarjeta debe tener exactamente 16 dígitos", "error");
                  return;
                }
                
                if (newCard.type === 'visa') {
                  if (!rawDigits.startsWith('4')) {
                    triggerToast("⚠️ El número de tarjeta Visa debe empezar con 4", "error");
                    return;
                  }
                } else if (newCard.type === 'mastercard') {
                  const firstTwo = parseInt(rawDigits.substring(0, 2), 10);
                  const firstFour = parseInt(rawDigits.substring(0, 4), 10);
                  const isMC2 = firstTwo >= 51 && firstTwo <= 55;
                  const isMC4 = firstFour >= 2221 && firstFour <= 2720;
                  if (!isMC2 && !isMC4) {
                    triggerToast("⚠️ El número de tarjeta Mastercard debe empezar con 51-55 o 2221-2720", "error");
                    return;
                  }
                }
                
                const masked = newCard.number.slice(0, -4) + " ****";
                setSavedCards([...savedCards, {...newCard, id: savedCards.length + 1, number: masked}]);
                triggerToast("✅ Tarjeta guardada correctamente", "success");
                setNewCard({type: 'visa', holder: '', number: '', expiry: '', cvv: '', bank: ''});
                setPaymentView('list');
              }}>
                Guardar Tarjeta
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '18px', fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>
                <i className="fa-solid fa-lock" style={{ color: '#10b981' }}></i>
                <span>Encriptación SSL segura de 256 bits</span>
              </div>
            </div>
          )}

          {/* VER MIS TARJETAS */}
          {paymentView === 'list' && (
            <div className="saved-cards-section animate-fade-in">
              <h2>Mis Tarjetas Guardadas ({savedCards.length})</h2>
              <div className="saved-cards-grid">
                {savedCards.map(card => {
                  const getCardBg = (c) => {
                    const b = c.bank ? c.bank.toLowerCase() : '';
                    if (b.includes('falabella')) return 'linear-gradient(135deg, #707a8a, #2e3540)';
                    if (b.includes('bcp')) return 'linear-gradient(135deg, #0f2b5c, #051026)';
                    if (b.includes('interbank')) return 'linear-gradient(135deg, #047857, #10b981)';
                    if (c.type === 'visa') return 'linear-gradient(135deg, #1e3a8a, #3b82f6)';
                    return 'linear-gradient(135deg, #4c1d95, #8b5cf6)'; // mastercard/default
                  };
                  
                  return (
                    <div key={card.id} className="saved-card" style={{ background: getCardBg(card) }}>
                      <div className="card-brand">
                        {card.type === 'visa' ? (
                          <svg viewBox="0 0 120 40" width="55" height="18" style={{ display: 'block' }}><path fill="white" d="M14.6 30.6l3.7-21.2H12.5l-3.7 21.2h5.8zm23.8-20.7c-1.1-.4-2.8-.8-4.9-.8-5.4 0-9.2 2.7-9.2 6.6 0 2.9 2.7 4.5 4.8 5.5 2.1 1 2.8 1.6 2.8 2.5 0 1.4-1.8 2-3.4 2-2.3 0-3.5-.3-5.4-1.1l-.8 4.3c1.3.6 3.7 1.1 6.2 1.1 5.7 0 9.4-2.7 9.4-6.9 0-2.3-1.4-4-4.7-5.5-2.2-1-3.5-1.7-3.5-2.8 0-1 .1-2.1 2.4-2.1.9 0 2.6.2 3.8.7l.5-4.4c-1.1-.3-2.6-.5-3.8-.5zm23.1.2h-4.4c-1.4 0-2.4.4-3 1.7L46.8 30.6h6.1l1.2-3.2h7.5l.7 3.2h5.4L61.5 10.1zm-8.8 13.5l2.4-6.3.8 6.3h-3.2zm24.1-13.5l-4.7 20.5h5.8l4.7-20.5h-5.8z" /><path fill="white" d="M5.4 10.1L.1 30.6h5.8L11.2 10.1H5.4z" opacity="0.9" /></svg>
                        ) : (
                          <svg viewBox="0 0 100 60" width="40" height="24" style={{ display: 'block' }}><circle cx="33" cy="30" r="28" fill="white" opacity="0.8" /><circle cx="67" cy="30" r="28" fill="white" opacity="0.9" /></svg>
                        )}
                      </div>
                      <div className="card-info">
                        <div className="card-number" style={{ letterSpacing: '2px', fontFamily: 'monospace', fontSize: '18px', fontWeight: 'bold' }}>{card.number}</div>
                        <div className="card-holder" style={{ textTransform: 'uppercase', fontSize: '13px', opacity: 0.9, marginTop: '8px' }}>{card.holder}</div>
                        <div className="card-expiry" style={{ fontSize: '12px', opacity: 0.8, marginTop: '2px' }}>
                          {card.expiry} {card.bank && `• ${card.bank.toUpperCase()}`}
                        </div>
                      </div>
                      <button className="delete-card-btn" onClick={() => {
                        if (window.confirm("¿Eliminar esta tarjeta?")) {
                          setSavedCards(savedCards.filter(c => c.id !== card.id));
                          triggerToast("🗑️ Tarjeta eliminada", "info");
                        }
                      }}>🗑</button>
                    </div>
                  );
                })}
              </div>

              {savedCards.length === 0 && (
                <div style={{ textAlign: 'center', padding: '50px 0', color: '#94a3b8' }}>
                  <i className="fa-solid fa-credit-card" style={{ fontSize: '40px', marginBottom: '15px' }}></i>
                  <p style={{ fontSize: '15px' }}>No tienes tarjetas guardadas en este momento.</p>
                </div>
              )}
            </div>
          )}

          {/* VER DESCUENTOS */}
          {paymentView === 'discounts' && (
            <div className="discounts-section animate-fade-in">
              <h2>Descuentos por Tarjeta</h2>
              <p className="discounts-subtitle">Activa descuentos usando tarjetas de estos bancos</p>
              
              <div className="discounts-grid">
                <div className="discount-card">
                  <div className="bank-logo-visual falabella-visual">
                    <span>CMR</span>
                  </div>
                  <div className="discount-info">
                    <strong>Banco Falabella</strong>
                    <span className="discount-rate">S/ 12 OFF</span>
                    <p>En restaurantes seleccionados todos los viernes</p>
                  </div>
                  <button 
                    className="btn-activate-discount"
                    style={{
                      background: activeCouponCode === 'FALABELLA20' ? '#cbd5e1' : '#f97316',
                      color: 'white',
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      cursor: activeCouponCode === 'FALABELLA20' ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      flexShrink: 0
                    }}
                    onClick={() => {
                      setActiveCouponCode("FALABELLA20");
                      setCouponDiscount(12.00);
                      triggerToast("🎟️ Beneficio Falabella Activado: S/ 12.00 de descuento aplicados", "success");
                    }}
                    disabled={activeCouponCode === 'FALABELLA20'}
                  >
                    {activeCouponCode === 'FALABELLA20' ? 'Activado ✓' : 'Activar'}
                  </button>
                </div>

                <div className="discount-card">
                  <div className="bank-logo-visual bcp-visual">
                    <span>BCP</span>
                  </div>
                  <div className="discount-info">
                    <strong>BCP</strong>
                    <span className="discount-rate">ENVÍO GRATIS</span>
                    <p>En pedidos mayores a S/ 50</p>
                  </div>
                  <button 
                    className="btn-activate-discount"
                    style={{
                      background: deliveryCost === 0.00 ? '#cbd5e1' : '#f97316',
                      color: 'white',
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      cursor: deliveryCost === 0.00 ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      flexShrink: 0
                    }}
                    onClick={() => {
                      setDeliveryCost(0.00);
                      triggerToast("🚚 Beneficio BCP Activado: Tarifa de envío reducida a S/ 0.00", "success");
                    }}
                    disabled={deliveryCost === 0.00}
                  >
                    {deliveryCost === 0.00 ? 'Activado ✓' : 'Activar'}
                  </button>
                </div>

                <div className="discount-card">
                  <div className="bank-logo-visual interbank-visual">
                    <span>ib</span>
                  </div>
                  <div className="discount-info">
                    <strong>Interbank</strong>
                    <span className="discount-rate">S/ 10 OFF</span>
                    <p>En tu primer pedido del mes</p>
                  </div>
                  <button 
                    className="btn-activate-discount"
                    style={{
                      background: activeCouponCode === 'INT10' ? '#cbd5e1' : '#f97316',
                      color: 'white',
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: '10px',
                      fontWeight: 'bold',
                      cursor: activeCouponCode === 'INT10' ? 'default' : 'pointer',
                      transition: 'all 0.2s',
                      flexShrink: 0
                    }}
                    onClick={() => {
                      setActiveCouponCode("INT10");
                      setCouponDiscount(10.00);
                      triggerToast("🎟️ Beneficio Interbank Activado: S/ 10.00 de descuento aplicados", "success");
                    }}
                    disabled={activeCouponCode === 'INT10'}
                  >
                    {activeCouponCode === 'INT10' ? 'Activado ✓' : 'Activar'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
