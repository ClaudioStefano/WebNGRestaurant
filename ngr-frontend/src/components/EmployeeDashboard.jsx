import React, { useState, useEffect } from 'react';
import './EmployeeDashboard.css';

// Active orders for the real-time Kanban flow
const INITIAL_ORDERS = [
  {
    id: "NGR-9081",
    client: "Alessandra Suarez",
    brand: "Bembos",
    items: "2x Cheese Burger XL + Papas Grandes",
    total: 58.70,
    time: "Hace 5 mins",
    status: "En Cola" // "En Cola" | "En Cocina" | "Listo" | "En Camino"
  },
  {
    id: "NGR-9082",
    client: "Juan Perez",
    brand: "Papa Johns",
    items: "1x Pizza Pepperoni Familiar + Gaseosa 1.5L",
    total: 49.90,
    time: "Hace 12 mins",
    status: "En Cocina"
  },
  {
    id: "NGR-9083",
    client: "Carlos Mendoza",
    brand: "Popeyes",
    items: "1x Combo Popeyes Familiar (6 piezas)",
    total: 62.50,
    time: "Hace 20 mins",
    status: "Listo"
  },
  {
    id: "NGR-9084",
    client: "Maria Delgado",
    brand: "Dunkin",
    items: "1x Donut Box de 12 unidades surtidas",
    total: 35.80,
    time: "Hace 45 mins",
    status: "En Camino"
  }
];

// Platos populares asociados a cada marca de NGR
const POPULAR_DISHES = [
  { name: "Cheese Burger XL", brand: "Bembos", qty: 45, price: "S/ 24.90", icon: "🍔" },
  { name: "Bembos Clásica", brand: "Bembos", qty: 38, price: "S/ 26.90", icon: "🍔" },
  { name: "Pepperoni Pizza", brand: "Papa Johns", qty: 32, price: "S/ 39.90", icon: "🍕" },
  { name: "Pizza Suprema", brand: "Papa Johns", qty: 25, price: "S/ 42.90", icon: "🍕" },
  { name: "Combo Popeyes", brand: "Popeyes", qty: 28, price: "S/ 28.90", icon: "🍗" },
  { name: "Donut Box", brand: "Dunkin", qty: 42, price: "S/ 18.90", icon: "🍩" },
  { name: "Cheesecake Oreo", brand: "Dunkin", qty: 19, price: "S/ 16.90", icon: "🍰" },
  { name: "Pollo Crunch", brand: "Don Belisario", qty: 15, price: "S/ 31.50", icon: "🍗" },
  { name: "Arroz Chaufa Wok", brand: "China Wok", qty: 12, price: "S/ 22.90", icon: "🥡" }
];

function EmployeeDashboard({ userName, statusText, onLogout, productsList, setProductsList }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'inventory' | 'reports'
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Interactive Innovations
  const [selectedBrandFilter, setSelectedBrandFilter] = useState(null); // Filter popular dishes by clicking brand chart
  const [radarMotorizados, setRadarMotorizados] = useState([
    { id: 1, name: "Motorizado Bembos M1", x: 120, y: 80, active: true },
    { id: 2, name: "Motorizado Dunkin D4", x: 60, y: 150, active: true },
    { id: 3, name: "Motorizado Popeyes P2", x: 210, y: 110, active: true }
  ]);

  // Quick Edit Price Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newPrice, setNewPrice] = useState('');

  // Brand Distribution data (including Dunkin)
  // Bembos (32%), Papa Johns (22%), Popeyes (16%), Dunkin (14%), Don Belisario (10%), China Wok (6%) = 100%
  const brandData = [
    { name: 'Bembos', pct: 32, color: '#ff6b00', sales: 'S/ 1,542.56', offset: 0 },
    { name: 'Papa Johns', pct: 22, color: '#d62828', sales: 'S/ 1,060.51', offset: 32 },
    { name: 'Popeyes', pct: 16, color: '#ffc107', sales: 'S/ 771.28', offset: 54 },
    { name: 'Dunkin', pct: 14, color: '#ec4899', sales: 'S/ 674.87', offset: 70 },
    { name: 'Don Belisario', pct: 10, color: '#8d6e63', sales: 'S/ 482.05', offset: 84 },
    { name: 'China Wok', pct: 6, color: '#10b981', sales: 'S/ 289.23', offset: 94 }
  ];

  // Auto simulate new order incoming after 12 seconds to make the UI feel alive!
  useEffect(() => {
    const timer = setTimeout(() => {
      const newOrder = {
        id: "NGR-9085",
        client: "Daniel Alva",
        brand: "China Wok",
        items: "1x Combo China Wok Dupla (Arroz Chaufa + Wantan)",
        total: 39.90,
        time: "Recién ingresado",
        status: "En Cola"
      };
      setOrders(prev => [newOrder, ...prev]);
      triggerToast("🔔 ¡Nuevo pedido recibido! Código: NGR-9085");
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  // Animate GPS Radar motorizados occasionally
  useEffect(() => {
    const interval = setInterval(() => {
      setRadarMotorizados(prev => 
        prev.map(m => ({
          ...m,
          x: Math.max(20, Math.min(260, m.x + (Math.random() * 20 - 10))),
          y: Math.max(20, Math.min(180, m.y + (Math.random() * 20 - 10)))
        }))
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  // Move order status flow in Kanban columns
  const advanceOrderStatus = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.id === orderId) {
          let nextStatus = order.status;
          if (order.status === "En Cola") {
            nextStatus = "En Cocina";
            triggerToast(`🍳 Comanda ${order.id} ingresó a preparación en Cocina.`);
          } else if (order.status === "En Cocina") {
            nextStatus = "Listo";
            triggerToast(`📦 Comanda ${order.id} empaquetada. ¡Lista para Enviar!`);
          } else if (order.status === "Listo") {
            nextStatus = "En Camino";
            triggerToast(`🛵 Pedido ${order.id} asignado al Courier y en camino.`);
          } else if (order.status === "En Camino") {
            nextStatus = "Entregado";
            triggerToast(`✅ Pedido ${order.id} entregado con éxito al cliente.`);
          }
          return { ...order, status: nextStatus };
        }
        return order;
      }).filter(order => order.status !== "Entregado") // Remove from active once delivered
    );
  };

  // Dragback or Cancel comanda
  const cancelOrder = (orderId) => {
    if (window.confirm(`¿Estás seguro de que deseas cancelar la comanda ${orderId}?`)) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
      triggerToast(`❌ Comanda ${orderId} cancelada.`);
    }
  };

  // Toggle availability of items
  const toggleProductStatus = (productId) => {
    setProductsList(prev => 
      prev.map(p => {
        if (p.id === productId) {
          const updatedState = !p.isOutOfStock;
          triggerToast(`📦 "${p.name}" ahora está ${updatedState ? 'Agotado 🛑' : 'Disponible ✅'}.`);
          return { ...p, isOutOfStock: updatedState };
        }
        return p;
      })
    );
  };

  // Open Edit Price modal
  const openEditPriceModal = (product) => {
    setSelectedProduct(product);
    setNewPrice(product.price.toString());
    setShowEditModal(true);
  };

  // Save New Price
  const saveProductPrice = (e) => {
    e.preventDefault();
    if (!selectedProduct || isNaN(newPrice) || parseFloat(newPrice) <= 0) return;
    
    setProductsList(prev => 
      prev.map(p => {
        if (p.id === selectedProduct.id) {
          return { ...p, price: parseFloat(newPrice) };
        }
        return p;
      })
    );
    triggerToast(`💰 Precio de "${selectedProduct.name}" actualizado a S/ ${parseFloat(newPrice).toFixed(2)}`);
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  // Filter popular dishes by selected brand clicked on chart
  const filteredPopularDishes = selectedBrandFilter
    ? POPULAR_DISHES.filter(d => d.brand.toLowerCase() === selectedBrandFilter.toLowerCase())
    : POPULAR_DISHES;

  return (
    <div className="dashboard-container">
      
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">NGR</div>
          <span>SOA Platform</span>
        </div>

        <div className="employee-profile-card">
          <div className="employee-avatar">
            <i className="fa-solid fa-user-gear"></i>
          </div>
          <div className="employee-meta">
            <h4>{userName}</h4>
            <div className="active-badge">
              <span className="dot"></span>
              {statusText}
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <i className="fa-solid fa-chart-pie"></i>
            <span>Vista General</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <i className="fa-solid fa-bell-concierge"></i>
            <span>Pedidos Activos</span>
            {orders.filter(o => o.status === 'En Cola').length > 0 && (
              <span className="badge-alert">
                {orders.filter(o => o.status === 'En Cola').length}
              </span>
            )}
          </button>
          <button 
            className={`nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <i className="fa-solid fa-utensils"></i>
            <span>Gestión de Menú</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <i className="fa-solid fa-circle-dollar-to-slot"></i>
            <span>Ingresos y Reportes</span>
          </button>
        </nav>

        <button className="sidebar-logout" onClick={onLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Cerrar Sesión</span>
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-main">
        
        {/* HEADER */}
        <header className="dashboard-header">
          <div className="header-title">
            <h1>
              {activeTab === 'overview' && 'Vista General de Operaciones'}
              {activeTab === 'orders' && 'Flujo Kanban de Comandas'}
              {activeTab === 'inventory' && 'Administración del Menú'}
              {activeTab === 'reports' && 'Analítica Financiera NGR'}
            </h1>
            <p>Plataforma Multi-Marca Integrada (Bembos, Dunkin, Papa Johns, Popeyes...)</p>
          </div>

          <div className="header-actions">
            <div className="header-time">
              <i className="fa-solid fa-clock-rotate-left"></i>
              <span>Turno Operaciones: 24/05/2026</span>
            </div>
            
            <div className="header-notif" onClick={() => triggerToast("📢 Servidor NGR centralizado: Online y sincronizado.")}>
              <i className="fa-solid fa-bell"></i>
              <span className="notif-badge"></span>
            </div>
          </div>
        </header>

        {/* VIEW CONTENTS */}
        
        {/* 1. OVERVIEW VIEW */}
        {activeTab === 'overview' && (
          <div className="tab-content overview-tab animate-fade">
            
            {/* STAT CARDS */}
            <div className="stat-cards-grid">
              <div className="stat-card gold-grad">
                <div className="card-top">
                  <span className="card-label">Facturación Turno (NGR)</span>
                  <div className="card-icon"><i className="fa-solid fa-coins"></i></div>
                </div>
                <h2>S/ 4,820.50</h2>
                <span className="card-subtext"><i className="fa-solid fa-arrow-trend-up"></i> +14.2% vs ayer</span>
              </div>

              <div className="stat-card orange-grad">
                <div className="card-top">
                  <span className="card-label">Nuevas Comandas</span>
                  <div className="card-icon"><i className="fa-solid fa-hourglass-half"></i></div>
                </div>
                <h2>{orders.filter(o => o.status === "En Cola").length} pedidos</h2>
                <span className="card-subtext"><i className="fa-solid fa-triangle-exclamation"></i> En cola de despacho</span>
              </div>

              <div className="stat-card red-grad">
                <div className="card-top">
                  <span className="card-label font-bold">En Cocina Activa</span>
                  <div className="card-icon"><i className="fa-solid fa-fire-burner"></i></div>
                </div>
                <h2>{orders.filter(o => o.status === "En Cocina").length} órdenes</h2>
                <span className="card-subtext"><i className="fa-solid fa-kitchen-set"></i> Preparación en paralelo</span>
              </div>

              <div className="stat-card blue-grad">
                <div className="card-top">
                  <span className="card-label">Motorizados en Ruta</span>
                  <div className="card-icon"><i className="fa-solid fa-truck-fast"></i></div>
                </div>
                <h2>{orders.filter(o => o.status === "En Camino").length + 3} activos</h2>
                <span className="card-subtext"><i className="fa-solid fa-circle-check"></i> Radar GPS en funcionamiento</span>
              </div>
            </div>

            {/* THREE COLUMN INNOVATION SECTION */}
            <div className="overview-three-split">
              
              {/* BRAND CHART DONUT SVG */}
              <div className="chart-panel card-panel">
                <div className="chart-panel-header">
                  <h3>Ventas NGR por Marca</h3>
                  {selectedBrandFilter && (
                    <button className="clear-filter-btn" onClick={() => setSelectedBrandFilter(null)}>
                      Ver Todos <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  )}
                </div>
                <p className="panel-sub">Haz clic en una marca para filtrar sus platos más vendidos en el panel contiguo</p>
                
                <div className="donut-flex-container">
                  <div className="donut-chart-box">
                    <svg width="180" height="180" viewBox="0 0 42 42" className="donut-svg">
                      <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f1f5f9" strokeWidth="4.2"></circle>
                      
                      {brandData.map((b, i) => {
                        const strokeDash = `${b.pct} ${100 - b.pct}`;
                        const strokeOffset = 100 - b.offset + 25; // +25 to start at 12 o'clock
                        return (
                          <circle
                            key={b.name}
                            cx="21"
                            cy="21"
                            r="15.915"
                            fill="transparent"
                            stroke={b.color}
                            strokeWidth="4.5"
                            strokeDasharray={strokeDash}
                            strokeDashoffset={strokeOffset}
                            className={`donut-segment ${selectedBrandFilter === b.name ? 'active-segment' : ''}`}
                            onClick={() => {
                              setSelectedBrandFilter(b.name === selectedBrandFilter ? null : b.name);
                              triggerToast(`🔎 Filtrando platos de ${b.name}`);
                            }}
                            style={{ cursor: 'pointer', transition: 'stroke-width 0.2s' }}
                          />
                        );
                      })}
                      
                      <g className="donut-center-text">
                        <text x="50%" y="46%" className="donut-num">100%</text>
                        <text x="50%" y="62%" className="donut-label">NGR total</text>
                      </g>
                    </svg>
                  </div>

                  <div className="brand-legends">
                    {brandData.map(b => (
                      <div 
                        key={b.name} 
                        className={`legend-item ${selectedBrandFilter === b.name ? 'highlighted-legend' : ''}`}
                        onClick={() => setSelectedBrandFilter(b.name === selectedBrandFilter ? null : b.name)}
                      >
                        <span className="legend-dot" style={{ backgroundColor: b.color }}></span>
                        <span className="legend-name"><b>{b.name}</b> ({b.pct}%)</span>
                        <span className="legend-sales">{b.sales}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* DYNAMIC POPULAR PRODUCTS (FILTERED BY CLICKING CHART) */}
              <div className="popular-panel card-panel">
                <div className="panel-header-flex-inline">
                  <h3>
                    Platos Populares 
                    {selectedBrandFilter ? ` (${selectedBrandFilter})` : ' (Global)'}
                  </h3>
                  <span className="dish-count-badge">{filteredPopularDishes.length} items</span>
                </div>
                <p className="panel-sub">Actualizado dinámicamente según la marca seleccionada</p>
                <div className="popular-list">
                  {filteredPopularDishes.map((p, idx) => (
                    <div key={idx} className="popular-item">
                      <div className="pop-icon-box">{p.icon}</div>
                      <div className="pop-details">
                        <h4>{p.name}</h4>
                        <span className="brand-label-tag" style={{
                          backgroundColor: brandData.find(b => b.name === p.brand)?.color + '20',
                          color: brandData.find(b => b.name === p.brand)?.color
                        }}>
                          {p.brand}
                        </span>
                      </div>
                      <div className="pop-stats">
                        <span className="pop-qty">{p.qty} comanda{p.qty > 1 ? 's' : ''}</span>
                        <span className="pop-price">{p.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* LIVE DISPATCH RADAR */}
              <div className="radar-panel card-panel">
                <h3>Radar GPS de Repartidores</h3>
                <p className="panel-sub">Monitoreo en vivo de motorizados asignados a NGR</p>
                
                <div className="radar-screen">
                  <div className="radar-sweep"></div>
                  <div className="radar-circle circle-1"></div>
                  <div className="radar-circle circle-2"></div>
                  <div className="radar-circle circle-3"></div>
                  <div className="radar-axis-x"></div>
                  <div className="radar-axis-y"></div>

                  {radarMotorizados.map(motorizado => (
                    <div 
                      key={motorizado.id}
                      className="radar-blip"
                      style={{ left: `${motorizado.x}px`, top: `${motorizado.y}px` }}
                      title={motorizado.name}
                      onClick={() => triggerToast(`🛵 ${motorizado.name} en ruta activa.`)}
                    >
                      <span className="blip-core"></span>
                      <span className="blip-wave"></span>
                      <span className="blip-label">{motorizado.name.split(' ')[1]}</span>
                    </div>
                  ))}
                </div>

                <div className="radar-meta-info">
                  <div className="meta-row">
                    <span className="radar-dot-active green-pulse"></span>
                    <span>3 Unidades en Tránsito Exitoso</span>
                  </div>
                  <div className="meta-row">
                    <i className="fa-solid fa-compass text-neon-blue"></i>
                    <span>Tiempos de entrega promedio: 22 minutos</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. KANBAN ORDERS VIEW */}
        {activeTab === 'orders' && (
          <div className="tab-content orders-tab animate-fade">
            
            {/* KANBAN BOARD */}
            <div className="kanban-board">
              
              {/* COLUMN 1: EN COLA */}
              <div className="kanban-column column-encola">
                <div className="column-header">
                  <span className="col-indicator orange-bg"></span>
                  <h3>En Cola</h3>
                  <span className="col-count">{orders.filter(o => o.status === "En Cola").length}</span>
                </div>
                
                <div className="kanban-cards-container">
                  {orders.filter(o => o.status === "En Cola").map(order => (
                    <KanbanCard 
                      key={order.id} 
                      order={order} 
                      onAdvance={() => advanceOrderStatus(order.id)} 
                      onCancel={() => cancelOrder(order.id)}
                    />
                  ))}
                  {orders.filter(o => o.status === "En Cola").length === 0 && (
                    <div className="kanban-empty-state">No hay pedidos pendientes.</div>
                  )}
                </div>
              </div>

              {/* COLUMN 2: EN COCINA */}
              <div className="kanban-column column-encocina">
                <div className="column-header">
                  <span className="col-indicator red-bg"></span>
                  <h3>En Cocina</h3>
                  <span className="col-count">{orders.filter(o => o.status === "En Cocina").length}</span>
                </div>

                <div className="kanban-cards-container">
                  {orders.filter(o => o.status === "En Cocina").map(order => (
                    <KanbanCard 
                      key={order.id} 
                      order={order} 
                      onAdvance={() => advanceOrderStatus(order.id)} 
                      onCancel={() => cancelOrder(order.id)}
                    />
                  ))}
                  {orders.filter(o => o.status === "En Cocina").length === 0 && (
                    <div className="kanban-empty-state">Cocina libre de pedidos.</div>
                  )}
                </div>
              </div>

              {/* COLUMN 3: LISTO */}
              <div className="kanban-column column-listo">
                <div className="column-header">
                  <span className="col-indicator green-bg"></span>
                  <h3>Listo para Despacho</h3>
                  <span className="col-count">{orders.filter(o => o.status === "Listo").length}</span>
                </div>

                <div className="kanban-cards-container">
                  {orders.filter(o => o.status === "Listo").map(order => (
                    <KanbanCard 
                      key={order.id} 
                      order={order} 
                      onAdvance={() => advanceOrderStatus(order.id)} 
                      onCancel={() => cancelOrder(order.id)}
                    />
                  ))}
                  {orders.filter(o => o.status === "Listo").length === 0 && (
                    <div className="kanban-empty-state">Sin pedidos listos por enviar.</div>
                  )}
                </div>
              </div>

              {/* COLUMN 4: EN CAMINO */}
              <div className="kanban-column column-encamino">
                <div className="column-header">
                  <span className="col-indicator blue-bg"></span>
                  <h3>En Camino</h3>
                  <span className="col-count">{orders.filter(o => o.status === "En Camino").length}</span>
                </div>

                <div className="kanban-cards-container">
                  {orders.filter(o => o.status === "En Camino").map(order => (
                    <KanbanCard 
                      key={order.id} 
                      order={order} 
                      onAdvance={() => advanceOrderStatus(order.id)} 
                      onCancel={() => cancelOrder(order.id)}
                    />
                  ))}
                  {orders.filter(o => o.status === "En Camino").length === 0 && (
                    <div className="kanban-empty-state">No hay despachos en curso.</div>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 3. INVENTORY VIEW */}
        {activeTab === 'inventory' && (
          <div className="tab-content inventory-tab animate-fade">
            <div className="card-panel">
              <div className="panel-header-flex">
                <div>
                  <h3>Catálogo General & Disponibilidades</h3>
                  <p className="panel-sub">Filtra y cambia los precios y disponibilidad de los platos de todas las marcas de NGR.</p>
                </div>
                <div className="panel-actions">
                  <span className="stock-info-tag">
                    💡 Al marcar un plato como <b>Agotado</b> se deshabilitará del catálogo de compras al instante.
                  </span>
                </div>
              </div>

              <div className="inventory-table-container">
                <table className="inventory-table">
                  <thead>
                    <tr>
                      <th>Plato</th>
                      <th>Categoría</th>
                      <th>Precio en Soles</th>
                      <th>Disponibilidad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsList.map(product => (
                      <tr key={product.id} className={product.isOutOfStock ? 'row-out-of-stock' : ''}>
                        <td>
                          <div className="table-product-cell">
                            <img src={product.img} alt={product.name} />
                            <div>
                              <h4>{product.name}</h4>
                              <p>{product.desc}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="category-pill">{product.category}</span>
                        </td>
                        <td>
                          <strong className="table-price">S/ {product.price.toFixed(2)}</strong>
                        </td>
                        <td>
                          <button 
                            className={`toggle-stock-btn ${product.isOutOfStock ? 'out-of-stock' : 'in-stock'}`}
                            onClick={() => toggleProductStatus(product.id)}
                          >
                            {product.isOutOfStock ? (
                              <>
                                <i className="fa-solid fa-circle-xmark"></i> Agotado
                              </>
                            ) : (
                              <>
                                <i className="fa-solid fa-circle-check"></i> Disponible
                              </>
                            )}
                          </button>
                        </td>
                        <td>
                          <button 
                            className="btn-edit-action"
                            onClick={() => openEditPriceModal(product)}
                            title="Editar precio rápido"
                          >
                            <i className="fa-solid fa-pen-to-square"></i> Editar Precio
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 4. REPORTS TAB */}
        {activeTab === 'reports' && (
          <div className="tab-content reports-tab animate-fade">
            <div className="reports-flex-grid">
              
              <div className="card-panel reports-left">
                <h3>Transacciones Facturadas Hoy</h3>
                <p className="panel-sub">Historial en tiempo real de pasarela de pagos integrada</p>
                
                <div className="transactions-list">
                  {[
                    { id: "NGR-9076", time: "04:10 AM", client: "Roberto Gomez", total: "S/ 84.90", state: "Pago Confirmado", method: "Yape" },
                    { id: "NGR-9077", time: "04:12 AM", client: "Milagros Caceres", total: "S/ 39.90", state: "Pago Confirmado", method: "Visa" },
                    { id: "NGR-9078", time: "04:15 AM", client: "Esteban Quispe", total: "S/ 26.90", state: "Pago Confirmado", method: "Mastercard" },
                    { id: "NGR-9079", time: "04:18 AM", client: "Luciana Diaz", total: "S/ 124.50", state: "Pago Confirmado", method: "Yape" },
                    { id: "NGR-9080", time: "04:20 AM", client: "Gonzalo Rivas", total: "S/ 48.00", state: "Pago Confirmado", method: "Plin" }
                  ].map((t, idx) => (
                    <div key={idx} className="transaction-item">
                      <div className="trans-meta">
                        <strong>{t.id}</strong>
                        <span>{t.time} - {t.client}</span>
                      </div>
                      <div className="trans-billing">
                        <span className="pay-method"><i className="fa-solid fa-credit-card"></i> {t.method}</span>
                        <strong className="pay-val">{t.total}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-panel reports-right">
                <h3>Acciones del Servidor Administrativo</h3>
                <p className="panel-sub">Reportes financieros listos para contabilidad de Nexus Group</p>
                
                <div className="reports-buttons-grid">
                  <button className="rep-btn" onClick={() => triggerToast("📥 Descargando Excel de Ventas Consolidadas...")}>
                    <i className="fa-solid fa-file-excel"></i>
                    <div>
                      <h4>Consolidado de Ventas (Excel)</h4>
                      <span>Reporte completo para contabilidad</span>
                    </div>
                  </button>

                  <button className="rep-btn" onClick={() => triggerToast("📥 Generando PDF de Cuadre de Caja...")}>
                    <i className="fa-solid fa-file-pdf"></i>
                    <div>
                      <h4>Cuadre de Caja del Turno (PDF)</h4>
                      <span>Resumen de cobros por pasarela</span>
                    </div>
                  </button>

                  <button className="rep-btn" onClick={() => triggerToast("📥 Extrayendo reporte de Stock Crítico...")}>
                    <i className="fa-solid fa-cubes"></i>
                    <div>
                      <h4>Alertas de Stock en Cocinas</h4>
                      <span>Faltantes bajo el mínimo stock</span>
                    </div>
                  </button>
                  
                  <div className="reports-disclaimer">
                    <i className="fa-solid fa-circle-info"></i>
                    <span>Los reportes generados se consolidan automáticamente con la base de datos central de Nexus Group a las 11:59 PM.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* QUICK PRICE EDIT MODAL */}
      {showEditModal && selectedProduct && (
        <div className="dashboard-modal-overlay">
          <div className="dashboard-modal-box">
            <h3>Actualizar Precio de Plato</h3>
            <p className="modal-desc">Estás editando el precio de <b>{selectedProduct.name}</b> de la marca de NGR.</p>
            
            <form onSubmit={saveProductPrice}>
              <div className="modal-form-group">
                <label>Precio en Nuevos Soles (S/):</label>
                <input 
                  type="number" 
                  step="0.1" 
                  min="1"
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  placeholder="25.90"
                />
              </div>

              <div className="modal-actions-flex">
                <button type="button" className="btn-modal-close" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-save">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST SYSTEM */}
      <div className={`dashboard-toast ${showToast ? 'show' : ''}`}>
        <div className="toast-icon">💡</div>
        <div className="toast-body">{toastMessage}</div>
      </div>
    </div>
  );
}

// Subcomponent for Kanban Cards to keep JSX cleaner
function KanbanCard({ order, onAdvance, onCancel }) {
  return (
    <div className="kanban-card animate-fade">
      <div className="kanban-card-top">
        <span className="kanban-order-id">{order.id}</span>
        <span className="kanban-order-brand">{order.brand}</span>
      </div>
      
      <div className="kanban-card-body">
        <p className="kanban-client"><b>Cliente:</b> {order.client}</p>
        <p className="kanban-items"><b>Detalle:</b> {order.items}</p>
        <div className="kanban-card-footer-flex">
          <span className="kanban-total">S/ {order.total.toFixed(2)}</span>
          <span className="kanban-time"><i className="fa-solid fa-clock"></i> {order.time}</span>
        </div>
      </div>

      <div className="kanban-card-actions">
        <button className="btn-kanban-cancel" onClick={onCancel} title="Cancelar pedido">
          Cancelar
        </button>
        <button className="btn-kanban-advance" onClick={onAdvance}>
          {order.status === "En Cola" && "Preparar 🍳"}
          {order.status === "En Cocina" && "Terminar 📦"}
          {order.status === "Listo" && "Despachar 🛵"}
          {order.status === "En Camino" && "Entregado ✅"}
        </button>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
