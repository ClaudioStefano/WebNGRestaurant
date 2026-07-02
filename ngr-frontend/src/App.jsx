import React, { useState } from 'react';
import './App.css';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

// Mock Data
import {
  CITIES,
  CITY_DISTRICTS,
  PROMOTIONS,
  BRANDS,
  INITIAL_PRODUCTS,
  BRAND_DETAILS,
  BRAND_MILESTONES,
  AVATAR_COLORS
} from './constants/mockData';

// Modals
import LoginModal from './components/modals/LoginModal';
import BrandPageModal from './components/modals/BrandPageModal';
import PromotionDetailsModal from './components/modals/PromotionDetailsModal';
import UserProfileModal from './components/modals/UserProfileModal';
import FavoritesModal from './components/modals/FavoritesModal';
import AddressesModal from './components/modals/AddressesModal';
import OrdersModal from './components/modals/OrdersModal';
import SettingsModal from './components/modals/SettingsModal';

// Payment & Cart
import PaymentPage from './components/payment/PaymentPage';
import CartDrawer from './components/cart/CartDrawer';

// Layout
import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import PublicHero from './components/layout/PublicHero';
import PromotionsSection from './components/layout/PromotionsSection';
import AiRecommendations from './components/layout/AiRecommendations';
import CatalogSection from './components/layout/CatalogSection';
import ToastNotification from './components/layout/ToastNotification';
import CheckoutOverlay from './components/layout/CheckoutOverlay';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'usuario' | 'empleado' | 'administrador'
  const [userName, setUserName] = useState('');
  const [statusText, setStatusText] = useState('');
  
  // Real-time Connected Notifications States
  const [userNotifications, setUserNotifications] = useState([
    { id: 1, text: "🍳 Cocina Bembos: Tu Cheese Burger XL se encuentra en preparación activa en parrillas.", date: "Hace 5 mins", read: false, icon: "🍳" },
    { id: 2, text: "🛵 Reparto NGR: Tu combo Dupla Bembos 2x1 está en camino con el motorizado M1.", date: "Hace 10 mins", read: true, icon: "🛵" },
    { id: 3, text: "🍩 Stock Dunkin: Donut Box de 12 unidades ha sido reabastecido en tu tienda Jockey Plaza.", date: "Hace 20 mins", read: true, icon: "🍩" }
  ]);
  const [showUserNotifDropdown, setShowUserNotifDropdown] = useState(false);
  const [employeeNotifications, setEmployeeNotifications] = useState([
    { id: 1, text: "📢 Corporativo: Se ha actualizado el protocolo de higiene y bioseguridad en todas las cocinas NGR.", date: "Hoy, 10:15 AM", read: false, icon: "📢" },
    { id: 2, text: "⚙️ Cambios de Sistema: Se ha habilitado la pasarela de pagos Visa en producción.", date: "Hoy, 09:30 AM", read: true, icon: "💳" },
    { id: 3, text: "🕒 Operaciones NGR: Recordatorio de cambio de turno vespertino a las 6:00 PM.", date: "Ayer, 05:00 PM", read: true, icon: "🕒" }
  ]);
  
  // Saved Addresses & Delivery Options
  const [savedAddresses, setSavedAddresses] = useState([
    { id: 1, tag: "Casa", address: "Av. Larco 452", district: "Miraflores", city: "Lima Metropolitana", isDefault: true },
    { id: 2, tag: "Trabajo", address: "Av. Javier Prado 1050", district: "San Isidro", city: "Lima Metropolitana", isDefault: false },
    { id: 3, tag: "Mamá", address: "Calle Los Cedros 189", district: "San Borja", city: "Lima Metropolitana", isDefault: false },
    { id: 4, tag: "Trabajo AQP", address: "Av. Cayma 205", district: "Yanahuara", city: "Arequipa", isDefault: false }
  ]);
  const [activeAddress, setActiveAddress] = useState({ id: 1, tag: "Casa", address: "Av. Larco 452", district: "Miraflores", city: "Lima Metropolitana", isDefault: true });
  const [showAddressesModal, setShowAddressesModal] = useState(false);
  const [newAddressTag, setNewAddressTag] = useState('Casa'); // 'Casa' | 'Trabajo' | 'Otro'
  const [newAddressText, setNewAddressText] = useState('');
  const [newAddressCity, setNewAddressCity] = useState('Lima Metropolitana');
  const [newAddressDistrict, setNewAddressDistrict] = useState('Miraflores');

  // Location
  const [selectedCity, setSelectedCity] = useState('Lima Metropolitana');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  // Modals & Navigation
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false); // Loyalty
  const [showFavoritesModal, setShowFavoritesModal] = useState(false); // Favorites Modal
  const [showSettingsModal, setShowSettingsModal] = useState(false); // User Settings Modal
  const [showOrdersModal, setShowOrdersModal] = useState(false); // Orders Modal
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [paymentView, setPaymentView] = useState('add'); 

  const [savedCards, setSavedCards] = useState([
    {
      id: 1,
      type: 'visa',
      number: '4242 **** **** 4242',
      expiry: '12/28',
      holder: 'Alessandra Suarez',
      bank: 'Falabella'
    }
  ]);

  const [newCard, setNewCard] = useState({
    type: 'visa',
    holder: '',
    number: '',
    expiry: '',
    cvv: '',
    bank: ''
  });
  const [showCartDrawer, setShowCartDrawer] = useState(false); // Shopping Cart Drawer
  const [selectedPromotion, setSelectedPromotion] = useState(null); // Promotion details modal
  
  // Dedicated Brand Page States & Helpers
  const [selectedBrandName, setSelectedBrandName] = useState(null);
  
  // Custom Time Travel states & coupons
  const [activeCouponCode, setActiveCouponCode] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleOpenBrandPage = (brandName) => {
    setSelectedBrandName(brandName);
  };

  const handleCloseBrandPage = () => {
    setSelectedBrandName(null);
  };
  
  // Custom Premium Toast & Simulated Checkout states
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [checkoutStep, setCheckoutStep] = useState(null); // null | 'processing' | 'receipt'
  const [receiptNumber, setReceiptNumber] = useState('');

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  React.useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  React.useEffect(() => {
    if (!showUserNotifDropdown) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.notification')) {
        setShowUserNotifDropdown(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [showUserNotifDropdown]);

  React.useEffect(() => {
    if (!showCityDropdown) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.location-selector')) {
        setShowCityDropdown(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [showCityDropdown]);
  
  const [loginType, setLoginType] = useState('usuario'); 
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  
  // Signup form states
  const [loginMode, setLoginMode] = useState('login'); // 'login' | 'signup'
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  
  // User Personal Profile States
  const [userEmail, setUserEmail] = useState('alessandrasj@gmail.com');
  const [userPhone, setUserPhone] = useState('987 654 321');
  const [userBirthdate, setUserBirthdate] = useState('1998-05-24');
  const [userFavoriteDish, setUserFavoriteDish] = useState('Hamburguesas Bembos');
  const [avatarColor, setAvatarColor] = useState('linear-gradient(135deg, #ffc107, #ff6b00, #d62828)');
  const [userMotto, setUserMotto] = useState('¡Apasionado por el buen sabor de NGR! 🍔');
  const [userLanguage, setUserLanguage] = useState('Español');
  const [emailPromoOptIn, setEmailPromoOptIn] = useState(true);
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  
  // Catalog states
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'individual'
  const [selectedIndividualBrand, setSelectedIndividualBrand] = useState('Bembos');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Products state
  const [productsList, setProductsList] = useState(INITIAL_PRODUCTS);

  // Shopping Cart items state
  const [cartItems, setCartItems] = useState([]);
  const [deliveryCost, setDeliveryCost] = useState(7.90);

  // User Custom Preferences (IA Filters)
  const [dietPreference, setDietPreference] = useState('ninguna'); // 'ninguna' | 'vege' | 'sin-lactosa' | 'bajo-sodio'
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);
  const [oneClickPay, setOneClickPay] = useState(false);

  // Antojos Favoritos de Alessandra
  const favoritesList = [
    { id: 1, name: "Cheese Burger XL", price: 24.90, desc: "Hamburguesa Bembos con queso cheddar and papas fritas.", icon: "🍔" },
    { id: 11, name: "Donut Box", price: 18.90, desc: "Caja surtida de 12 donuts glaseadas de Dunkin.", icon: "🍩" },
    { id: 4, name: "Pepperoni Pizza", price: 39.90, desc: "Pizza familiar Papa Johns con masa artesanal.", icon: "🍕" }
  ];

  // Historial de pedidos
  const [ordersList, setOrdersList] = useState([
    {
      id: "PED-983",
      date: "22/05/2026",
      status: "Entregado",
      statusColor: "#10b981",
      brand: "Bembos",
      items: [
        { name: "Cheese Burger XL", quantity: 2, price: 24.90 }
      ],
      deliveryCost: 0,
      discount: 10.00,
      total: 39.80,
      paymentMethod: "Visa termina en *4242"
    },
    {
      id: "PED-982",
      date: "20/05/2026",
      status: "Entregado",
      statusColor: "#10b981",
      brand: "Dunkin",
      items: [
        { name: "Donut Box", quantity: 1, price: 18.90 },
        { name: "Limonada de Coco & Menta", quantity: 2, price: 12.90 }
      ],
      deliveryCost: 7.90,
      discount: 0,
      total: 52.60,
      paymentMethod: "Efectivo"
    },
    {
      id: "PED-981",
      date: "18/05/2026",
      status: "Entregado",
      statusColor: "#10b981",
      brand: "Papa Johns",
      items: [
        { name: "Pizza The Works", quantity: 1, price: 45.90 }
      ],
      deliveryCost: 7.90,
      discount: 15.00,
      total: 38.80,
      paymentMethod: "Yape"
    }
  ]);

  const handleReorder = (order) => {
    let addedAny = false;
    order.items.forEach(item => {
      const foundProduct = productsList.find(p => p.name.toLowerCase() === item.name.toLowerCase());
      if (foundProduct) {
        for (let i = 0; i < item.quantity; i++) {
          handleAddCartItem(foundProduct);
        }
        addedAny = true;
      }
    });
    if (addedAny) {
      triggerToast(`🔄 Pedido ${order.id} cargado al carrito de compras`, "success");
      setShowOrdersModal(false);
      setShowCartDrawer(true);
    } else {
      triggerToast("❌ No pudimos reordenar estos platos en este momento", "error");
    }
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    
    const defaultUserEmailVal = "alessandrasj@gmail.com";
    const userPassword = "123456";
    const employeeEmail = "CN133@ngr.com";
    const employeePassword = "admin123";
    const adminEmail = "admin@ngr.com";
    const adminPassword = "superadmin123";
    
    if (loginType === 'usuario' && emailInput === defaultUserEmailVal && passwordInput === userPassword) {
      setIsLoggedIn(true);
      setUserRole('usuario');
      setUserName('Alessandra Suarez');
      setUserEmail('alessandrasj@gmail.com');
      setUserPhone('987 654 321');
      setUserBirthdate('1998-05-24');
      setUserFavoriteDish('Hamburguesas Bembos');
      setAvatarColor('linear-gradient(135deg, #ffc107, #ff6b00, #d62828)');
      setStatusText('Usuario Activo');
      setShowLoginModal(false);
      clearLoginForm();
    } else if (loginType === 'empleado' && emailInput === employeeEmail && passwordInput === employeePassword) {
      setIsLoggedIn(true);
      setUserRole('empleado');
      setUserName('CN133');
      setStatusText('Empleado Activo');
      setShowLoginModal(false);
      clearLoginForm();
    } else if (loginType === 'administrador' && emailInput === adminEmail && passwordInput === adminPassword) {
      setIsLoggedIn(true);
      setUserRole('administrador');
      setUserName('Administrador General NGR');
      setStatusText('Acceso Administrador');
      setShowLoginModal(false);
      clearLoginForm();
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

  const clearLoginForm = () => {
    setEmailInput('');
    setPasswordInput('');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      triggerToast("❌ Por favor completa los campos obligatorios", "error");
      return;
    }
    
    triggerToast("🎉 ¡Cuenta creada con éxito! Bienvenido a NGR", "success");
    
    setIsLoggedIn(true);
    setUserRole('usuario');
    setUserName(signupName);
    setUserEmail(signupEmail);
    setUserPhone(signupPhone || '987 654 321');
    setUserBirthdate('1998-05-24'); // default birthday
    setUserFavoriteDish('Hamburguesas Bembos'); // default favorite dish
    setAvatarColor('linear-gradient(135deg, #ffc107, #ff6b00, #d62828)'); // default color
    setStatusText("Cliente NGR Bronze");
    
    setShowLoginModal(false);
    setLoginMode('login');
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
    setSignupPhone('');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName('');
    setUserEmail('alessandrasj@gmail.com');
    setUserPhone('987 654 321');
    setUserBirthdate('1998-05-24');
    setUserFavoriteDish('Hamburguesas Bembos');
    setAvatarColor('linear-gradient(135deg, #ffc107, #ff6b00, #d62828)');
    setUserMotto('¡Apasionado por el buen sabor de NGR! 🍔');
    setUserLanguage('Español');
    setEmailPromoOptIn(true);
    setWhatsappOptIn(true);
    setStatusText('');
    setCartItems([]);
    setShowProfileDropdown(false);
  };

  // Add Item to Cart
  const handleAddCartItem = (product) => {
    if (product.isOutOfStock) return;
    
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    triggerToast(`🍔 "${product.name}" agregado al carrito!`, "success");
  };

  // Cart Qty helpers
  const handleIncreaseQty = (itemId) => {
    setCartItems(prev => 
      prev.map(item => item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item)
    );
  };

  const handleDecreaseQty = (itemId) => {
    setCartItems(prev => 
      prev.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  // Add all Favorites to Cart (Auto-Combo)
  const handleAddAllFavorites = () => {
    favoritesList.forEach(fav => {
      const productObj = productsList.find(p => p.id === fav.id);
      if (productObj && !productObj.isOutOfStock) {
        handleAddCartItem(productObj);
      }
    });
    alert("💖 ¡Tus antojos favoritos han sido agregados al Carrito de compras!");
    setShowFavoritesModal(false);
    setShowCartDrawer(true);
  };

  // Checkout process simulation
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep('processing');
    
    // Simulate payment gateway delay (2 seconds)
    setTimeout(() => {
      setCheckoutStep('receipt');
      setReceiptNumber(`NGR-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      triggerToast("💳 Pago procesado con éxito", "success");

      const newOrderId = `PED-${Math.floor(100 + Math.random() * 900)}`;
      const currentDate = new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const mainBrand = cartItems[0]?.brand || "NGR Multimarca";
      
      const newOrder = {
        id: newOrderId,
        date: currentDate,
        status: "En preparación",
        statusColor: "#f59e0b", // color ámbar
        brand: mainBrand,
        items: cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        deliveryCost: deliveryCost,
        discount: couponDiscount,
        total: totalCheckoutPrice,
        paymentMethod: "Tarjeta de Crédito / Débito"
      };
      
      setOrdersList(prev => [newOrder, ...prev]);
    }, 2000);
  };

  const handleFinishCheckout = () => {
    setCartItems([]);
    setCheckoutStep(null);
    setShowCartDrawer(false);
    setActiveCouponCode(null);
    setCouponDiscount(0);
    setDeliveryCost(7.90); // Reset delivery cost to standard S/ 7.90
  };

  // Calculate totals
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalItemsPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalCheckoutPrice = totalItemsPrice > 0 ? Math.max(0, totalItemsPrice + deliveryCost - couponDiscount) : 0;

  // Filtered Products based on search, brand and Diet Preference (IA Filter)
  const filteredProducts = productsList.filter(product => {
    const matchesBrand = filterMode === 'all' || product.brand.toLowerCase() === selectedIndividualBrand.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Diet preference IA filter matching
    if (dietPreference !== 'ninguna' && !product.diets.includes(dietPreference)) {
      return false; // Filter out if it does not match active diet
    }
    
    return matchesBrand && matchesSearch;
  });

  // Render Employee Dashboard
  if (isLoggedIn && userRole === 'empleado') {
    return (
      <EmployeeDashboard 
        userName={userName} 
        statusText={statusText} 
        onLogout={handleLogout}
        productsList={productsList}
        setProductsList={setProductsList}
        employeeNotifications={employeeNotifications}
        setEmployeeNotifications={setEmployeeNotifications}
        setUserNotifications={setUserNotifications}
      />
    );
  }

  // Render Admin Dashboard
  if (isLoggedIn && userRole === 'administrador') {
    return (
      <AdminDashboard 
        userName={userName} 
        statusText={statusText} 
        onLogout={handleLogout}
        setEmployeeNotifications={setEmployeeNotifications}
      />
    );
  }

  return (
    <div className={`app-container ${!isLoggedIn ? 'guest-mode' : ''}`}>
      
      {/* PAGINA PUBLICA (GUEST MODE) */}
      <PublicHero 
        setLoginMode={setLoginMode} 
        setShowLoginModal={setShowLoginModal} 
        isLoggedIn={isLoggedIn} 
      />

      {/* PAGINA PRIVADA / CLIENTE */}
      {(isLoggedIn || !isLoggedIn) && (
        <div id="privatePage" style={{ display: isLoggedIn && userRole === 'usuario' ? 'block' : 'none' }}>
          
          {/* NAVBAR */}
          <Navbar 
            isLoggedIn={isLoggedIn}
            activeAddress={activeAddress}
            selectedCity={selectedCity}
            productsList={productsList}
            handleAddCartItem={handleAddCartItem}
            PROMOTIONS={PROMOTIONS}
            setSelectedPromotion={setSelectedPromotion}
            showCityDropdown={showCityDropdown}
            setShowCityDropdown={setShowCityDropdown}
            savedAddresses={savedAddresses}
            setActiveAddress={setActiveAddress}
            setSelectedCity={setSelectedCity}
            triggerToast={triggerToast}
            CITIES={CITIES}
            CITY_DISTRICTS={CITY_DISTRICTS}
            setShowAddressesModal={setShowAddressesModal}
            setNewAddressCity={setNewAddressCity}
            setNewAddressDistrict={setNewAddressDistrict}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setShowLoginModal={setShowLoginModal}
            userNotifications={userNotifications}
            setUserNotifications={setUserNotifications}
            showUserNotifDropdown={showUserNotifDropdown}
            setShowUserNotifDropdown={setShowUserNotifDropdown}
            avatarColor={avatarColor}
            userName={userName}
            statusText={statusText}
            showProfileDropdown={showProfileDropdown}
            setShowProfileDropdown={setShowProfileDropdown}
            setShowProfileModal={setShowProfileModal}
            setShowOrdersModal={setShowOrdersModal}
            setShowFavoritesModal={setShowFavoritesModal}
            setShowPaymentPage={setShowPaymentPage}
            setPaymentView={setPaymentView}
            setShowSettingsModal={setShowSettingsModal}
            handleLogout={handleLogout}
            totalCartCount={totalCartCount}
            setShowCartDrawer={setShowCartDrawer}
          />

          {/* HERO */}
          <Hero />

          {/* PROMOCIONES */}
          <PromotionsSection 
            PROMOTIONS={PROMOTIONS} 
            setSelectedPromotion={setSelectedPromotion} 
          />

          {/* AI RECOMMENDATION SERVICE */}
          <AiRecommendations 
            isLoggedIn={isLoggedIn}
            userName={userName}
            productsList={productsList}
            handleAddCartItem={handleAddCartItem}
          />

          {/* MARCAS */}
          <CatalogSection 
            BRANDS={BRANDS}
            handleOpenBrandPage={handleOpenBrandPage}
            dietPreference={dietPreference}
            setDietPreference={setDietPreference}
            filterMode={filterMode}
            setFilterMode={setFilterMode}
            selectedIndividualBrand={selectedIndividualBrand}
            setSelectedIndividualBrand={setSelectedIndividualBrand}
            filteredProducts={filteredProducts}
            handleAddCartItem={handleAddCartItem}
          />
        </div>
      )}

      {/* LOGIN MODAL */}
      <LoginModal 
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        loginMode={loginMode}
        setLoginMode={setLoginMode}
        loginType={loginType}
        setLoginType={setLoginType}
        emailInput={emailInput}
        setEmailInput={setEmailInput}
        passwordInput={passwordInput}
        setPasswordInput={setPasswordInput}
        handleLogin={handleLogin}
        signupName={signupName}
        setSignupName={setSignupName}
        signupEmail={signupEmail}
        setSignupEmail={setSignupEmail}
        signupPhone={signupPhone}
        setSignupPhone={setSignupPhone}
        signupPassword={signupPassword}
        setSignupPassword={setSignupPassword}
        handleSignupSubmit={handleSignupSubmit}
        triggerToast={triggerToast}
      />

      {/* BRAND DEDICATED PAGE VIEW */}
      <BrandPageModal 
        selectedBrandName={selectedBrandName}
        handleCloseBrandPage={handleCloseBrandPage}
        BRANDS={BRANDS}
        BRAND_DETAILS={BRAND_DETAILS}
        BRAND_MILESTONES={BRAND_MILESTONES}
      />

      {/* PROMOTION DETAILS MODAL */}
      <PromotionDetailsModal 
        selectedPromotion={selectedPromotion}
        setSelectedPromotion={setSelectedPromotion}
        productsList={productsList}
        setCartItems={setCartItems}
        setDeliveryCost={setDeliveryCost}
        setActiveCouponCode={setActiveCouponCode}
        setCouponDiscount={setCouponDiscount}
        triggerToast={triggerToast}
        setShowCartDrawer={setShowCartDrawer}
      />

      {/* LOYALTY PROFILE MODAL */}
      <UserProfileModal 
        showProfileModal={showProfileModal}
        setShowProfileModal={setShowProfileModal}
        avatarColor={avatarColor}
        setAvatarColor={setAvatarColor}
        userName={userName}
        setUserName={setUserName}
        userMotto={userMotto}
        setUserMotto={setUserMotto}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        userPhone={userPhone}
        setUserPhone={setUserPhone}
        userBirthdate={userBirthdate}
        setUserBirthdate={setUserBirthdate}
        userFavoriteDish={userFavoriteDish}
        setUserFavoriteDish={setUserFavoriteDish}
        userLanguage={userLanguage}
        setUserLanguage={setUserLanguage}
        emailPromoOptIn={emailPromoOptIn}
        setEmailPromoOptIn={setEmailPromoOptIn}
        whatsappOptIn={whatsappOptIn}
        setWhatsappOptIn={setWhatsappOptIn}
        triggerToast={triggerToast}
        AVATAR_COLORS={AVATAR_COLORS}
      />

      {/* FAVORITES MODAL */}
      <FavoritesModal 
        showFavoritesModal={showFavoritesModal}
        setShowFavoritesModal={setShowFavoritesModal}
        favoritesList={favoritesList}
        productsList={productsList}
        handleAddCartItem={handleAddCartItem}
        handleAddAllFavorites={handleAddAllFavorites}
        triggerToast={triggerToast}
      />

      {/* ADDRESSES MODAL */}
      <AddressesModal 
        showAddressesModal={showAddressesModal}
        setShowAddressesModal={setShowAddressesModal}
        savedAddresses={savedAddresses}
        setSavedAddresses={setSavedAddresses}
        activeAddress={activeAddress}
        setActiveAddress={setActiveAddress}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        newAddressTag={newAddressTag}
        setNewAddressTag={setNewAddressTag}
        newAddressCity={newAddressCity}
        setNewAddressCity={setNewAddressCity}
        newAddressDistrict={newAddressDistrict}
        setNewAddressDistrict={setNewAddressDistrict}
        newAddressText={newAddressText}
        setNewAddressText={setNewAddressText}
        triggerToast={triggerToast}
        CITIES={CITIES}
        CITY_DISTRICTS={CITY_DISTRICTS}
      />

      {/* ORDERS MODAL */}
      <OrdersModal 
        showOrdersModal={showOrdersModal}
        setShowOrdersModal={setShowOrdersModal}
        ordersList={ordersList}
        handleReorder={handleReorder}
      />

      {/* PÁGINA DE MÉTODOS DE PAGO */}
      <PaymentPage 
        showPaymentPage={showPaymentPage}
        setShowPaymentPage={setShowPaymentPage}
        paymentView={paymentView}
        setPaymentView={setPaymentView}
        savedCards={savedCards}
        setSavedCards={setSavedCards}
        newCard={newCard}
        setNewCard={setNewCard}
        activeCouponCode={activeCouponCode}
        setActiveCouponCode={setActiveCouponCode}
        couponDiscount={couponDiscount}
        setCouponDiscount={setCouponDiscount}
        deliveryCost={deliveryCost}
        setDeliveryCost={setDeliveryCost}
        triggerToast={triggerToast}
      />

      {/* USER SETTINGS MODAL */}
      <SettingsModal 
        showSettingsModal={showSettingsModal}
        setShowSettingsModal={setShowSettingsModal}
        dietPreference={dietPreference}
        setDietPreference={setDietPreference}
        whatsappNotifications={whatsappNotifications}
        setWhatsappNotifications={setWhatsappNotifications}
        oneClickPay={oneClickPay}
        setOneClickPay={setOneClickPay}
        triggerToast={triggerToast}
      />

      {/* SHOPPING CART DRAWER */}
      <CartDrawer 
        showCartDrawer={showCartDrawer}
        setShowCartDrawer={setShowCartDrawer}
        cartItems={cartItems}
        productsList={productsList}
        handleAddCartItem={handleAddCartItem}
        handleDecreaseQty={handleDecreaseQty}
        handleIncreaseQty={handleIncreaseQty}
        handleRemoveCartItem={handleRemoveCartItem}
        totalItemsPrice={totalItemsPrice}
        deliveryCost={deliveryCost}
        activeCouponCode={activeCouponCode}
        couponDiscount={couponDiscount}
        totalCheckoutPrice={totalCheckoutPrice}
        handleCheckout={handleCheckout}
      />

      {/* Toast Notification Container */}
      <ToastNotification toast={toast} />

      {/* Simulated Premium Checkout Overlay */}
      <CheckoutOverlay 
        checkoutStep={checkoutStep}
        receiptNumber={receiptNumber}
        userName={userName}
        selectedCity={selectedCity}
        cartItems={cartItems}
        deliveryCost={deliveryCost}
        activeCouponCode={activeCouponCode}
        couponDiscount={couponDiscount}
        totalCheckoutPrice={totalCheckoutPrice}
        handleFinishCheckout={handleFinishCheckout}
      />

    </div>
  );
}

export default App;
