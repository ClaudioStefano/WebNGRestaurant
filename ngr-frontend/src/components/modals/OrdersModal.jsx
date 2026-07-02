import React from 'react';

function OrdersModal({
  showOrdersModal,
  setShowOrdersModal,
  ordersList,
  handleReorder
}) {
  if (!showOrdersModal) return null;

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal-box animate-fade" style={{ maxWidth: '650px' }}>
        <button className="close-profile-modal" onClick={() => setShowOrdersModal(false)}>✕</button>
        
        <div className="profile-header-meta">
          <div className="profile-avatar-big" style={{ background: 'linear-gradient(135deg, #f97316, #ea580c)' }}>
            <i className="fa-solid fa-receipt"></i>
          </div>
          <div>
            <h2>Mis Pedidos Recientes</h2>
            <span className="loyalty-badge-gold" style={{ background: '#fff7ed', color: '#ea580c', border: '1px solid rgba(234, 88, 12, 0.15)' }}>
              <i className="fa-solid fa-clock-rotate-left"></i> {ordersList.length} Pedidos Registrados
            </span>
          </div>
        </div>

        <p className="panel-sub" style={{ marginTop: '-15px' }}>
          Realiza el seguimiento de tus pedidos activos de marcas NGR en tiempo real o vuelve a pedir tus combinaciones favoritas con un solo clic.
        </p>

        <div className="favorites-scroll-list" style={{ maxHeight: '400px' }}>
          {ordersList.map(order => (
            <div key={order.id} className="history-row-item fav-row-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '10px', background: 'white', border: '1px solid #e2e8f0', padding: '15px' }}>
              
              {/* Order header row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                <div>
                  <strong style={{ fontSize: '15px', color: '#1e293b' }}>{order.id}</strong>
                  <span style={{ fontSize: '12px', color: '#64748b', marginLeft: '10px' }}>{order.date}</span>
                </div>
                <span style={{
                  background: order.statusColor + '15',
                  color: order.statusColor,
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '11.5px',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <span className={order.status === 'En preparación' ? 'status-dot-pulsing' : ''} style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: order.statusColor,
                    display: 'inline-block'
                  }}></span>
                  {order.status}
                </span>
              </div>

              {/* Order Brand & items row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '5px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#475569', background: '#f8fafc', padding: '2px 8px', borderRadius: '4px' }}>
                      {order.brand}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {order.items.map((item, idx) => (
                      <div key={idx} style={{ fontSize: '13px', color: '#334155' }}>
                        <span style={{ fontWeight: '600', color: '#ff6b00' }}>{item.quantity}x</span> {item.name} <span style={{ color: '#94a3b8', fontSize: '11px' }}>(S/ {item.price.toFixed(2)} c/u)</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Reorder and details block */}
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Monto total</span>
                  <strong style={{ fontSize: '16px', color: '#1e293b', display: 'block', margin: '2px 0 6px 0' }}>S/ {order.total.toFixed(2)}</strong>
                  <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginBottom: '8px' }}>
                    <i className="fa-solid fa-wallet" style={{ marginRight: '4px' }}></i> {order.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Order Footer Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '8px', marginTop: '4px' }}>
                <button
                  onClick={() => alert(`🚚 Estado del envío: Tu pedido ${order.id} se encuentra ${order.status.toLowerCase()}.`)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #cbd5e1',
                    color: '#475569',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <i className="fa-solid fa-truck-ramp-box" style={{ marginRight: '4px' }}></i> Rastrear
                </button>
                <button
                  onClick={() => handleReorder(order)}
                  style={{
                    background: '#ff6b00',
                    border: 'none',
                    color: 'white',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <i className="fa-solid fa-arrow-rotate-left" style={{ marginRight: '4px' }}></i> Repetir Pedido
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default OrdersModal;
