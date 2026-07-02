import React from 'react';

function CheckoutOverlay({
  checkoutStep,
  receiptNumber,
  userName,
  selectedCity,
  cartItems,
  deliveryCost,
  activeCouponCode,
  couponDiscount,
  totalCheckoutPrice,
  handleFinishCheckout
}) {
  if (!checkoutStep) return null;

  return (
    <div className="checkout-overlay">
      <div className="checkout-container-box animate-scale-up">
        
        {checkoutStep === 'processing' && (
          <div className="checkout-step-processing">
            <div className="spinner-loader">
              <div className="spinner-inner"></div>
              <i className="fa-solid fa-credit-card checkout-center-icon"></i>
            </div>
            <h2>Procesando Pago Seguro</h2>
            <p className="pulse-text">Conectando con Pasarela NGR & Banco Emisor...</p>
            <div className="secured-by-badges">
              <span><i className="fa-solid fa-shield-halved"></i> SSL Encrypted</span>
              <span><i className="fa-brands fa-cc-visa"></i> Secured by Visa</span>
            </div>
          </div>
        )}

        {checkoutStep === 'receipt' && (
          <div className="checkout-step-receipt animate-fade-in">
            <div className="success-badge-circle">
              <i className="fa-solid fa-check"></i>
            </div>
            <h2>¡Pago Exitoso!</h2>
            <p className="sub-receipt-text">Tu orden ha sido procesada y enviada a despacho.</p>
            
            {/* Neumorphic Invoice Ticket */}
            <div className="receipt-ticket">
              <div className="ticket-header">
                <h3>BOLETA ELECTRÓNICA</h3>
                <span>{receiptNumber || 'NGR-2026-9999'}</span>
              </div>
              
              <div className="ticket-divider"></div>
              
              <div className="ticket-details">
                <div className="t-row"><span>Cliente:</span><strong>{userName}</strong></div>
                <div className="t-row"><span>Ciudad:</span><strong>{selectedCity}</strong></div>
                <div className="t-row"><span>Método:</span><strong>Visa / Pago 1-Click</strong></div>
                <div className="t-row"><span>Fecha:</span><strong>{new Date().toLocaleString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}</strong></div>
              </div>
              
              <div className="ticket-divider"></div>
              
              <div className="ticket-items-list font-mono">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="ticket-item-row">
                    <span>{item.quantity}x {item.name}</span>
                    <strong>S/ {(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                ))}
                <div className="ticket-item-row shipping-row-ticket">
                  <span>Delivery Sincronizado</span>
                  <strong>{deliveryCost === 0 ? "Gratis" : `S/ ${deliveryCost.toFixed(2)}`}</strong>
                </div>
                {activeCouponCode && (
                  <div className="ticket-item-row" style={{ color: '#10b981', fontWeight: '600' }}>
                    <span>Cupón Descuento Retro</span>
                    <strong>- S/ {couponDiscount.toFixed(2)}</strong>
                  </div>
                )}
              </div>
              
              <div className="ticket-divider"></div>
              
              <div className="ticket-total-row">
                <span>Total Pagado:</span>
                <strong>S/ {totalCheckoutPrice.toFixed(2)}</strong>
              </div>
            </div>

            <div className="gps-live-hint">
              <i className="fa-solid fa-truck-ramp-box text-orange"></i>
              <div>
                <strong>Rastreador GPS Activo</strong>
                <p>Puedes seguir el avance en el Kanban y mapa del motorizado.</p>
              </div>
            </div>

            <button className="btn-finish-checkout animate-pulse-slow" onClick={handleFinishCheckout}>
              Cerrar y Seguir Comprando
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default CheckoutOverlay;
