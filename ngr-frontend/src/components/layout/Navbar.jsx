import React from 'react';

function Navbar({
  isLoggedIn,
  activeAddress,
  selectedCity,
  showCityDropdown,
  setShowCityDropdown,
  savedAddresses,
  setActiveAddress,
  setSelectedCity,
  triggerToast,
  CITIES,
  CITY_DISTRICTS,
  setShowAddressesModal,
  setNewAddressCity,
  setNewAddressDistrict,
  searchQuery,
  setSearchQuery,
  setShowLoginModal,
  userNotifications,
  setUserNotifications,
  showUserNotifDropdown,
  setShowUserNotifDropdown,
  avatarColor,
  userName,
  statusText,
  showProfileDropdown,
  setShowProfileDropdown,
  setShowProfileModal,
  setShowOrdersModal,
  setShowFavoritesModal,
  setShowPaymentPage,
  setPaymentView,
  setShowSettingsModal,
  handleLogout,
  totalCartCount,
  setShowCartDrawer,
  productsList,
  handleAddCartItem,
  PROMOTIONS,
  setSelectedPromotion
}) {
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.search-bar')) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  const suggestedProducts = React.useMemo(() => {
    if (!productsList || !searchQuery) return [];
    return productsList.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
  }, [productsList, searchQuery]);

  const suggestedPromotions = React.useMemo(() => {
    if (!PROMOTIONS || !searchQuery) return [];
    return PROMOTIONS.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 3);
  }, [PROMOTIONS, searchQuery]);

  return (
    <nav>
      <div className="nav-left">
        <div className="logo">
          <div className="logo-circle">NGR</div>
          <h2></h2>
        </div>

        {/* LOCATION SELECTOR */}
        <div className="location-selector" id="locationSelectorContainer">
          <div className="location-button" onClick={() => setShowCityDropdown(!showCityDropdown)}>
            <i className="fa-solid fa-location-dot"></i>
            <div>
              <p>Enviar a</p>
              <h4 id="selectedCity" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '140px' }}>
                {isLoggedIn && activeAddress ? `${activeAddress.tag}: ${activeAddress.address}` : selectedCity}
              </h4>
            </div>
            <i className="fa-solid fa-chevron-down"></i>
          </div>

          {showCityDropdown && (
            <div className="location-dropdown" style={{ 
              opacity: 1, 
              visibility: 'visible', 
              transform: 'translateY(0)',
              width: '320px',
              maxHeight: '500px',
              overflowY: 'auto',
              padding: '15px',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
              border: '1px solid rgba(255, 107, 0, 0.15)',
            }}>
              {/* MANUAL ADDRESS INPUT */}
              <div style={{ marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', textAlign: 'left' }}>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#ff6b00', textTransform: 'uppercase', margin: '0 0 6px 0', letterSpacing: '0.5px' }}>📍 Dirección de Entrega</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    id="manualHeaderAddressInput"
                    placeholder={`Escribe tu dirección en ${selectedCity}...`}
                    defaultValue={isLoggedIn && activeAddress ? `${activeAddress.address}${activeAddress.district ? `, ${activeAddress.district}` : ''}` : selectedCity}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #ebdcd3',
                      fontSize: '12px',
                      outline: 'none',
                      transition: 'all 0.2s',
                      background: '#fffdfb'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                    onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const btn = document.getElementById('applyManualAddressBtn');
                        if (btn) btn.click();
                      }
                    }}
                  />
                  <button
                    id="applyManualAddressBtn"
                    onClick={() => {
                      const val = document.getElementById('manualHeaderAddressInput')?.value.trim();
                      if (!val) {
                        triggerToast("⚠️ Por favor ingresa una dirección válida", "error");
                        return;
                      }
                      if (isLoggedIn) {
                        const manualAddr = { id: 999, tag: '📍 Enviar a', address: val, district: '', city: selectedCity };
                        setActiveAddress(manualAddr);
                      } else {
                        setSelectedCity(val);
                      }
                      triggerToast(`📍 Dirección en ${selectedCity} establecida a: ${val}`, "success");
                      setShowCityDropdown(false);
                    }}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #ff6b00, #ff8c3a)',
                      color: 'white',
                      border: 'none',
                      fontWeight: '700',
                      fontSize: '11.5px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Fijar
                  </button>
                </div>
              </div>

              {isLoggedIn && (
                <div style={{ marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#ff6b00', textTransform: 'uppercase', margin: '0 0 8px 0', letterSpacing: '0.5px', textAlign: 'left' }}>Direcciones Guardadas</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {savedAddresses.map(addr => (
                      <div 
                        key={addr.id}
                        onClick={() => {
                          setActiveAddress(addr);
                          setSelectedCity(addr.city || 'Lima Metropolitana'); // SYNCHRONIZE CITY!
                          triggerToast(`📍 Dirección activa: ${addr.tag} (${addr.city || 'Lima Metropolitana'})`, "success");
                          setShowCityDropdown(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          background: activeAddress?.id === addr.id ? 'rgba(255, 107, 0, 0.08)' : 'transparent',
                          border: activeAddress?.id === addr.id ? '1px solid #ff6b00' : '1px solid transparent',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          color: '#334155'
                        }}
                        className="address-header-option"
                      >
                        <span style={{ fontSize: '14px' }}>{addr.tag === 'Casa' ? '🏠' : addr.tag === 'Trabajo' ? '💼' : '📍'}</span>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <strong style={{ fontSize: '11.5px', fontWeight: '700' }}>{addr.tag}</strong>
                            <span style={{ fontSize: '9px', background: 'rgba(255, 107, 0, 0.1)', color: '#ff6b00', padding: '1px 5px', borderRadius: '4px', fontWeight: '700' }}>
                              {addr.city || 'Lima Metropolitana'}
                            </span>
                          </div>
                          <span style={{ fontSize: '10px', color: '#64748b' }}>{addr.address}, {addr.district}</span>
                        </div>
                        {activeAddress?.id === addr.id && <i className="fa-solid fa-circle-check" style={{ color: '#ff6b00', fontSize: '12px' }}></i>}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setShowAddressesModal(true);
                      setNewAddressCity(selectedCity);
                      const districts = CITY_DISTRICTS[selectedCity] || ['Zona Centro', 'Zona Norte', 'Zona Sur'];
                      setNewAddressDistrict(districts[0]);
                      setShowCityDropdown(false);
                    }}
                    style={{
                      marginTop: '10px',
                      width: '100%',
                      padding: '8px',
                      borderRadius: '10px',
                      background: '#fff9f5',
                      border: '1px solid rgba(255,107,0,0.2)',
                      color: '#ff6b00',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <i className="fa-solid fa-location-dot"></i> Administrar Direcciones
                  </button>
                </div>
              )}
              
              <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', margin: '8px 0 6px 0', letterSpacing: '0.5px', textAlign: 'left' }}>Ciudades Generales</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {CITIES.map(city => (
                  <div 
                    key={city} 
                    className="city-option" 
                    onClick={() => {
                      setSelectedCity(city);
                      // Auto-activate a saved address in this city if one exists!
                      const addrInCity = savedAddresses.find(a => (a.city || 'Lima Metropolitana') === city);
                      if (isLoggedIn && addrInCity) {
                        setActiveAddress(addrInCity);
                        triggerToast(`📍 Ciudad: ${city}. Se activó tu dirección "${addrInCity.tag}"`, "success");
                      } else {
                        if (isLoggedIn) setActiveAddress(null);
                        triggerToast(`📍 Ciudad de entrega: ${city}`, "success");
                      }
                      setShowCityDropdown(false);
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      color: '#475569'
                    }}
                  >
                    {city}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-bar" style={{ position: 'relative' }}>
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          placeholder="Buscar hamburguesas, pizzas, promociones..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && searchQuery.trim().length > 0 && (
          <div className="search-suggestions-dropdown animate-fade-in" style={{
            position: 'absolute',
            top: '55px',
            left: 0,
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255, 107, 0, 0.15)',
            zIndex: 9999,
            maxHeight: '400px',
            overflowY: 'auto',
            padding: '10px'
          }}>
            {/* MATCHING PRODUCTS */}
            {suggestedProducts.length > 0 && (
              <div style={{ marginBottom: '10px' }}>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#ff6b00', textTransform: 'uppercase', margin: '5px 10px', letterSpacing: '0.5px', textAlign: 'left' }}>Platos Encontrados</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {suggestedProducts.map(p => (
                    <div 
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        textAlign: 'left'
                      }}
                      className="suggestion-item"
                      onClick={() => {
                        handleAddCartItem(p);
                        setSearchQuery('');
                        setShowSuggestions(false);
                      }}
                    >
                      <img src={p.img} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <strong style={{ fontSize: '13px', color: '#1e293b' }}>{p.name}</strong>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>{p.brand}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#ff6b00' }}>S/ {p.price.toFixed(2)}</span>
                        <span className="btn-add-suggestion" style={{
                          padding: '4px 8px',
                          borderRadius: '6px',
                          background: 'linear-gradient(135deg, #ff6b00, #ff8c3a)',
                          color: 'white',
                          fontSize: '11px',
                          fontWeight: 'bold'
                        }}>+ Agregar</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MATCHING PROMOTIONS */}
            {suggestedPromotions.length > 0 && (
              <div>
                <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#ff6b00', textTransform: 'uppercase', margin: '10px 10px 5px 10px', letterSpacing: '0.5px', textAlign: 'left' }}>Promociones</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {suggestedPromotions.map(promo => (
                    <div 
                      key={promo.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px 10px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        textAlign: 'left'
                      }}
                      className="suggestion-item"
                      onClick={() => {
                        setSelectedPromotion(promo);
                        setSearchQuery('');
                        setShowSuggestions(false);
                      }}
                    >
                      <img src={promo.img} alt={promo.title} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} onError={(e) => { e.target.src = promo.fallbackImg; }} />
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <strong style={{ fontSize: '13px', color: '#1e293b' }}>{promo.title}</strong>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>{promo.desc}</span>
                      </div>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 107, 0, 0.1)',
                        color: '#ff6b00',
                        fontSize: '11px',
                        fontWeight: 'bold'
                      }}>Ver Promo</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {suggestedProducts.length === 0 && suggestedPromotions.length === 0 && (
              <div style={{ padding: '20px 10px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>
                <i className="fa-solid fa-circle-info" style={{ marginRight: '5px' }}></i> No se encontraron platos o promociones.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="nav-right">
        <div className="nav-clock" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: '700', color: '#ff6b00', padding: '6px 12px', borderRadius: '10px', background: '#fff0e5', border: '1px solid rgba(255,107,0,0.1)' }}>
          <i className="fa-solid fa-clock"></i>
          <span>{formattedDateTime}</span>
        </div>
        {!isLoggedIn ? (
          <button className="login-btn" id="openLoginNav" onClick={() => setShowLoginModal(true)}>
            Iniciar Sesión
          </button>
        ) : (
          <div className="user-menu">
            <div className="notification" style={{ position: 'relative' }} onClick={() => setShowUserNotifDropdown(!showUserNotifDropdown)}>
              <i className="fa-solid fa-bell"></i>
              {userNotifications.filter(n => !n.read).length > 0 && (
                <span className="notification-dot"></span>
              )}

              {showUserNotifDropdown && (
                <div className="notif-dropdown notif-dropdown-box" style={{
                  position: 'absolute',
                  top: '55px',
                  right: '-80px',
                  width: '320px',
                  zIndex: 1000,
                  padding: '15px',
                  color: '#1e293b',
                  textAlign: 'left'
                }} onClick={(e) => e.stopPropagation()}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '800', color: '#ff6b00', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      Notificaciones
                      {userNotifications.filter(n => !n.read).length > 0 && (
                        <span style={{ fontSize: '10px', background: '#ff6b00', color: 'white', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                          {userNotifications.filter(n => !n.read).length}
                        </span>
                      )}
                    </h4>
                    <button 
                      onClick={() => {
                        setUserNotifications(userNotifications.map(n => ({ ...n, read: true })));
                      }}
                      style={{ border: 'none', background: 'none', color: '#64748b', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                    >
                      Marcar leídas
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '260px', overflowY: 'auto', paddingRight: '4px' }}>
                    {userNotifications.length === 0 ? (
                      <div style={{ padding: '20px 0', textAlign: 'center', color: '#94a3b8', fontSize: '12.5px' }}>Sin notificaciones</div>
                    ) : (
                      userNotifications.map(notif => {
                        const badgeClass = notif.text.includes("Cocina") ? "notif-badge-kitchen" :
                                           (notif.text.includes("Reparto") || notif.text.includes("Delivery")) ? "notif-badge-dispatch" :
                                           (notif.text.includes("Alerta") || notif.text.includes("insumos")) ? "notif-badge-warning" : "notif-badge-success";
                        const badgeLabel = notif.text.includes("Cocina") ? "Cocina" :
                                           (notif.text.includes("Reparto") || notif.text.includes("Delivery")) ? "Despacho" :
                                           (notif.text.includes("Alerta") || notif.text.includes("insumos")) ? "Alerta" : "Info";

                        return (
                          <div 
                            key={notif.id} 
                            onClick={() => {
                              setUserNotifications(userNotifications.map(n => n.id === notif.id ? { ...n, read: true } : n));
                            }}
                            className="notif-item-dynamic"
                            style={{
                              display: 'flex',
                              gap: '10px',
                              padding: '10px',
                              background: notif.read ? 'transparent' : 'rgba(255, 107, 0, 0.04)',
                              cursor: 'pointer',
                              borderLeft: notif.read ? '3px solid transparent' : '3px solid #ff6b00'
                            }}
                          >
                            <div style={{ fontSize: '18px', display: 'flex', alignItems: 'center' }}>{notif.icon}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '5px' }}>
                                <span className={`notif-badge-tag ${badgeClass}`}>{badgeLabel}</span>
                                <span style={{ fontSize: '9px', color: '#94a3b8' }}>{notif.date}</span>
                              </div>
                              <p style={{ margin: 0, fontSize: '11.5px', lineHeight: '1.4', fontWeight: notif.read ? 'normal' : '600', color: '#334155' }}>
                                {notif.text}
                              </p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="user-profile" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
              <div className="user-avatar" style={{ background: avatarColor }}>
                {userName ? userName.split(' ').map(n => n[0]).join('') : 'U'}
              </div>
              <div className="user-info">
                <h4>{userName}</h4>
                <div className="status">
                  <span className="status-dot"></span>
                  <p>{statusText}</p>
                </div>
              </div>
              <i className="fa-solid fa-chevron-down"></i>

              {showProfileDropdown && (
                <div className="dropdown-menu" style={{ opacity: 1, visibility: 'visible', transform: 'translateY(0)' }}>
                  <a href="#perfil" onClick={(e) => { e.preventDefault(); setShowProfileModal(true); setShowProfileDropdown(false); }}>
                    <i className="fa-solid fa-user-gear"></i> Mi Perfil
                  </a>
                  <a href="#pedidos" onClick={(e) => { e.preventDefault(); setShowOrdersModal(true); setShowProfileDropdown(false); }}>
                    <i className="fa-solid fa-receipt"></i> Mis Pedidos
                  </a>
                  <a href="#favoritos" onClick={(e) => { e.preventDefault(); setShowFavoritesModal(true); setShowProfileDropdown(false); }}>
                    <i className="fa-solid fa-heart"></i> Mis Favoritos
                  </a>
                  <a href="#direcciones" onClick={(e) => { 
                    e.preventDefault(); 
                    setShowAddressesModal(true); 
                    setNewAddressCity(selectedCity);
                    const districts = CITY_DISTRICTS[selectedCity] || ['Zona Centro', 'Zona Norte', 'Zona Sur'];
                    setNewAddressDistrict(districts[0]);
                    setShowProfileDropdown(false); 
                  }}>
                    <i className="fa-solid fa-location-dot"></i> Direcciones
                  </a>
                  <a href="#pagos" onClick={(e) => { e.preventDefault(); setShowPaymentPage(true); setPaymentView('add'); setShowProfileDropdown(false); }}>
                    <i className="fa-solid fa-credit-card"></i> Métodos de Pago
                  </a>
                  <a href="#config" onClick={(e) => { e.preventDefault(); setShowSettingsModal(true); setShowProfileDropdown(false); }}>
                    <i className="fa-solid fa-gear"></i> Configuración
                  </a>
                  <a href="#logout" onClick={(e) => { e.preventDefault(); handleLogout(); }} id="logoutBtn">
                    <i className="fa-solid fa-right-from-bracket"></i> Cerrar Sesión
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Shopping Cart Trigger */}
        <div className="cart" onClick={() => setShowCartDrawer(true)}>
          <i className="fa-solid fa-cart-shopping"></i>
          {totalCartCount > 0 && <span className="cart-badge">{totalCartCount}</span>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
