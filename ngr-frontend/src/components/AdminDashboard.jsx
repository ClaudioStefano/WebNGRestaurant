import React, { useState } from 'react';
import './AdminDashboard.css';

// Mock Employees registered in NGR platform
const INITIAL_EMPLOYEES = [
  { id: "CN-134", name: "Carlos Mendoza", brand: "Papa Johns", role: "Supervisor de Cocina", status: "Activo" },
  { id: "CN-135", name: "Milagros Caceres", brand: "Popeyes", role: "Despachadora Cajún", status: "Activo" },
  { id: "CN-136", name: "Gonzalo Rivas", brand: "Dunkin", role: "Atención al Cliente", status: "Vacaciones" },
  { id: "CN-137", name: "Renato Villagaray", brand: "Bembos", role: "Parrillero Principal", status: "Activo" },
  { id: "CN-138", name: "Sofia Altamirano", brand: "Don Belisario", role: "Anfitriona de Salón", status: "Activo" },
  { id: "CN-139", name: "Kenji Nakasone", brand: "China Wok", role: "Maestro Wokero", status: "Activo" },
  { id: "CN-140", name: "Patricia Loli", brand: "Bembos", role: "Gerente de Tienda", status: "Activo" },
  { id: "CN-141", name: "Andrea Barreto", brand: "Papa Johns", role: "Maestra Pizzera", status: "Activo" },
  { id: "CN-142", name: "Jorge Luis Guerra", brand: "Popeyes", role: "Encargado de Calidad", status: "Activo" },
  { id: "CN-143", name: "Valeria Prado", brand: "Dunkin", role: "Barista Experta", status: "Activo" },
  { id: "CN-144", name: "Fernando Quispe", brand: "Don Belisario", role: "Hornero de Brasas", status: "Activo" },
  { id: "CN-145", name: "Luciana Chang", brand: "China Wok", role: "Supervisora de Operaciones", status: "Vacaciones" },
  { id: "CN-146", name: "Mateo Rojas", brand: "Bembos", role: "Ayudante de Cocina", status: "Activo" },
  { id: "CN-147", name: "Camila Fuentes", brand: "Don Belisario", role: "Moza de Salón", status: "Activo" },
  { id: "CN-148", name: "Diego Flores", brand: "China Wok", role: "Wokero Junior", status: "Activo" },
  { id: "CN-149", name: "Lucero Huamán", brand: "Popeyes", role: "Cajera principal", status: "Activo" },
  { id: "CN-150", name: "Santiago Perez", brand: "Papa Johns", role: "Repartidor Exclusivo", status: "Activo" },
  { id: "CN-151", name: "Fabiana Gomez", brand: "Dunkin", role: "Decoradora de Donuts", status: "Activo" },
  { id: "CN-152", name: "Sebastian Torres", brand: "Bembos", role: "Entrenador de Parrilla", status: "Activo" },
  { id: "CN-153", name: "Maria Jose Ruiz", brand: "Don Belisario", role: "Asistente de Cocina", status: "Activo" },
  { id: "CN-154", name: "Nicolas Sanchez", brand: "China Wok", role: "Despachador Express", status: "Activo" },
  { id: "CN-155", name: "Kiara Diaz", brand: "Popeyes", role: "Supervisora de Turno", status: "Activo" },
  { id: "CN-156", name: "Joaquin Ramirez", brand: "Papa Johns", role: "Asistente de Tienda", status: "Activo" },
  { id: "CN-157", name: "Daniela Morales", brand: "Dunkin", role: "Administradora de Turno", status: "Activo" },
  { id: "CN-158", name: "Gabriel Castro", brand: "Bembos", role: "Cajero Part-Time", status: "Activo" },
  { id: "CN-159", name: "Ariana Ortiz", brand: "Don Belisario", role: "Ayudante de Hornero", status: "Activo" },
  { id: "CN-160", name: "Rodrigo Gutierrez", brand: "China Wok", role: "Cocinero de Chifa", status: "Activo" },
  { id: "CN-161", name: "Estefano Pardo", brand: "Popeyes", role: "Fritador Principal", status: "Activo" },
  { id: "CN-162", name: "Nicole Silva", brand: "Papa Johns", role: "Encargada de Masa", status: "Activo" },
  { id: "CN-163", name: "Samuel Chavez", brand: "Dunkin", role: "Reponedor de Tienda", status: "Activo" },
  { id: "CN-164", name: "Valentina Valdivia", brand: "Bembos", role: "Especialista de Servicio", status: "Activo" },
  { id: "CN-165", name: "Lucas Espinoza", brand: "Don Belisario", role: "Mozo de Salón", status: "Vacaciones" },
  { id: "CN-166", name: "Jimena Vargas", brand: "China Wok", role: "Ayudante de Wok", status: "Activo" },
  { id: "CN-167", name: "Alvaro Medina", brand: "Popeyes", role: "Operador de Limpieza", status: "Activo" },
  { id: "CN-168", name: "Bianca Herrera", brand: "Papa Johns", role: "Cajera principal", status: "Activo" },
  { id: "CN-169", name: "Leonardo Delgado", brand: "Dunkin", role: "Auxiliar de Pastelería", status: "Activo" },
  { id: "CN-170", name: "Xiomara Nuñez", brand: "Bembos", role: "Encargada de Calidad", status: "Activo" },
  { id: "CN-171", name: "Christopher Reyes", brand: "Don Belisario", role: "Supervisor de Salón", status: "Activo" },
  { id: "CN-172", name: "Alessandra Leon", brand: "China Wok", role: "Administradora", status: "Activo" },
  { id: "CN-173", name: "Manuel Garcia", brand: "Popeyes", role: "Despachador Cajún", status: "Vacaciones" },
  { id: "CN-174", name: "Allison Salazar", brand: "Papa Johns", role: "Asistente de Cocina", status: "Activo" },
  { id: "CN-175", name: "Franco Paredes", brand: "Dunkin", role: "Maestro Pastelero", status: "Activo" }
];

// Mock Stores (NGR restaurants branches)
const INITIAL_STORES = [
  { id: "L-01", name: "Bembos - Av. Benavides", brand: "Bembos", manager: "Hugo Diaz", status: "Abierto", efficiency: "98%" },
  { id: "L-02", name: "Papa Johns - Av. Larco", brand: "Papa Johns", manager: "Sofia Ramos", status: "Abierto", efficiency: "96%" },
  { id: "L-03", name: "Popeyes - Angamos", brand: "Popeyes", manager: "Luis Ortiz", status: "Abierto", efficiency: "94%" },
  { id: "L-04", name: "Dunkin - Jockey Plaza", brand: "Dunkin", manager: "Ana Medina", status: "Abierto", efficiency: "99%" },
  { id: "L-05", name: "Don Belisario - Miraflores", brand: "Don Belisario", manager: "Rene Prado", status: "Cerrado", efficiency: "90%" },
  { id: "L-06", name: "China Wok - San Isidro", brand: "China Wok", manager: "Mario Vega", status: "Abierto", efficiency: "92%" }
];

function AdminDashboard({ userName, statusText, onLogout }) {
  const [activeTab, setActiveTab] = useState('global'); // 'global' | 'settings' | 'stores' | 'employees'
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [stores, setStores] = useState(INITIAL_STORES);
  const [selectedBrandFilter, setSelectedBrandFilter] = useState('Todos');
  
  // Interactive System Parameters
  const [deliveryCost, setDeliveryCost] = useState(7.90);
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState(30);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoDispatch, setAutoDispatch] = useState(true);
  
  // Payment methods toggles
  const [paymentMethods, setPaymentMethods] = useState({
    visa: true,
    mastercard: true,
    yape: true,
    plin: true,
    pagoEfectivo: false
  });

  // Modal to Add Employee
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpBrand, setNewEmpBrand] = useState('Bembos');
  const [newEmpRole, setNewEmpRole] = useState('Operador');

  // Toasters
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  // Handle Switch payment method
  const handleTogglePayment = (method) => {
    setPaymentMethods(prev => {
      const updated = { ...prev, [method]: !prev[method] };
      triggerToast(`💳 Pasarela: ${method.toUpperCase()} ${updated[method] ? 'HABILITADO ✅' : 'DESHABILITADO 🛑'}`);
      return updated;
    });
  };

  // Toggle Store Status (Open / Close)
  const toggleStoreStatus = (storeId) => {
    setStores(prev => 
      prev.map(s => {
        if (s.id === storeId) {
          const newStatus = s.status === "Abierto" ? "Cerrado" : "Abierto";
          triggerToast(`🏢 Local "${s.name}" cambiado a estado: ${newStatus.toUpperCase()}`);
          return { ...s, status: newStatus };
        }
        return s;
      })
    );
  };

  // Add Employee submit
  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!newEmpName.trim()) return;

    const nextIdNum = parseInt(employees[employees.length - 1].id.split('-')[1]) + 1;
    const newEmployee = {
      id: `CN-${nextIdNum}`,
      name: newEmpName,
      brand: newEmpBrand,
      role: newEmpRole,
      status: "Activo"
    };

    setEmployees(prev => [...prev, newEmployee]);
    triggerToast(`👥 Empleado "${newEmpName}" registrado con ID: CN-${nextIdNum}`);
    setShowAddEmpModal(false);
    setNewEmpName('');
  };

  // Save System Config
  const handleSaveSystemConfig = (e) => {
    e.preventDefault();
    triggerToast("⚙️ ¡Parámetros del Sistema actualizados con éxito en servidores centrales NGR!");
  };

  const filteredEmployees = employees.filter(emp => 
    selectedBrandFilter === 'Todos' || emp.brand.toLowerCase() === selectedBrandFilter.toLowerCase()
  );

  return (
    <div className="admin-container">
      
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon"><i className="fa-solid fa-user-shield"></i></div>
          <span>NGR Admin</span>
        </div>

        <div className="admin-profile-card">
          <div className="admin-avatar">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <div className="admin-meta">
            <h4>{userName}</h4>
            <div className="admin-badge">
              <span className="dot"></span>
              {statusText}
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'global' ? 'active' : ''}`}
            onClick={() => setActiveTab('global')}
          >
            <i className="fa-solid fa-chart-line"></i>
            <span>Métricas Globales</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fa-solid fa-sliders"></i>
            <span>Parámetros Sistema</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'stores' ? 'active' : ''}`}
            onClick={() => setActiveTab('stores')}
          >
            <i className="fa-solid fa-store"></i>
            <span>Locales y Sucursales</span>
          </button>
          <button 
            className={`nav-item ${activeTab === 'employees' ? 'active' : ''}`}
            onClick={() => setActiveTab('employees')}
          >
            <i className="fa-solid fa-users-gear"></i>
            <span>Personal Registrado</span>
          </button>
        </nav>

        <button className="sidebar-logout" onClick={onLogout}>
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Cerrar Sesión</span>
        </button>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="admin-main">
        
        {/* HEADER */}
        <header className="admin-header">
          <div className="header-title">
            <h1>
              {activeTab === 'global' && 'Consola de Métricas Consolidadas'}
              {activeTab === 'settings' && 'Parámetros y Configuraciones Globales'}
              {activeTab === 'stores' && 'Gestión de Locales Multi-Marca NGR'}
              {activeTab === 'employees' && 'Control de Credenciales de Personal'}
            </h1>
            <p>Panel de Administración y Control Central - Nexus Group Restaurants</p>
          </div>

          <div className="header-actions">
            <div className="db-sync-tag">
              <i className="fa-solid fa-rotate"></i>
              <span>Base de Datos Central: ONLINE</span>
            </div>
          </div>
        </header>

        {/* 1. METRICAS GLOBALES */}
        {activeTab === 'global' && (
          <div className="tab-content animate-fade">
            
            {/* KPI GRID */}
            <div className="kpi-grid">
              <div className="kpi-card green-kpi">
                <div className="kpi-card-top">
                  <span>Facturación Consolidada Semanal</span>
                  <i className="fa-solid fa-wallet"></i>
                </div>
                <h2>S/ 34,920.00</h2>
                <p className="kpi-trend"><i className="fa-solid fa-arrow-trend-up"></i> +18.5% vs semana anterior</p>
              </div>

              <div className="kpi-card blue-kpi">
                <div className="kpi-card-top">
                  <span>Pedidos Totales (Mes)</span>
                  <i className="fa-solid fa-bag-shopping"></i>
                </div>
                <h2>1,420 pedidos</h2>
                <p className="kpi-trend"><i className="fa-solid fa-arrow-trend-up"></i> +5.2% efectividad</p>
              </div>

              <div className="kpi-card orange-kpi">
                <div className="kpi-card-top">
                  <span>Locales Multi-Marca</span>
                  <i className="fa-solid fa-house-chimney-medical"></i>
                </div>
                <h2>24 locales</h2>
                <p className="kpi-trend"><i className="fa-solid fa-circle-check"></i> Sincronizados y en línea</p>
              </div>

              <div className="kpi-card gold-kpi">
                <div className="kpi-card-top">
                  <span>Satisfacción de Cliente (NPS)</span>
                  <i className="fa-solid fa-star"></i>
                </div>
                <h2>4.8 / 5.0</h2>
                <p className="kpi-trend"><i className="fa-solid fa-face-smile"></i> Nivel de excelencia</p>
              </div>
            </div>

            {/* AI ANALYTICS SERVICE - PREDICCION DE DEMANDA */}
            <div className="card-panel ai-admin-analytics-panel animate-fade">
              <div className="ai-admin-header">
                <h3><i className="fa-solid fa-brain ai-brain-icon"></i> Servicio de IA y Analítica (AI Analytics Service): Predicción de Demanda NGR</h3>
                <span className="ai-active-status">Predicciones en Vivo Activas</span>
              </div>
              <p className="panel-sub">El motor predictivo de IA calcula las fluctuaciones de consumo para optimizar inventario y compras de insumos a nivel multimarca.</p>
              
              <div className="ai-predictions-flex">
                <div className="prediction-insight-card">
                  <div className="insight-badge"><i className="fa-solid fa-bolt"></i> Alerta de Alta Demanda</div>
                  <h4>Fin de Semana: Popeyes & Bembos</h4>
                  <p>Se pronostica un incremento del <b>+28%</b> en la demanda de <i>Combo Popeyes</i> y hamburguesas <i>XL de Bembos</i> debido a eventos deportivos locales el 26/05/2026.</p>
                  <strong className="ai-action-sugg">💡 Sugerencia IA: Incrementar el stock de filetes de pollo un 15% en locales de Lima Centro.</strong>
                </div>

                <div className="prediction-insight-card">
                  <div className="insight-badge info-badge"><i className="fa-solid fa-chart-line"></i> Tendencias de Desayunos</div>
                  <h4>Dunkin: Alta Rotación</h4>
                  <p>La IA predice que la venta de <i>Donut Box</i> aumentará un <b>+15%</b> en horas de la mañana durante los días de invierno. La afinidad de canjes de puntos multimarca es del 85%.</p>
                  <strong className="ai-action-sugg">💡 Sugerencia IA: Configurar promoción cruzada con combos Bembos a las 11:00 AM.</strong>
                </div>
              </div>
            </div>

            {/* SPLIT CHARTS & DATA */}
            <div className="admin-split-grid">
              
              {/* BRAND PERFORMANCE (INTERACTIVE GRAPHS) */}
              <div className="card-panel brand-performance-chart">
                <h3>Ventas de NGR por Marca (Consolidado Semanal)</h3>
                <p className="panel-sub">Simulación financiera del consolidado neto por marcas registradas</p>

                <div className="brand-bars-grid">
                  {[
                    { name: 'Bembos', pct: 32, sales: 'S/ 11,174.40', color: '#ff6b00' },
                    { name: 'Papa Johns', pct: 22, sales: 'S/ 7,682.40', color: '#d62828' },
                    { name: 'Popeyes', pct: 16, sales: 'S/ 5,587.20', color: '#ffc107' },
                    { name: 'Dunkin', pct: 14, sales: 'S/ 4,888.80', color: '#ec4899' },
                    { name: 'Don Belisario', pct: 10, sales: 'S/ 3,492.00', color: '#8d6e63' },
                    { name: 'China Wok', pct: 6, sales: 'S/ 2,095.20', color: '#10b981' }
                  ].map(b => (
                    <div key={b.name} className="brand-sales-row">
                      <div className="brand-sales-meta">
                        <span><strong>{b.name}</strong></span>
                        <span>{b.sales} ({b.pct}%)</span>
                      </div>
                      <div className="brand-sales-track">
                        <div className="brand-sales-fill" style={{ width: `${b.pct}%`, backgroundColor: b.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SALES BY CHANNEL */}
              <div className="card-panel channels-panel">
                <h3>Pedidos por Canal de Venta</h3>
                <p className="panel-sub">Distribución porcentual de las comandas recibidas</p>
                
                <div className="channel-box-flex">
                  <div className="channel-gauge">
                    {/* SVG Circular Ring representation */}
                    <svg width="120" height="120" viewBox="0 0 36 36" className="circular-chart">
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3"></circle>
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ff6b00" strokeWidth="3.5" strokeDasharray="55 45" strokeDashoffset="25"></circle>
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#10b981" strokeWidth="3.5" strokeDasharray="30 70" strokeDashoffset="70"></circle>
                      <circle cx="18" cy="18" r="15.915" fill="none" stroke="#06b6d4" strokeWidth="3.5" strokeDasharray="15 85" strokeDashoffset="100"></circle>
                    </svg>
                  </div>

                  <div className="channel-legends">
                    <div className="chan-item">
                      <span className="chan-dot orange-dot"></span>
                      <div>
                        <strong>Delivery App (55%)</strong>
                        <span>781 pedidos</span>
                      </div>
                    </div>
                    <div className="chan-item">
                      <span className="chan-dot green-dot"></span>
                      <div>
                        <strong>Salón / Mesa (30%)</strong>
                        <span>426 pedidos</span>
                      </div>
                    </div>
                    <div className="chan-item">
                      <span className="chan-dot blue-dot"></span>
                      <div>
                        <strong>Recojo en Tienda (15%)</strong>
                        <span>213 pedidos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 2. PARAMETROS DEL SISTEMA */}
        {activeTab === 'settings' && (
          <div className="tab-content animate-fade">
            <div className="card-panel settings-panel">
              <h3>Consola de Parametrización Global</h3>
              <p className="panel-sub">Controla en tiempo real los valores y restricciones de la plataforma NGR</p>
              
              <form onSubmit={handleSaveSystemConfig} className="settings-form">
                
                <div className="settings-form-grid">
                  
                  {/* Costo Delivery */}
                  <div className="form-group-custom">
                    <label>Tarifa Estándar de Delivery (S/)</label>
                    <div className="input-with-icon">
                      <span className="input-prefix">S/</span>
                      <input 
                        type="number" 
                        step="0.10"
                        min="1"
                        required
                        value={deliveryCost}
                        onChange={(e) => setDeliveryCost(parseFloat(e.target.value))}
                      />
                    </div>
                    <span className="form-help">Determina el costo que se le cobra al cliente en checkout</span>
                  </div>

                  {/* Tiempo de despacho */}
                  <div className="form-group-custom">
                    <label>Tiempo Promedio de Despacho (Mins)</label>
                    <div className="input-with-icon">
                      <input 
                        type="number" 
                        min="10"
                        max="120"
                        required
                        value={estimatedDeliveryTime}
                        onChange={(e) => setEstimatedDeliveryTime(parseInt(e.target.value))}
                      />
                      <span className="input-suffix">mins</span>
                    </div>
                    <span className="form-help">Tiempo estimado que visualiza el cliente al comprar</span>
                  </div>

                  {/* Modo Mantenimiento */}
                  <div className="form-group-custom toggle-group-row">
                    <div>
                      <label>Modo Mantenimiento del Sistema</label>
                      <span className="form-help">Bloquea temporalmente el catálogo de compras para mantenimiento general</span>
                    </div>
                    <label className="switch-toggle-custom">
                      <input 
                        type="checkbox" 
                        checked={maintenanceMode}
                        onChange={() => {
                          setMaintenanceMode(!maintenanceMode);
                          triggerToast(maintenanceMode ? "⚙️ Servidores en Producción habilitados" : "🛑 Modo Mantenimiento Activado. Catálogos bloqueados.");
                        }}
                      />
                      <span className="slider-round-custom"></span>
                    </label>
                  </div>

                  {/* Despacho Automatico */}
                  <div className="form-group-custom toggle-group-row">
                    <div>
                      <label>Asignación Automática de Repartidores</label>
                      <span className="form-help">Asigna de forma inteligente el motorizado más cercano mediante algoritmo GPS</span>
                    </div>
                    <label className="switch-toggle-custom">
                      <input 
                        type="checkbox" 
                        checked={autoDispatch}
                        onChange={() => {
                          setAutoDispatch(!autoDispatch);
                          triggerToast(autoDispatch ? "🤖 Asignación de repartidores cambiada a MANUAL" : "🤖 Despacho automático por GPS habilitado.");
                        }}
                      />
                      <span className="slider-round-custom"></span>
                    </label>
                  </div>

                </div>

                {/* Pasarelas de Pago Toggles */}
                <div className="payments-settings-box">
                  <h4>Pasarelas de Pago Habilitadas</h4>
                  <p className="panel-sub">Prende o apaga las pasarelas que procesan las compras del cliente</p>
                  
                  <div className="payments-toggles-flex">
                    <div className="payment-toggle-card">
                      <i className="fa-brands fa-cc-visa visa-color"></i>
                      <span>Visa Card</span>
                      <label className="switch-toggle-custom">
                        <input 
                          type="checkbox" 
                          checked={paymentMethods.visa}
                          onChange={() => handleTogglePayment('visa')}
                        />
                        <span className="slider-round-custom"></span>
                      </label>
                    </div>

                    <div className="payment-toggle-card">
                      <i className="fa-brands fa-cc-mastercard mastercard-color"></i>
                      <span>Mastercard</span>
                      <label className="switch-toggle-custom">
                        <input 
                          type="checkbox" 
                          checked={paymentMethods.mastercard}
                          onChange={() => handleTogglePayment('mastercard')}
                        />
                        <span className="slider-round-custom"></span>
                      </label>
                    </div>

                    <div className="payment-toggle-card">
                      <i className="fa-solid fa-mobile-screen yape-color"></i>
                      <span>Yape (Billetera)</span>
                      <label className="switch-toggle-custom">
                        <input 
                          type="checkbox" 
                          checked={paymentMethods.yape}
                          onChange={() => handleTogglePayment('yape')}
                        />
                        <span className="slider-round-custom"></span>
                      </label>
                    </div>

                    <div className="payment-toggle-card">
                      <i className="fa-solid fa-qrcode plin-color"></i>
                      <span>Plin (Billetera)</span>
                      <label className="switch-toggle-custom">
                        <input 
                          type="checkbox" 
                          checked={paymentMethods.plin}
                          onChange={() => handleTogglePayment('plin')}
                        />
                        <span className="slider-round-custom"></span>
                      </label>
                    </div>

                    <div className="payment-toggle-card">
                      <i className="fa-solid fa-money-bill-wave cash-color"></i>
                      <span>Pago en Efectivo</span>
                      <label className="switch-toggle-custom">
                        <input 
                          type="checkbox" 
                          checked={paymentMethods.pagoEfectivo}
                          onChange={() => handleTogglePayment('pagoEfectivo')}
                        />
                        <span className="slider-round-custom"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="form-submit-panel">
                  <button type="submit" className="btn-save-settings">
                    <i className="fa-solid fa-floppy-disk"></i> Guardar Parámetros Corporativos
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* 3. GESTION DE LOCALES */}
        {activeTab === 'stores' && (
          <div className="tab-content animate-fade">
            <div className="card-panel">
              <div className="panel-header-flex">
                <div>
                  <h3>Operación de Sucursales Multi-Marca NGR</h3>
                  <p className="panel-sub">Controla la apertura y cierre en vivo de los locales multi-marca a nivel Perú</p>
                </div>
              </div>

              <div className="stores-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Local</th>
                      <th>Marca NGR</th>
                      <th>Administrador Asignado</th>
                      <th>Eficiencia Operativa</th>
                      <th>Estado Actual</th>
                      <th>Acción Directa</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stores.map(store => (
                      <tr key={store.id} className={store.status === 'Cerrado' ? 'row-closed-store' : ''}>
                        <td>
                          <strong>{store.name}</strong>
                          <span className="store-id-label">{store.id}</span>
                        </td>
                        <td>
                          <span className="brand-pill-badge">{store.brand}</span>
                        </td>
                        <td>{store.manager}</td>
                        <td>
                          <div className="efficiency-cell">
                            <span className="eff-num">{store.efficiency}</span>
                            <div className="eff-track"><div className="eff-fill" style={{ width: store.efficiency }}></div></div>
                          </div>
                        </td>
                        <td>
                          <span className={`store-status-pill ${store.status === 'Abierto' ? 'open-pill' : 'closed-pill'}`}>
                            {store.status === 'Abierto' ? 'ONLINE (Abierto)' : 'OFFLINE (Cerrado)'}
                          </span>
                        </td>
                        <td>
                          <button 
                            className={`btn-toggle-store-status ${store.status === 'Abierto' ? 'btn-close-store' : 'btn-open-store'}`}
                            onClick={() => toggleStoreStatus(store.id)}
                          >
                            {store.status === 'Abierto' ? 'Cerrar Local 🛑' : 'Abrir Local ✅'}
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

        {/* 4. GESTION DE PERSONAL */}
        {activeTab === 'employees' && (
          <div className="tab-content animate-fade">
            <div className="card-panel">
              <div className="panel-header-flex">
                <div>
                  <h3>Credenciales de Empleados Habilitados</h3>
                  <p className="panel-sub">Control de accesos y cargos asignados a las cocinas multi-marca NGR</p>
                </div>
                <button className="btn-add-emp-trigger" onClick={() => setShowAddEmpModal(true)}>
                  <i className="fa-solid fa-user-plus"></i> Dar de Alta Empleado
                </button>
              </div>

              {/* Brand Filter & Count Summary Roster */}
              <div className="filter-and-stats-bar animate-fade-in" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '15px 20px',
                marginBottom: '20px',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#475569' }}>Filtrar Marca:</span>
                  {['Todos', 'Bembos', 'Don Belisario', 'China Wok', 'Popeyes', 'Papa Johns', 'Dunkin'].map(b => (
                    <button
                      key={b}
                      type="button"
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: selectedBrandFilter === b ? '#ff6b00' : '#cbd5e1',
                        background: selectedBrandFilter === b ? '#ff6b00' : 'white',
                        color: selectedBrandFilter === b ? 'white' : '#475569',
                        fontWeight: '600',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: selectedBrandFilter === b ? '0 4px 10px rgba(255, 107, 0, 0.2)' : 'none'
                      }}
                      onClick={() => setSelectedBrandFilter(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>

                <div style={{ 
                  background: 'white', 
                  border: '1px solid #edf2f7', 
                  padding: '8px 16px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                }}>
                  <i className="fa-solid fa-users" style={{ color: '#ff6b00', fontSize: '16px' }}></i>
                  <div style={{ fontSize: '12.5px', color: '#64748b' }}>
                    {selectedBrandFilter === 'Todos' ? (
                      <span>Mostrando: <b>{filteredEmployees.length} colaboradores</b> en total de NGR</span>
                    ) : (
                      <span>En <b>{selectedBrandFilter}</b>: <b>{filteredEmployees.length} colaboradores</b> activos</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="employees-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID Empleado</th>
                      <th>Nombre Completo</th>
                      <th>Marca NGR</th>
                      <th>Cargo Asignado</th>
                      <th>Estatus en Plataforma</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map(emp => (
                      <tr key={emp.id}>
                        <td><strong className="emp-id-label">{emp.id}</strong></td>
                        <td><strong>{emp.name}</strong></td>
                        <td><span className="brand-pill-badge">{emp.brand}</span></td>
                        <td>{emp.role}</td>
                        <td>
                          <span className={`emp-status-pill ${emp.status === 'Activo' ? 'status-act' : 'status-vac'}`}>
                            {emp.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-revoke" onClick={() => {
                            if (window.confirm(`¿Seguro que deseas revocar credenciales a ${emp.name}?`)) {
                              setEmployees(prev => prev.filter(e => e.id !== emp.id));
                              triggerToast(`❌ Credenciales de ${emp.name} revocadas.`);
                            }
                          }}>
                            Revocar Acceso
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

      </main>

      {/* MODAL TO ADD EMPLOYEE */}
      {showAddEmpModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-box">
            <h3>Dar de Alta Empleado NGR</h3>
            <p className="modal-desc">Registra las credenciales del operador para asignarlo a una comanda de cocina</p>
            
            <form onSubmit={handleAddEmployee}>
              
              <div className="modal-form-group">
                <label>Nombre del Operador:</label>
                <input 
                  type="text" 
                  required
                  placeholder="Alessandra Suarez"
                  value={newEmpName}
                  onChange={(e) => setNewEmpName(e.target.value)}
                />
              </div>

              <div className="modal-form-group">
                <label>Marca NGR Asignada:</label>
                <select value={newEmpBrand} onChange={(e) => setNewEmpBrand(e.target.value)}>
                  <option value="Bembos">Bembos</option>
                  <option value="Papa Johns">Papa Johns</option>
                  <option value="Popeyes">Popeyes</option>
                  <option value="Dunkin">Dunkin</option>
                  <option value="Don Belisario">Don Belisario</option>
                  <option value="China Wok">China Wok</option>
                </select>
              </div>

              <div className="modal-form-group">
                <label>Cargo / Rol Operativo:</label>
                <input 
                  type="text" 
                  required
                  placeholder="Supervisor de Caja / Cocinero"
                  value={newEmpRole}
                  onChange={(e) => setNewEmpRole(e.target.value)}
                />
              </div>

              <div className="modal-actions-flex">
                <button type="button" className="btn-modal-close" onClick={() => setShowAddEmpModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-modal-save">
                  Registrar Empleado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TOAST SYSTEM */}
      <div className={`admin-toast ${showToast ? 'show' : ''}`}>
        <div className="toast-icon">⚡</div>
        <div className="toast-body">{toastMessage}</div>
      </div>

    </div>
  );
}

export default AdminDashboard;
