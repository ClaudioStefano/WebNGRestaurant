import React from 'react';

function CartDrawer({
  showCartDrawer,
  setShowCartDrawer,
  cartItems,
  productsList,
  handleAddCartItem,
  handleDecreaseQty,
  handleIncreaseQty,
  handleRemoveCartItem,
  totalItemsPrice,
  deliveryCost,
  activeCouponCode,
  couponDiscount,
  totalCheckoutPrice,
  handleCheckout
}) {
  if (!showCartDrawer) return null;

  return (
    <div className="cart-drawer-overlay" onClick={() => setShowCartDrawer(false)}>
      <div className="cart-drawer-box animate-slide" onClick={(e) => e.stopPropagation()}>
        
        <div className="cart-drawer-header">
          <h3><i className="fa-solid fa-cart-shopping text-orange"></i> Mi Carrito NGR</h3>
          <button className="close-cart-drawer" onClick={() => setShowCartDrawer(false)}>✕</button>
        </div>

        {/* List of items added */}
        <div className="cart-drawer-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <i className="fa-solid fa-basket-shopping"></i>
              <p>Tu carrito está vacío.</p>
              <span>¡Explora las marcas de NGR y añade tus antojos favoritos!</span>
            </div>
          ) : (
            <div className="cart-items-scroll-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-drawer-item">
                  <img src={item.img} alt={item.name} />
                  <div className="cart-item-meta">
                    <h4>{item.name}</h4>
                    <span className="cart-item-price-unit">S/ {item.price.toFixed(2)}</span>
                    
                    <div className="cart-qty-selectors">
                      <button className="btn-qty" onClick={() => handleDecreaseQty(item.id)}>-</button>
                      <span className="qty-number">{item.quantity}</span>
                      <button className="btn-qty" onClick={() => handleIncreaseQty(item.id)}>+</button>
                    </div>
                  </div>

                  <div className="cart-item-right-block">
                    <strong className="cart-item-subtotal">S/ {(item.price * item.quantity).toFixed(2)}</strong>
                    <button className="btn-cart-remove" onClick={() => handleRemoveCartItem(item.id)} title="Eliminar plato">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}

              {/* AI Cart Cross-selling recommendation */}
              <div className="ai-cart-recommendation">
                <div className="ai-cart-rec-header">
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  <span>Sugerencia Inteligente IA</span>
                </div>
                <p>Completa tu pedido y obtén envío 100% gratis añadiendo:</p>
                <div className="ai-cart-rec-row">
                  <span>🍩 <b>Donut Box (Dunkin)</b> - S/ 18.90</span>
                  <button className="btn-add-rec-cart" onClick={() => {
                    const donutProd = productsList.find(p => p.id === 11);
                    if (donutProd) {
                      handleAddCartItem(donutProd);
                    }
                  }}>+ Agregar</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BILLING SUMMARY & CHECKOUT BUTTON */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="billing-row">
              <span>Subtotal de Platos</span>
              <strong>S/ {totalItemsPrice.toFixed(2)}</strong>
            </div>
            <div className="billing-row">
              <span>Tarifa de Delivery (Sincronizada)</span>
              <strong>{deliveryCost === 0 ? "Gratis" : `S/ ${deliveryCost.toFixed(2)}`}</strong>
            </div>
            {activeCouponCode && (
              <div className="billing-row coupon-billing-row" style={{ color: '#10b981', fontWeight: '600' }}>
                <span><i className="fa-solid fa-tag"></i> Descuento Retro ({activeCouponCode})</span>
                <strong>- S/ {couponDiscount.toFixed(2)}</strong>
              </div>
            )}
            <div className="billing-row total-billing-row">
              <span>Total a Pagar</span>
              <strong className="total-billing-val">S/ {totalCheckoutPrice.toFixed(2)}</strong>
            </div>

            <button className="btn-confirm-checkout" onClick={handleCheckout}>
              <i className="fa-solid fa-credit-card"></i> Confirmar y Pagar (Checkout)
            </button>
            <span className="billing-disclaimer">
              Sincronizado con la pasarela de cobros segura de NGR Platform.
            </span>
          </div>
        )}

      </div>
    </div>
  );
}

export default CartDrawer;
