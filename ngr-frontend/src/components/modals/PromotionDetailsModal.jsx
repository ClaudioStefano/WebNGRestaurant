import React from 'react';

function PromotionDetailsModal({
  selectedPromotion,
  setSelectedPromotion,
  productsList,
  setCartItems,
  setDeliveryCost,
  setActiveCouponCode,
  setCouponDiscount,
  triggerToast,
  setShowCartDrawer
}) {
  if (!selectedPromotion) return null;

  const handleAddBembosPromo = () => {
    const promoItem = {
      id: 101,
      name: "Dupla Bembos 2x1 XL (Promo)",
      price: 24.90,
      brand: "Bembos",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600",
      desc: "2x Cheese Burger XL + 2 Papas Fritas por S/ 24.90.",
      quantity: 1
    };
    setCartItems(prev => {
      const exists = prev.find(item => item.id === promoItem.id);
      if (exists) {
        return prev.map(item => item.id === promoItem.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, promoItem];
    });
    setDeliveryCost(0.00); // 2x1 promo also includes free delivery!
    triggerToast("🍔🍔 ¡Dupla Bembos 2x1 XL agregada con Delivery Gratis!", "success");
    setSelectedPromotion(null);
    setShowCartDrawer(true);
  };

  const handleActivateYapePromo = () => {
    setActiveCouponCode("YAPE15");
    setCouponDiscount(15.00);
    triggerToast("📱 ¡Descuento Yape de S/ 15.00 activado en tu carrito!", "success");
    setSelectedPromotion(null);
    setShowCartDrawer(true);
  };

  const handleActivateFreeDelivery = () => {
    setDeliveryCost(0.00);
    triggerToast("🚚 ¡Delivery Gratuito activado en tu orden actual!", "success");
    setSelectedPromotion(null);
    setShowCartDrawer(true);
  };

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal-box animate-scale-up" style={{ maxWidth: '500px', width: '90%' }}>
        <button className="close-profile-modal" onClick={() => setSelectedPromotion(null)}>✕</button>
        
        <div className="brand-page-hero" style={{ 
          backgroundImage: `url(${selectedPromotion.id === 1 ? 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600' : selectedPromotion.id === 2 ? 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600' : 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '160px',
          borderRadius: '20px',
          position: 'relative',
          marginBottom: '20px',
          overflow: 'hidden'
        }}>
          <div className="brand-hero-overlay" style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3))'
          }}></div>
          
          <div style={{
            position: 'absolute',
            bottom: '15px',
            left: '20px',
            color: 'white'
          }}>
            <span style={{ fontSize: '10px', background: '#ff6b00', color: 'white', padding: '3px 8px', borderRadius: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Promoción Exclusiva NGR
            </span>
            <h2 style={{ fontSize: '22px', fontWeight: '800', margin: '5px 0 0 0', color: 'white' }}>{selectedPromotion.title}</h2>
          </div>
        </div>

        <div className="profile-section-block" style={{ paddingBottom: '15px', borderBottom: '1px solid #edf2f7', marginBottom: '15px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#ff6b00', textTransform: 'uppercase', marginBottom: '6px' }}>
            <i className="fa-solid fa-circle-info" style={{ marginRight: '6px' }}></i> Detalles de la Oferta
          </h3>
          <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#475569', margin: 0 }}>
            {selectedPromotion.id === 1 && "¡Disfruta del sabor inconfundible al carbón de Bembos! Por la compra de 1 Cheese Burger XL o hamburguesa clásica, llévate la segunda totalmente gratis. Además, esta promoción incluye delivery sin costo alguno, directo a tu mesa."}
            {selectedPromotion.id === 2 && "Ahorra al instante pagando con tus billeteras digitales preferidas. Con Yape o Plin, obtén S/ 15.00 de descuento inmediato en cualquier compra mayor a S/ 40.00 en cualquiera de nuestras marcas asociadas."}
            {selectedPromotion.id === 3 && "Olvídate del costo de envío. Si realizas un pedido de Popeyes o Papa Johns hoy, NGR asume el 100% de la tarifa de delivery. ¡Disfruta de tus pizzas y piezas crujientes cajún calientitas al mismo precio de salón!"}
          </p>
        </div>

        {/* Included products / conditions */}
        <div className="profile-section-block" style={{ paddingBottom: '20px', borderBottom: '1px solid #edf2f7', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#ff6b00', textTransform: 'uppercase', marginBottom: '10px' }}>
            <i className="fa-solid fa-list-check" style={{ marginRight: '6px' }}></i> ¿Qué incluye esta promoción?
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedPromotion.id === 1 && (
              <>
                <div style={{ display: 'flex', gap: '10px', fontSize: '12.5px', color: '#475569' }}>
                  <span>🍔</span> <span>2x Hamburguesas Cheese Burger XL al Carbón</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '12.5px', color: '#475569' }}>
                  <span>🍟</span> <span>2x Porciones de Papas Fritas Familiares</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '12.5px', color: '#475569' }}>
                  <span>🚚</span> <span>Envío a Domicilio 100% Gratuito</span>
                </div>
              </>
            )}
            {selectedPromotion.id === 2 && (
              <>
                <div style={{ display: 'flex', gap: '10px', fontSize: '12.5px', color: '#475569' }}>
                  <span>📱</span> <span>Descuento de S/ 15.00 Aplicado al Instante</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '12.5px', color: '#475569' }}>
                  <span>💳</span> <span>Pago Seguro con Código QR Yape / Plin</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '12.5px', color: '#475569' }}>
                  <span>🎯</span> <span>Válido para toda la carta NGR que supere los S/ 40.00</span>
                </div>
              </>
            )}
            {selectedPromotion.id === 3 && (
              <>
                <div style={{ display: 'flex', gap: '10px', fontSize: '12.5px', color: '#475569' }}>
                  <span>🚚</span> <span>Delivery S/ 0.00 en Popeyes y Papa Johns</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '12.5px', color: '#475569' }}>
                  <span>🍕</span> <span>Válido para Pizzas Familiares y Combos Crujientes</span>
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '12.5px', color: '#475569' }}>
                  <span>⏰</span> <span>Disponible para envíos programados o inmediatos</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action button inside promotion modal */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {selectedPromotion.id === 1 && (
            <button 
              className="btn-confirm-checkout" 
              style={{ flex: 1, padding: '14px', fontSize: '13px' }}
              onClick={handleAddBembosPromo}
            >
              Añadir Dúo 2x1 al Carrito (S/ 24.90) 🍔🍔
            </button>
          )}
          
          {selectedPromotion.id === 2 && (
            <button 
              className="btn-confirm-checkout" 
              style={{ flex: 1, padding: '14px', fontSize: '13px', background: 'linear-gradient(135deg, #00c853, #009624)' }}
              onClick={handleActivateYapePromo}
            >
              Activar Descuento Yape de S/ 15.00 📱
            </button>
          )}

          {selectedPromotion.id === 3 && (
            <button 
              className="btn-confirm-checkout" 
              style={{ flex: 1, padding: '14px', fontSize: '13px', background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}
              onClick={handleActivateFreeDelivery}
            >
              Activar Delivery Gratis 🚚
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default PromotionDetailsModal;
