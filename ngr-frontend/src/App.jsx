import React, { useState } from 'react';
import './App.css';
import EmployeeDashboard from './components/EmployeeDashboard';
import AdminDashboard from './components/AdminDashboard';

// Mock Data
const CITIES = [
  "Lima Metropolitana", "Arequipa", "Trujillo", "Chiclayo", "Piura", 
  "Cusco", "Huancayo", "Tacna", "Iquitos", "Pucallpa", 
  "Chimbote", "Huaraz", "Cajamarca", "Juliaca", "Ayacucho", 
  "Tarapoto", "Tumbes", "Puno"
];

const CITY_DISTRICTS = {
  "Lima Metropolitana": ['Miraflores', 'San Isidro', 'Santiago de Surco', 'San Borja', 'La Molina', 'Barranco', 'Jesús María', 'Lince', 'San Miguel', 'Magdalena'],
  "Arequipa": ['Yanahuara', 'Cayma', 'Cerro Colorado', 'José Luis Bustamante', 'Cercado Arequipa'],
  "Trujillo": ['Víctor Larco', 'Huanchaco', 'El Porvenir', 'Cercado Trujillo'],
  "Cusco": ['Centro Histórico', 'Wanchaq', 'San Sebastián', 'Santiago'],
  "Chiclayo": ['Chiclayo Cercado', 'Pimentel', 'La Victoria', 'José Leonardo Ortiz'],
  "Piura": ['Piura Cercado', 'Castilla', 'Catacaos'],
  "Huancayo": ['El Tambo', 'Huancayo Cercado', 'Chilca'],
  "Ayacucho": ['Ayacucho Cercado', 'Jesús Nazareno', 'San Juan Bautista'],
  "Tacna": ['Tacna Cercado', 'Alto de la Alianza', 'Ciudad Nueva', 'Pocollay', 'Gregorio Albarracín'],
  "Iquitos": ['Iquitos Cercado', 'Punchana', 'Belén', 'San Juan Bautista'],
  "Pucallpa": ['Callería', 'Yarinacocha', 'Manantay'],
  "Chimbote": ['Chimbote Cercado', 'Nuevo Chimbote', 'Coishco'],
  "Huaraz": ['Huaraz Cercado', 'Independencia', 'Tarica'],
  "Cajamarca": ['Cajamarca Cercado', 'Baños del Inca', 'Llacanora'],
  "Juliaca": ['Juliaca Cercado', 'Caracoto', 'San Miguel'],
  "Tarapoto": ['Tarapoto Cercado', 'Banda de Shilcayo', 'Morales'],
  "Tumbes": ['Tumbes Cercado', 'Corrales', 'La Cruz', 'Pampa Grande'],
  "Puno": ['Puno Cercado', 'Acora', 'Platería', 'Chucuito']
};



const PROMOTIONS = [
  {
    id: 1,
    title: "2x1 Bembos",
    desc: "Aprovecha hamburguesas dobles con delivery gratis.",
    img: "img/2146468775_1.webp",
    fallbackImg: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600"
  },
  {
    id: 2,
    title: "Descuento con Yape",
    desc: "Obtén promociones exclusivas pagando con billeteras digitales.",
    img: "img/Banner-gana-tu-yapa-hd.jpg",
    fallbackImg: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600"
  },
  {
    id: 3,
    title: "Delivery Gratis",
    desc: "En pedidos seleccionados de Popeyes y Papa Johns.",
    img: "img/686X400.webp",
    fallbackImg: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600"
  }
];

const BRANDS = [
  { name: "Bembos", logo: "img/logos/Bembos_logo15.png", fallbackLogo: "🍔" },
  { name: "Don Belisario", logo: "img/logos/5857738527a350b7b08bdd3ffcfdbd37.jpg", fallbackLogo: "🍗" },
  { name: "China Wok", logo: "img/logos/China_Wok_logo.svg.png", fallbackLogo: "🥡" },
  { name: "Popeyes", logo: "img/logos/popeyes-37670.png", fallbackLogo: "🍗" },
  { name: "Papa Johns", logo: "img/logos/png-clipart-papa-johns-logo-restaurant-logos.png", fallbackLogo: "🍕" },
  { name: "Dunkin", logo: "img/logos/png-clipart-dunkin-donuts-logo-dunkin-donuts-logo-icons-logos-emojis-iconic-brands.png", fallbackLogo: "🍩" }
];

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Cheese Burger XL",
    category: "hamburguesas",
    brand: "Bembos",
    price: 24.90,
    desc: "Hamburguesa premium con doble carne al carbón, doble queso cheddar derretido y papas fritas.",
    img: "img/cheese-burger-xl-bembos.png",
    stock: 12,
    diets: ["sin-lactosa"]
  },
  {
    id: 2,
    name: "Bembos Clásica",
    category: "hamburguesas",
    brand: "Bembos",
    price: 26.90,
    desc: "Nuestra clásica hamburguesa al carbón con lechuga fresca, tomate jugoso y cremas Bembos.",
    img: "img/bembos-clasica.png",
    stock: 8,
    diets: []
  },
  {
    id: 3,
    name: "Royal Burger",
    category: "hamburguesas",
    brand: "Bembos",
    price: 29.90,
    desc: "Hamburguesa al carbón con huevo frito, tocino crocante, queso cheddar y papas al hilo.",
    img: "img/royal-burger-bembos.png",
    stock: 3,
    diets: []
  },
  {
    id: 4,
    name: "Pepperoni Pizza",
    category: "pizzas",
    brand: "Papa Johns",
    price: 39.90,
    desc: "Pizza familiar de pepperoni extra con doble queso mozzarella real sobre salsa de tomate natural.",
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600",
    stock: 15,
    diets: []
  },
  {
    id: 5,
    name: "Pizza Suprema",
    category: "pizzas",
    brand: "Papa Johns",
    price: 42.90,
    desc: "Pizza suprema con pepperoni, jamón, salchicha italiana, cebolla, pimientos y champiñones frescos.",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600",
    stock: 20,
    diets: []
  },
  {
    id: 6,
    name: "Pizza Hawaiana",
    category: "pizzas",
    brand: "Papa Johns",
    price: 37.90,
    desc: "Exquisita masa fresca cubierta de jamón seleccionado, piña dulce en trozos y queso mozzarella fundido.",
    img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=600",
    stock: 14,
    diets: []
  },
  {
    id: 7,
    name: "Combo Popeyes",
    category: "pollo",
    brand: "Popeyes",
    price: 28.90,
    desc: "2 piezas de pollo crujiente estilo cajún, acompañadas de papas fritas cajún y gaseosa helada.",
    img: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=600",
    stock: 2,
    diets: []
  },
  {
    id: 8,
    name: "Chicken Crispy",
    category: "pollo",
    brand: "Popeyes",
    price: 31.90,
    desc: "4 piezas de pollo frito crujiente apanado a mano, marinado durante 12 horas en especias cajún.",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600",
    stock: 6,
    diets: ["bajo-sodio"]
  },
  {
    id: 9,
    name: "Frappuccino",
    category: "bebidas",
    brand: "Dunkin",
    price: 14.90,
    desc: "Bebida helada de café espresso blended con hielo, decorada con crema batida y jarabe de chocolate.",
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600",
    stock: 25,
    diets: ["vege"]
  },
  {
    id: 10,
    name: "Limonada Frozen",
    category: "bebidas",
    brand: "Dunkin",
    price: 12.90,
    desc: "Refrescante batido helado de limón natural y menta, ideal para acompañar tus donuts.",
    img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600",
    stock: 30,
    diets: ["vege", "sin-lactosa", "bajo-sodio"]
  },
  {
    id: 11,
    name: "Donut Box",
    category: "postres",
    brand: "Dunkin",
    price: 18.90,
    desc: "Caja de media docena (6 unidades) de nuestras donuts glaseadas y decoradas a mano horneadas diariamente.",
    img: "img/donut-box.png",
    stock: 10,
    diets: ["vege"]
  },
  {
    id: 12,
    name: "Cheesecake Oreo",
    category: "postres",
    brand: "Dunkin",
    price: 16.90,
    desc: "Cheesecake cremoso con base y trozos crujientes de galleta Oreo, con crema chantilly.",
    img: "img/cheesecake-oreo.png",
    stock: 5,
    diets: ["vege"]
  },
  // China Wok
  {
    id: 13,
    name: "Chaufa Wok Especial",
    category: "pollo",
    brand: "China Wok",
    price: 22.90,
    desc: "Arroz chaufa al wok a fuego extremo con trozos de pollo tierno, tortilla de huevo y cebollita china.",
    img: "img/chaufa-wok-especial.png",
    stock: 18,
    diets: []
  },
  {
    id: 14,
    name: "Tallarín Saltado Chifa",
    category: "pollo",
    brand: "China Wok",
    price: 24.90,
    desc: "Tallarín saltado con verduras chinas crujientes (holantao, col china) y filetes de pollo en salsa de ostión.",
    img: "img/tallarin-saltado-chifa.png",
    stock: 10,
    diets: []
  },
  {
    id: 15,
    name: "Combo Wantan Wok",
    category: "pollo",
    brand: "China Wok",
    price: 19.90,
    desc: "Porción de arroz chaufa chifa de pollo acompañado de 4 wantanes dorados crujientes con salsa tamarindo.",
    img: "img/combo-wantan-wok.png",
    stock: 15,
    diets: []
  },
  // Don Belisario
  {
    id: 16,
    name: "1/4 Pollo Brasa Belisario",
    category: "pollo",
    brand: "Don Belisario",
    price: 26.90,
    desc: "Un cuarto del jugoso pollo a la brasa marinado al estilo Belisario, servido con papas fritas y ensalada.",
    img: "img/1-4-pollo-belisario.png",
    stock: 12,
    diets: []
  },
  {
    id: 17,
    name: "1/2 Pollo Brasa Familiar",
    category: "pollo",
    brand: "Don Belisario",
    price: 48.90,
    desc: "Medio pollo a la brasa crujiente y jugoso acompañado de una generosa porción de papas fritas familiares.",
    img: "img/1-2-pollo-familiar.png",
    stock: 7,
    diets: []
  },
  {
    id: 18,
    name: "Camote Frito Belisario",
    category: "postres",
    brand: "Don Belisario",
    price: 12.90,
    desc: "Porción de camotes seleccionados, cortados en rodajas delgadas y fritos al punto de máxima crocancia.",
    img: "img/camote-frito-belisario.png",
    stock: 22,
    diets: ["vege", "sin-lactosa", "bajo-sodio"]
  },
  // Bembos Adicionales
  {
    id: 19,
    name: "Bembos Parrillera",
    category: "hamburguesas",
    brand: "Bembos",
    price: 31.90,
    desc: "Hamburguesa al carbón con rodajas de chorizo parrillero dorado, queso fundido y salsa chimichurri artesanal.",
    img: "img/bembos-parrillera.png",
    stock: 10,
    diets: []
  },
  {
    id: 20,
    name: "Bembos A lo Pobre",
    category: "hamburguesas",
    brand: "Bembos",
    price: 32.90,
    desc: "Clásica hamburguesa al carbón con plátano frito, huevo frito montado, queso y deliciosa salsa criolla.",
    img: "img/bembos-a-lo-pobre.png",
    stock: 7,
    diets: []
  },
  // Don Belisario Adicionales
  {
    id: 21,
    name: "Pollo a la Brasa Entero",
    category: "pollo",
    brand: "Don Belisario",
    price: 79.90,
    desc: "Pollo a la brasa entero jugoso marinado por 24 horas, servido con papas fritas familiares y ensalada grande.",
    img: "img/pollo-entero-belisario.png",
    stock: 5,
    diets: []
  },
  {
    id: 22,
    name: "Pechuga a la Parrilla",
    category: "pollo",
    brand: "Don Belisario",
    price: 29.90,
    desc: "Pechuga de pollo seleccionada cocinada a la parrilla, con guarnición de ensalada fresca del huerto.",
    img: "img/pechuga-parrilla-belisario.png",
    stock: 14,
    diets: ["bajo-sodio", "sin-lactosa"]
  },
  // China Wok Adicionales
  {
    id: 23,
    name: "Aeropuerto Wok Especial",
    category: "pollo",
    brand: "China Wok",
    price: 25.90,
    desc: "La fusión perfecta de nuestro arroz chaufa y tallarín saltado chifa con cebollita china y frijolito chino saltados en wok.",
    img: "img/aeropuerto-wok-especial.png",
    stock: 12,
    diets: []
  },
  {
    id: 24,
    name: "Pollo Chi Jau Kay",
    category: "pollo",
    brand: "China Wok",
    price: 26.90,
    desc: "Trozos crujientes de pollo apanado bañados en nuestra salsa de ostión y mensí chifa, decorados con sésamo.",
    img: "img/pollo-chi-jau-kay.png",
    stock: 9,
    diets: []
  },
  // Popeyes Adicionales
  {
    id: 25,
    name: "Tenders Cajún x6",
    category: "pollo",
    brand: "Popeyes",
    price: 22.90,
    desc: "6 deliciosas tiras de pechuga de pollo marinadas en especias cajún de Luisiana y apanadas a mano.",
    img: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?q=80&w=600",
    stock: 16,
    diets: []
  },
  {
    id: 26,
    name: "Popeyes Biscuit Pack",
    category: "postres",
    brand: "Popeyes",
    price: 10.90,
    desc: "Pack de 5 biscuits horneados diariamente en local, súper suaves, servidos con mermelada de fresa.",
    img: "img/popeyes-biscuit-pack.png",
    stock: 20,
    diets: ["vege"]
  },
  // Papa Johns Adicionales
  {
    id: 27,
    name: "Pizza The Works",
    category: "pizzas",
    brand: "Papa Johns",
    price: 45.90,
    desc: "La pizza más cargada: pepperoni, jamón, salchicha italiana, aceitunas negras, cebolla y champiñones.",
    img: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=600",
    stock: 11,
    diets: []
  },
  {
    id: 28,
    name: "Nudos de Ajo & Parmesano",
    category: "postres",
    brand: "Papa Johns",
    price: 15.90,
    desc: "8 nudos de masa fresca artesanal recién horneados, bañados en salsa de ajo especial y queso parmesano.",
    img: "img/nudos-ajo-parmesano.png",
    stock: 18,
    diets: ["vege"]
  },
  // Dunkin Adicionales
  {
    id: 29,
    name: "Iced Caramel Macchiato",
    category: "bebidas",
    brand: "Dunkin",
    price: 15.90,
    desc: "Café espresso premium frío combinado con leche fresca, jarabe de caramelo y un hilo de salsa dulce.",
    img: "img/iced-caramel-macchiato.png",
    stock: 22,
    diets: ["vege"]
  },
  // Popeyes Adicionales
  {
    id: 30,
    name: "Cajun Chicken Sandwich",
    category: "pollo",
    brand: "Popeyes",
    price: 21.90,
    desc: "Sánguche de pechuga de pollo crujiente marinada al estilo cajún, con pepinillos y salsa de la casa.",
    img: "img/cajun-chicken-sandwich.png",
    stock: 14,
    diets: []
  }
];

const BRAND_DETAILS = {
  "Bembos": {
    founded: "1988",
    history: "Bembos nació en 1988 en el distrito de Miraflores, Lima. Dos jóvenes emprendedores decidieron crear una hamburguesa con un sabor puramente peruano, cocinada al carbón. Su sabor único y la excelente calidad de sus ingredientes la convirtieron rápidamente en la marca líder de hamburguesas en el Perú, destacando por su icónica sazón criolla y sus combinaciones innovadoras.",
    cover: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200",
    slogan: "¡El sabor peruano hecho hamburguesa!"
  },
  "Don Belisario": {
    founded: "2012",
    history: "Don Belisario abrió sus puertas en 2012 para rendir homenaje al plato bandera del Perú: el Pollo a la Brasa. Con una receta secreta de marinado tradicional y papas seleccionadas de los andes peruanos, se destaca por ofrecer un ambiente familiar acogedor y guarniciones artesanales innovadoras que elevan la experiencia del pollo a la brasa clásico.",
    cover: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1200",
    slogan: "El rey del pollo a la brasa y las buenas guarniciones."
  },
  "China Wok": {
    founded: "1999",
    history: "China Wok revolucionó la comida rápida en 1999 al democratizar el Chifa (la fusión de la gastronomía china y peruana). Llevando los sabores del arroz chaufa, el tallarín saltado y el wantán a los centros comerciales con una preparación rápida en woks a fuego alto, se expandió rápidamente por todo el continente gracias a su inconfundible sazón oriental-criolla.",
    cover: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=1200",
    slogan: "¡Fuego alto, sabor oriental al instante!"
  },
  "Popeyes": {
    founded: "1972",
    history: "Fundada en Nueva Orleans, Luisiana en 1972, Popeyes llegó al Perú para encantar con su famoso pollo frito estilo cajún. Marinado durante 12 horas en especias tradicionales de Luisiana, apanado a mano y cocinado a la perfección, destaca por su increíble textura crocante por fuera y jugosa por dentro, acompañado de sus icónicos biscuits y papas cajún.",
    cover: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1200",
    slogan: "¡Pollo crujiente al auténtico estilo Luisiana!"
  },
  "Papa Johns": {
    founded: "1984",
    history: "Bajo la promesa de 'Mejores Ingredientes, Mejor Pizza', Papa Johns llegó para conquistar a los amantes de la pizza premium. Elaboradas con masa fresca estirada a mano, salsa de tomate natural madurado al sol, queso mozzarella 100% real y acompañadas de su famosa salsa de ajo especial y pepperoncini, ofrece una calidad artesanal insuperable.",
    cover: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200",
    slogan: "Mejores Ingredientes. Mejor Pizza."
  },
  "Dunkin": {
    founded: "1950",
    history: "Desde 1950, Dunkin ha sido el líder mundial en donuts y café. En el Perú, se ha convertido en el punto de encuentro favorito de los amantes del dulce, ofreciendo donuts glaseadas artesanales horneadas diariamente, muffins, cafés premium y una gran variedad de frappés refrescantes para acompañar cualquier momento del día.",
    cover: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200",
    slogan: "¡Dale un giro dulce a tu día!"
  }
};

const BRAND_MILESTONES = {
  "Bembos": [
    { year: "1988", title: "El Comienzo al Carbón", desc: "Se abre el primer local en la Av. Benavides, Miraflores, marcando el inicio de las hamburguesas con sabor peruano." },
    { year: "1995", title: "Liderazgo Absoluto", desc: "Bembos se consolida como la marca líder del mercado nacional, expandiendo su presencia a nivel nacional." },
    { year: "2010", title: "Combinaciones Únicas", desc: "Se lanzan al mercado hamburguesas legendarias con huevo frito, plátano y cecina selvática." }
  ],
  "Don Belisario": [
    { year: "2012", title: "Primer Corral", desc: "Abre su primer restaurante en Plaza Norte con su receta de marinado secreto de 24 horas." },
    { year: "2016", title: "Guarniciones Belisario", desc: "Se introducen las famosas papas nativas andinas y camote frito dulce como firmas culinarias." },
    { year: "2022", title: "Consolidación Regional", desc: "Se corona como la cadena de pollos a la brasa preferida para celebraciones familiares." }
  ],
  "China Wok": [
    { year: "1999", title: "Fuego y Wok", desc: "Nace en el Jockey Plaza de Lima. Revolucionan el concepto del Chifa sirviendo porciones abundantes y calientes." },
    { year: "2005", title: "Expansión al Continente", desc: "China Wok cruza fronteras operando exitosamente en Ecuador, Chile, Colombia y Centroamérica." },
    { year: "2018", title: "Receta Original Renacida", desc: "Se perfecciona la receta del Arroz Chaufa agregando el sabor ahumado característico de woks a fuego extremo." }
  ],
  "Popeyes": [
    { year: "1972", title: "Louisiana Roots", desc: "Alvin C. Copeland funda Popeyes en Nueva Orleans trayendo el picante único de la sazón cajún." },
    { year: "2012", title: "Aterrizaje en Lima", desc: "Se abre el primer local en Lima cautivando con el marinado de 12 horas y biscuits recién horneados." },
    { year: "2023", title: "Favorito del Crunch", desc: "Se afianza como la opción predilecta de tiras de pollo broaster súper crujientes apanadas a mano." }
  ],
  "Papa Johns": [
    { year: "1984", title: "El Sueño de John", desc: "John Schnatter vende su clásico Camaro Z28 para comprar equipamiento de pizza y fundar Papa Johns." },
    { year: "2004", title: "Mejores Ingredientes en Perú", desc: "Llega al mercado peruano con su masa fresca nunca congelada y la aclamada salsa de ajo especial." },
    { year: "2021", title: "Nuevas Masas Artesanales", desc: "Se introducen opciones innovadoras como masas delgadas libres de gluten de alta calidad." }
  ],
  "Dunkin": [
    { year: "1950", title: "Quincy Origins", desc: "William Rosenberg funda la primera cafetería en Quincy, Massachusetts, enfocada en donuts artesanales." },
    { year: "1996", title: "Merienda Feliz en Perú", desc: "Desembarca en Lima ganando el corazón de los peruanos con donuts decoradas a mano diariamente." },
    { year: "2024", title: "Era de Bebidas Frías", desc: "Lanza la línea Dunkin Frappés personalizados y opciones saludables bajas en calorías." }
  ]
};

const AVATAR_COLORS = [
  { name: 'Naranja NGR', value: 'linear-gradient(135deg, #ffc107, #ff6b00, #d62828)' },
  { name: 'Cereza Eléctrica', value: 'linear-gradient(135deg, #ec4899, #f43f5e)' },
  { name: 'Azul BCP', value: 'linear-gradient(135deg, #0f2b5c, #051026)' },
  { name: 'Esmeralda', value: 'linear-gradient(135deg, #10b981, #059669)' },
  { name: 'Púrpura Galáctico', value: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
  { name: 'Turquesa Océano', value: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
  { name: 'Oro Falabella', value: 'linear-gradient(135deg, #eab308, #ca8a04)' },
  { name: 'Carbono Elegante', value: 'linear-gradient(135deg, #475569, #1e293b)' }
];

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
  const [brandItemQuantities, setBrandItemQuantities] = useState({}); // { productId: qty }
  const [flavorAnswers, setFlavorAnswers] = useState({ q1: null, q2: null });
  const [dnaResult, setDnaResult] = useState(null);
  
  // Custom Time Travel states & coupons
  const [activeCouponCode, setActiveCouponCode] = useState(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const handleOpenBrandPage = (brandName) => {
    setSelectedBrandName(brandName);
    setFlavorAnswers({ q1: null, q2: null });
    setDnaResult(null);
    // Reset item quantities to 1 by default
    const initialQtys = {};
    productsList.forEach(p => {
      if (p.brand === brandName) {
        initialQtys[p.id] = 1;
      }
    });
    setBrandItemQuantities(initialQtys);
  };

  const handleCloseBrandPage = () => {
    setSelectedBrandName(null);
  };

  const handleCalculateDNA = () => {
    if (!flavorAnswers.q1 || !flavorAnswers.q2) return;
    
    let recommendedProduct = null;
    let affinity = Math.floor(88 + Math.random() * 12); // 88% to 99% match
    
    if (selectedBrandName === 'Bembos') {
      recommendedProduct = flavorAnswers.q1.includes('Carnívoro') 
        ? productsList.find(p => p.id === 3) // Royal Burger
        : productsList.find(p => p.id === 1); // Cheese Burger XL
    } else if (selectedBrandName === 'Don Belisario') {
      recommendedProduct = flavorAnswers.q1.includes('Pollo') 
        ? productsList.find(p => p.id === 16) // 1/4 Pollo
        : productsList.find(p => p.id === 18); // Camote frito
    } else if (selectedBrandName === 'China Wok') {
      recommendedProduct = flavorAnswers.q1.includes('Arroz') 
        ? productsList.find(p => p.id === 13) // Chaufa Wok
        : productsList.find(p => p.id === 14); // Tallarin Saltado
    } else if (selectedBrandName === 'Popeyes') {
      recommendedProduct = flavorAnswers.q1.includes('Cajun') 
        ? productsList.find(p => p.id === 7) // Combo Popeyes
        : productsList.find(p => p.id === 8); // Chicken Crispy
    } else if (selectedBrandName === 'Papa Johns') {
      recommendedProduct = flavorAnswers.q1.includes('Carnes') 
        ? productsList.find(p => p.id === 4) // Pepperoni
        : productsList.find(p => p.id === 5); // Suprema
    } else if (selectedBrandName === 'Dunkin') {
      recommendedProduct = flavorAnswers.q1.includes('Donuts') 
        ? productsList.find(p => p.id === 11) // Donut Box
        : productsList.find(p => p.id === 9); // Frappuccino
    }

    setDnaResult({
      affinity,
      product: recommendedProduct
    });
    triggerToast("🧬 ¡ADN Flavor NGR completado!", "success");
  };

  const handleBrandItemIncreaseQty = (productId) => {
    setBrandItemQuantities(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  const handleBrandItemDecreaseQty = (productId) => {
    setBrandItemQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) - 1)
    }));
  };

  // Add item with custom quantity
  const handleAddCartItemWithQty = (product, quantity) => {
    if (product.isOutOfStock) return;
    
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity: quantity }];
    });
    triggerToast(`🍔 ${quantity}x "${product.name}" agregado(s) al carrito!`, "success");
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

  // Loyalty Points
  const [loyaltyPoints, setLoyaltyPoints] = useState({
    total: 850,
    nextTier: 1000,
    tierName: "Gold Partner",
    brandsBreakdown: [
      { name: "Bembos", points: 300, icon: "🍔" },
      { name: "Dunkin", points: 250, icon: "🍩" },
      { name: "Papa Johns", points: 130, icon: "🍕" },
      { name: "China Wok", points: 90, icon: "🥡" },
      { name: "Don Belisario", points: 50, icon: "🍗" },
      { name: "Popeyes", points: 30, icon: "🍗" }
    ],
    history: [
      { id: "TX-901", desc: "Comanda Bembos XL en Jockey Plaza", pts: "+50 pts", date: "22/05/2026" },
      { id: "TX-900", desc: "Canje Donut Box de 12 unidades (Dunkin)", pts: "-200 pts", date: "20/05/2026" },
      { id: "TX-899", desc: "Pedido familiar Suprema Papa Johns", pts: "+80 pts", date: "18/05/2026" }
    ]
  });

  // Antojos Favoritos de Alessandra
  const favoritesList = [
    { id: 1, name: "Cheese Burger XL", price: 24.90, desc: "Hamburguesa Bembos con queso cheddar y papas fritas.", icon: "🍔" },
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
      {!isLoggedIn && (
        <div id="publicPage" style={{ position: 'relative' }}>
          {/* Top-Right "Crear Cuenta" button */}
          <div style={{ position: 'absolute', top: '30px', right: '40px', zIndex: 10 }}>
            <button 
              onClick={() => { setLoginMode('signup'); setShowLoginModal(true); }}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '30px',
                fontSize: '14.5px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.25)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <i className="fa-solid fa-user-plus" style={{ marginRight: '8px' }}></i> Crear cuenta
            </button>
          </div>

          <div className="public-hero">
            <div className="public-overlay"></div>
            <div className="public-content">
              <div className="public-logo">NGR</div>
              <h1>Nexus Group Restaurants</h1>
              <p>Descubre las mejores marcas gastronómicas del Perú.</p>
              <button id="openLogin" onClick={() => setShowLoginModal(true)}>
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAGINA PRIVADA / CLIENTE */}
      {(isLoggedIn || !isLoggedIn) && (
        <div id="privatePage" style={{ display: isLoggedIn && userRole === 'usuario' ? 'block' : 'none' }}>
          
          {/* NAVBAR */}
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
                    {/* MANUAL ADDRESS INPUT (SIMPLE & FORMAL) */}
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
                              setActiveAddress(matchedAddr => addrInCity);
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
            <div className="search-bar">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Buscar hamburguesas, pizzas, promociones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="nav-right">
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

          {/* HERO */}
          <div className="hero">
            <div className="hero-text">
              <h1>"Conectamos tus antojos con momentos felices."</h1>
              <p>
                Bienvenidos al lugar donde se cocinan las mejores experiencias digitales de tus 
                restaurantes favoritos. Todo lo que te gusta, en un solo lugar.
              </p>
              <button onClick={() => {
                const el = document.getElementById('promociones-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}>Ver promociones</button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1200&auto=format&fit=crop"
              alt="Delicious Burger"
            />
          </div>

          {/* PROMOCIONES */}
          <section id="promociones-section">
            <div className="section-title">
              <h2>Promociones</h2>
            </div>
            <div className="promo-grid">
              {PROMOTIONS.map(promo => (
                <div 
                  key={promo.id} 
                  className="promo-card" 
                  onClick={() => setSelectedPromotion(promo)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={promo.img}
                    onError={(e) => { e.target.src = promo.fallbackImg; }}
                    className="promo-image"
                    alt={promo.title}
                  />
                  <div className="promo-overlay"></div>
                  <div className="promo-content">
                    <h3>{promo.title}</h3>
                    <p>{promo.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI RECOMMENDATION SERVICE (Servicio de IA y Analítica) */}
          <section className="ai-recommendations-section">
            <div className="section-title">
              <h2>
                <i className="fa-solid fa-wand-magic-sparkles ai-sparkle"></i> Recomendado para Ti por IA NGR
              </h2>
            </div>
            <div className="ai-box-container">
              <div className="ai-meta-text">
                <p>
                  Hola <b>{isLoggedIn ? userName.split(' ')[0] : 'Invitado'}</b>, basado en tus consumos de <b>Bembos</b> y postres de <b>Dunkin</b>, nuestra IA te predice esta recomendación ideal:
                </p>
              </div>

              <div className="ai-cards-flex">
                
                <div className="ai-suggestion-card">
                  <div className="ai-badge-card">98% Afinidad IA</div>
                  <div className="ai-card-content">
                    <span className="combo-icon">🍔 + 🍩</span>
                    <div>
                      <h3>Combo Dupla Fusión AI</h3>
                      <p>1x Cheese Burger XL (Bembos) + 1x Donut Glaseada (Dunkin) + Papas Grandes</p>
                    </div>
                  </div>
                  <div className="ai-card-footer">
                    <div className="ai-combo-price">
                      <span className="old-price">S/ 43.80</span>
                      <strong className="new-price">S/ 32.90</strong>
                    </div>
                    <button className="btn-ai-add" onClick={() => {
                      const combProduct = productsList.find(p => p.id === 1);
                      if(combProduct) handleAddCartItem(combProduct);
                      const donutProduct = productsList.find(p => p.id === 11);
                      if(donutProduct) handleAddCartItem(donutProduct);
                      alert("🍔🍩 ¡Sugerencia IA agregada al Carrito con precio promocional!");
                    }}>
                      Añadir Sugerencia AI +
                    </button>
                  </div>
                </div>

                <div className="ai-insights-card">
                  <h4><i className="fa-solid fa-brain"></i> NGR AI Insights</h4>
                  <p>
                    Completando este combo acumulas <b>+65 Puntos NGR</b> gracias a la lealtad Multimarca de la categoría <b>Gold Partner</b>.
                  </p>
                  <div className="ai-bar-metric">
                    <span>Ahorro estimado en Delivery: 100%</span>
                    <div className="ai-track"><div className="ai-fill" style={{ width: '100%' }}></div></div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* MARCAS */}
          <section className="private-content" id="populares-section">
            <div className="section-title">
              <h2>Marcas de NGR</h2>
            </div>
            <div className="brands">
              {BRANDS.map((brand, idx) => (
                <div key={idx} className="brand-card" onClick={() => handleOpenBrandPage(brand.name)} style={{ cursor: 'pointer' }}>
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.insertAdjacentHTML('afterend', `<span class="fallback-logo-icon">${brand.fallbackLogo}</span>`);
                    }}
                  />
                  <h3>{brand.name}</h3>
                </div>
              ))}
            </div>

            <div className="section-title" style={{ marginTop: '40px' }}>
              <h2>Los más populares</h2>
              {dietPreference !== 'ninguna' && (
                <span className="active-diet-tag">
                  🎯 Filtro Inteligente IA: {dietPreference === 'vege' && 'Vegetariano'}
                  {dietPreference === 'sin-lactosa' && 'Sin Lactosa'}
                  {dietPreference === 'bajo-sodio' && 'Bajo en Sodio'}
                  <button onClick={() => setDietPreference('ninguna')}>✕</button>
                </span>
              )}
            </div>

            {/* CATEGORIAS (Filtro por Marcas en dos niveles) */}
            <div className="filter-mode-switcher">
              <button
                type="button"
                className={`mode-btn ${filterMode === 'all' ? 'active-mode-btn' : ''}`}
                onClick={() => setFilterMode('all')}
              >
                🌐 Ver todas las marcas
              </button>
              <button
                type="button"
                className={`mode-btn ${filterMode === 'individual' ? 'active-mode-btn' : ''}`}
                onClick={() => setFilterMode('individual')}
              >
                🎯 Ver en individual
              </button>
            </div>

            {filterMode === 'individual' && (
              <div className="individual-brand-selector">
                {BRANDS.map(brand => (
                  <button
                    key={brand.name}
                    type="button"
                    className={`brand-pill-btn ${selectedIndividualBrand === brand.name ? 'active-brand-pill' : ''}`}
                    onClick={() => setSelectedIndividualBrand(brand.name)}
                  >
                    <span className="brand-emoji">{brand.fallbackLogo}</span>
                    {brand.name}
                  </button>
                ))}
              </div>
            )}

            {/* PRODUCTOS (Servicio de Inventario con Stock en vivo) */}
            <div className="products-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className={`product-card ${product.isOutOfStock ? 'card-out-of-stock' : ''}`}>
                  <img src={product.img} alt={product.name} />
                  <div className="product-content">
                    
                    {/* Real-time Inventory Tag */}
                    <div className="stock-sync-container">
                      {product.isOutOfStock ? (
                        <span className="stock-tag tag-out"><i className="fa-solid fa-circle-xmark"></i> Agotado Temporalmente</span>
                      ) : product.stock <= 3 ? (
                        <span className="stock-tag tag-low"><i className="fa-solid fa-triangle-exclamation"></i> ¡Últimas {product.stock} unidades!</span>
                      ) : (
                        <span className="stock-tag tag-in"><i className="fa-solid fa-circle-check"></i> En Stock ({product.stock} disponibles)</span>
                      )}
                    </div>

                    <h3>{product.name}</h3>
                    <p>{product.desc}</p>
                    
                    {/* IA Diet Matching Seal */}
                    {dietPreference !== 'ninguna' && product.diets.includes(dietPreference) && (
                      <div className="diet-seal"><i className="fa-solid fa-circle-check text-green"></i> Aprobado por tu Dieta NGR</div>
                    )}

                    <div className="product-footer">
                      <div className="price">S/ {product.price.toFixed(2)}</div>
                      <button 
                        className="add-btn" 
                        onClick={() => handleAddCartItem(product)}
                        disabled={product.isOutOfStock}
                        title={product.isOutOfStock ? "Producto Agotado" : "Añadir al carrito"}
                      >
                        {product.isOutOfStock ? "✕" : "+"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {filteredProducts.length === 0 && (
                <div className="no-products">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  <p>No se encontraron productos que coincidan con tu búsqueda en esta dieta.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="login-modal" onClick={() => { setShowLoginModal(false); setLoginMode('login'); }}>
          <div className="login-box" style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button className="close-profile-modal" onClick={() => { setShowLoginModal(false); setLoginMode('login'); }}>✕</button>
            
            <div style={{ position: 'absolute', top: '20px', right: '55px' }}>
              {loginMode === 'login' ? (
                <button 
                  onClick={() => setLoginMode('signup')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff6b00',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    transition: '0.2s'
                  }}
                >
                  Crear cuenta
                </button>
              ) : (
                <button 
                  onClick={() => setLoginMode('login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ff6b00',
                    fontWeight: '700',
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    transition: '0.2s'
                  }}
                >
                  Iniciar sesión
                </button>
              )}
            </div>

            {loginMode === 'login' ? (
              <>
                <h2>Iniciar Sesión</h2>
                <p>Selecciona tu rol y accede a la plataforma de NGR.</p>
                
                {/* Roles Select tab */}
                <div className="role-selector-container" style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  {[
                    { id: 'usuario', label: 'Cliente 👤' },
                    { id: 'empleado', label: 'Empleado 🧑‍🍳' },
                    { id: 'administrador', label: 'Admin ⚙️' }
                  ].map(role => (
                    <button
                      key={role.id}
                      type="button"
                      className={`role-tab-btn ${loginType === role.id ? 'active-role-tab' : ''}`}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        background: loginType === role.id ? 'linear-gradient(135deg, #ffc107, #ff6b00)' : 'white',
                        color: loginType === role.id ? 'white' : '#475569',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: 'pointer',
                        transition: '0.3s'
                      }}
                      onClick={() => {
                        setLoginType(role.id);
                        // Autofill credentials for convenient testing!
                        if (role.id === 'usuario') {
                          setEmailInput('alessandrasj@gmail.com');
                          setPasswordInput('123456');
                        } else if (role.id === 'empleado') {
                          setEmailInput('CN133@ngr.com');
                          setPasswordInput('admin123');
                        } else if (role.id === 'administrador') {
                          setEmailInput('admin@ngr.com');
                          setPasswordInput('superadmin123');
                        }
                      }}
                    >
                      {role.label}
                    </button>
                  ))}
                </div>

                {/* Credential hint card */}
                <div className="cred-hint">
                  {loginType === 'usuario' && <span>Acceso como Cliente:<br/><b>alessandrasj@gmail.com</b> / <b>123456</b></span>}
                  {loginType === 'empleado' && <span>Acceso como Colaborador:<br/><b>CN133@ngr.com</b> / <b>admin123</b></span>}
                  {loginType === 'administrador' && <span>Acceso como Admin:<br/><b>admin@ngr.com</b> / <b>superadmin123</b></span>}
                </div>

                <form onSubmit={handleLogin} className="email-login">
                  <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '14px',
                      border: '1px solid #ddd',
                      marginBottom: '15px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '14px',
                      border: '1px solid #ddd',
                      marginBottom: '20px',
                      outline: 'none'
                    }}
                  />
                  
                  <button type="submit" className="continue-btn" style={{
                    width: '100%',
                    padding: '16px',
                    border: 'none',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #ffc107, #ff6b00, #d62828)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>
                    Continuar
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2>Crear Cuenta</h2>
                <p>Completa tus datos para registrarte como cliente NGR y empezar a acumular puntos.</p>

                <form onSubmit={handleSignupSubmit} className="email-login" style={{ marginTop: '20px' }}>
                  <input
                    type="text"
                    placeholder="Nombre Completo *"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '14px',
                      border: '1px solid #ddd',
                      marginBottom: '15px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Correo Electrónico *"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '14px',
                      border: '1px solid #ddd',
                      marginBottom: '15px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="tel"
                    placeholder="Número de Teléfono (Opcional)"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '14px',
                      border: '1px solid #ddd',
                      marginBottom: '15px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="password"
                    placeholder="Contraseña *"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '14px',
                      border: '1px solid #ddd',
                      marginBottom: '20px',
                      outline: 'none'
                    }}
                  />
                  
                  <button type="submit" className="continue-btn" style={{
                    width: '100%',
                    padding: '16px',
                    border: 'none',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #ffc107, #ff6b00, #d62828)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>
                    Registrarse y Continuar
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* BRAND DEDICATED PAGE VIEW */}
      {selectedBrandName && BRAND_DETAILS[selectedBrandName] && (
        <div className="profile-modal-overlay brand-page-overlay">
          <div className="profile-modal-box brand-page-box animate-scale-up" style={{ maxWidth: '580px', width: '90%' }}>
            <button className="close-profile-modal" onClick={handleCloseBrandPage}>✕</button>
            
            {/* Brand Cover Photo */}
            <div className="brand-page-hero" style={{ 
              backgroundImage: `url(${BRAND_DETAILS[selectedBrandName].cover})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '180px',
              borderRadius: '20px',
              position: 'relative',
              marginBottom: '25px',
              overflow: 'hidden'
            }}>
              <div className="brand-hero-overlay" style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))'
              }}></div>
              
              <div className="brand-hero-title-block" style={{
                position: 'absolute',
                bottom: '20px',
                left: '25px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <div className="brand-logo-circle" style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                  fontSize: '28px'
                }}>
                  {BRANDS.find(b => b.name === selectedBrandName)?.fallbackLogo || "🍔"}
                </div>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: '800', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.3)', color: 'white' }}>{selectedBrandName}</h1>
                  <span style={{ fontSize: '11px', opacity: 0.9, fontWeight: '600', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '10px' }}>
                    Desde {BRAND_DETAILS[selectedBrandName].founded}
                  </span>
                </div>
              </div>
            </div>

            {/* Historical Context Section */}
            <div className="profile-section-block" style={{ paddingBottom: '20px', borderBottom: '1px solid #edf2f7', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.8px', color: '#ff6b00', textTransform: 'uppercase', marginBottom: '8px' }}>
                <i className="fa-solid fa-book-open" style={{ marginRight: '6px' }}></i> Nuestra Historia & Tradición
              </h3>
              <p className="panel-sub" style={{ fontSize: '13px', lineHeight: '1.6', color: '#475569', margin: 0 }}>
                {BRAND_DETAILS[selectedBrandName].history}
              </p>
              <div className="brand-slogan-box" style={{ 
                marginTop: '12px', 
                background: '#fff8f0', 
                borderLeft: '4px solid #ff6b00', 
                padding: '8px 15px', 
                borderRadius: '0 8px 8px 0', 
                fontStyle: 'italic',
                fontSize: '12.5px',
                color: '#b45309',
                fontWeight: '600'
              }}>
                "{BRAND_DETAILS[selectedBrandName].slogan}"
              </div>
            </div>
 
            {/* BRAND MILESTONES TIMELINE */}
            <div className="profile-section-block" style={{ paddingBottom: 0, borderBottom: 'none', marginBottom: 0 }}>
              <h3 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '0.8px', color: '#ff6b00', textTransform: 'uppercase', marginBottom: '15px' }}>
                <i className="fa-solid fa-timeline" style={{ marginRight: '6px' }}></i> Hitos Históricos de la Marca
              </h3>
              
              <div className="timeline-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid #e2e8f0', marginLeft: '10px' }}>
                {BRAND_MILESTONES[selectedBrandName]?.map((m, idx) => (
                  <div key={idx} className="timeline-node animate-fade-in" style={{ position: 'relative' }}>
                    {/* Pulsing dot */}
                    <div style={{ 
                      position: 'absolute', 
                      left: '-26px', 
                      top: '3px', 
                      width: '10px', 
                      height: '10px', 
                      borderRadius: '50%', 
                      background: '#ff6b00',
                      boxShadow: '0 0 8px #ff6b00'
                    }}></div>
                    
                    <strong style={{ fontSize: '13px', color: '#ff6b00', display: 'block', marginBottom: '2px' }}>{m.year} - {m.title}</strong>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0, lineHeight: '1.4' }}>{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROMOTION DETAILS MODAL */}
      {selectedPromotion && (
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
                  onClick={() => {
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
                  }}
                >
                  Añadir Dúo 2x1 al Carrito (S/ 24.90) 🍔🍔
                </button>
              )}
              
              {selectedPromotion.id === 2 && (
                <button 
                  className="btn-confirm-checkout" 
                  style={{ flex: 1, padding: '14px', fontSize: '13px', background: 'linear-gradient(135deg, #00c853, #009624)' }}
                  onClick={() => {
                    setActiveCouponCode("YAPE15");
                    setCouponDiscount(15.00);
                    triggerToast("📱 ¡Descuento Yape de S/ 15.00 activado en tu carrito!", "success");
                    setSelectedPromotion(null);
                    setShowCartDrawer(true);
                  }}
                >
                  Activar Descuento Yape de S/ 15.00 📱
                </button>
              )}

              {selectedPromotion.id === 3 && (
                <button 
                  className="btn-confirm-checkout" 
                  style={{ flex: 1, padding: '14px', fontSize: '13px', background: 'linear-gradient(135deg, #0284c7, #0369a1)' }}
                  onClick={() => {
                    setDeliveryCost(0.00);
                    triggerToast("🚚 ¡Delivery Gratuito activado en tu orden actual!", "success");
                    setSelectedPromotion(null);
                    setShowCartDrawer(true);
                  }}
                >
                  Activar Delivery Gratis 🚚
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* LOYALTY PROFILE MODAL (Servicio de Clientes y Lealtad - Mi Perfil) */}
      {showProfileModal && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-box animate-fade">
            <button className="close-profile-modal" onClick={() => setShowProfileModal(false)}>✕</button>
            
            <div className="profile-header-meta">
              <div className="profile-avatar-big" style={{ background: avatarColor, transition: 'background 0.3s ease' }}>
                {userName ? userName.split(' ').map(n => n[0]).join('') : 'U'}
              </div>
              <div>
                <h2 style={{ margin: 0 }}>{userName || 'Usuario NGR'}</h2>
                {userMotto && (
                  <p style={{ margin: '2px 0 6px 0', fontSize: '12px', fontStyle: 'italic', color: '#64748b', fontWeight: '500' }}>
                    "{userMotto}"
                  </p>
                )}
                <span className="loyalty-badge-gold" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.2)' }}>
                  <i className="fa-solid fa-circle-check"></i> Cuenta Verificada NGR
                </span>
              </div>
            </div>

            {/* ESTADÍSTICAS Y ACTIVIDAD DE CUENTA */}
            <div style={{ 
              background: 'linear-gradient(135deg, #fffcf9, #fff5eb)', 
              border: '1px solid #ffe3cb', 
              borderRadius: '18px', 
              padding: '16px', 
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '15px',
              textAlign: 'center'
            }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Pedidos NGR</span>
                <strong style={{ fontSize: '20px', color: '#ff6b00', fontWeight: '800' }}>14 <span style={{ fontSize: '12px', fontWeight: '600' }}>órdenes</span></strong>
              </div>
              <div style={{ width: '1px', height: '35px', background: '#ffe3cb' }}></div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Miembro NGR</span>
                <strong style={{ fontSize: '16px', color: '#ff6b00', fontWeight: '800' }}>Mayo 2026</strong>
              </div>
              <div style={{ width: '1px', height: '35px', background: '#ffe3cb' }}></div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '10.5px', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Sello Favorito</span>
                <strong style={{ fontSize: '13px', color: '#ff6b00', fontWeight: '800', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {userFavoriteDish.replace('Hamburguesas ', '').replace('Pizza ', '').replace('Pollo ', '').replace('Chifas ', '').replace('Donuts ', '')}
                </strong>
              </div>
            </div>

            {/* PERSONAL DATA & AVATAR CUSTOMIZATION */}
            <div className="profile-section-block" style={{ background: '#fff9f5', border: '1px solid #ffe8d6', borderRadius: '18px', padding: '16px', marginBottom: '20px' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff6b00', margin: '0 0 12px 0', fontSize: '13px', fontWeight: '800', textTransform: 'uppercase' }}>
                <i className="fa-solid fa-user-pen"></i> Datos Personales y Personalización
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* 2-Column fields for Name & Email */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Nombre Completo</label>
                    <input 
                      type="text" 
                      value={userName} 
                      onChange={(e) => setUserName(e.target.value)} 
                      placeholder="Escribe tu nombre..."
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1.5px solid #ebdcd3',
                        fontSize: '13px',
                        outline: 'none',
                        background: 'white',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                      onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                    />
                  </div>

                  <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Correo Electrónico</label>
                    <input 
                      type="email" 
                      value={userEmail} 
                      onChange={(e) => setUserEmail(e.target.value)} 
                      placeholder="correo@ejemplo.com"
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1.5px solid #ebdcd3',
                        fontSize: '13px',
                        outline: 'none',
                        background: 'white',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                      onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                    />
                  </div>
                </div>

                {/* 2-Column fields for Phone & Birthday */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Número de Teléfono</label>
                    <input 
                      type="text" 
                      value={userPhone} 
                      onChange={(e) => setUserPhone(e.target.value.replace(/\D/g, ''))} 
                      placeholder="987 654 321"
                      maxLength="9"
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1.5px solid #ebdcd3',
                        fontSize: '13px',
                        outline: 'none',
                        background: 'white',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                      onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                    />
                  </div>

                  <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Cumpleaños 🎂</label>
                    <input 
                      type="date" 
                      value={userBirthdate} 
                      onChange={(e) => setUserBirthdate(e.target.value)} 
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1.5px solid #ebdcd3',
                        fontSize: '13px',
                        outline: 'none',
                        background: 'white',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                      onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                    />
                  </div>
                </div>

                {/* 2-Column fields for Motto & Favorite Brand */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Lema Foodie Personal 🍕</label>
                    <input 
                      type="text" 
                      value={userMotto} 
                      onChange={(e) => setUserMotto(e.target.value)} 
                      placeholder="¡Frase o lema favorito!"
                      maxLength="45"
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1.5px solid #ebdcd3',
                        fontSize: '13px',
                        outline: 'none',
                        background: 'white',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                      onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                    />
                  </div>

                  <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Marca Favorita NGR</label>
                    <select 
                      value={userFavoriteDish} 
                      onChange={(e) => setUserFavoriteDish(e.target.value)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1.5px solid #ebdcd3',
                        fontSize: '13px',
                        outline: 'none',
                        background: 'white',
                        transition: 'border-color 0.2s',
                        height: '41px'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#ff6b00'}
                      onBlur={(e) => e.target.style.borderColor = '#ebdcd3'}
                    >
                      <option value="Hamburguesas Bembos">Bembos 🍔</option>
                      <option value="Pizza Papa Johns">Papa Johns 🍕</option>
                      <option value="Pollo Belisario">Don Belisario 🍗</option>
                      <option value="Chifas China Wok">China Wok 🥡</option>
                      <option value="Donuts Dunkin">Dunkin 🍩</option>
                      <option value="Pollo Popeyes">Popeyes 🍗</option>
                    </select>
                  </div>
                </div>

                {/* Avatar Color Picker */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748b' }}>Personaliza el Color de tu Avatar</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {AVATAR_COLORS.map((col, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setAvatarColor(col.value);
                          triggerToast(`🎨 ¡Color de avatar actualizado a ${col.name}!`, "success");
                        }}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: col.value,
                          border: avatarColor === col.value ? '2.5px solid #ff6b00' : '1px solid #cbd5e1',
                          cursor: 'pointer',
                          boxShadow: avatarColor === col.value ? '0 0 8px rgba(255, 107, 0, 0.4)' : 'none',
                          transform: avatarColor === col.value ? 'scale(1.15)' : 'none',
                          transition: 'transform 0.2s, border-color 0.2s'
                        }}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* PREFERENCIAS Y NOTIFICACIONES */}
            <div className="profile-section-block" style={{ borderTop: '1px solid #edf2f7', paddingTop: '20px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#ff6b00', textTransform: 'uppercase', marginBottom: '12px' }}>
                <i className="fa-solid fa-sliders" style={{ marginRight: '6px' }}></i> Preferencias y Ajustes de Cuenta
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Preferred Language */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '12.5px', color: '#334155', display: 'block' }}>Idioma de Preferencia</strong>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Idioma del catálogo y notificaciones</span>
                  </div>
                  <select 
                    value={userLanguage} 
                    onChange={(e) => setUserLanguage(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '10px',
                      border: '1.5px solid #ebdcd3',
                      fontSize: '12.5px',
                      background: 'white',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Español">Español 🇵🇪</option>
                    <option value="English">English 🇺🇸</option>
                  </select>
                </div>

                {/* Email Toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '12.5px', color: '#334155', display: 'block' }}>Recibir Ofertas Exclusivas</strong>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Descuentos y novedades de marcas NGR por email</span>
                  </div>
                  <label className="switch-toggle" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '22px' }}>
                    <input 
                      type="checkbox" 
                      checked={emailPromoOptIn} 
                      onChange={(e) => {
                        setEmailPromoOptIn(e.target.checked);
                        triggerToast(e.target.checked ? "📧 Suscrito a ofertas NGR!" : "🔕 Cancelaste suscripción a ofertas.", "info");
                      }} 
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      inset: 0,
                      backgroundColor: emailPromoOptIn ? '#ff6b00' : '#cbd5e1',
                      borderRadius: '34px',
                      transition: '0.3s'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '""',
                        height: '16px',
                        width: '16px',
                        left: emailPromoOptIn ? '20px' : '4px',
                        bottom: '3px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: '0.3s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}></span>
                    </span>
                  </label>
                </div>

                {/* Whatsapp Toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '12.5px', color: '#334155', display: 'block' }}>Alertas de Pedido por WhatsApp</strong>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Sincronización GPS en tiempo real de tu delivery</span>
                  </div>
                  <label className="switch-toggle" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '22px' }}>
                    <input 
                      type="checkbox" 
                      checked={whatsappOptIn} 
                      onChange={(e) => {
                        setWhatsappOptIn(e.target.checked);
                        triggerToast(e.target.checked ? "💬 Alertas de entrega activas por WhatsApp!" : "🔕 Alertas de WhatsApp desactivadas.", "info");
                      }} 
                      style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      inset: 0,
                      backgroundColor: whatsappOptIn ? '#ff6b00' : '#cbd5e1',
                      borderRadius: '34px',
                      transition: '0.3s'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '""',
                        height: '16px',
                        width: '16px',
                        left: whatsappOptIn ? '20px' : '4px',
                        bottom: '3px',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: '0.3s',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}></span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FAVORITES MODAL (Mis Antojos Favoritos 💖) */}
      {showFavoritesModal && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-box animate-fade">
            <button className="close-profile-modal" onClick={() => setShowFavoritesModal(false)}>✕</button>
            
            <div className="profile-header-meta">
              <div className="profile-avatar-big" style={{ background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}>
                <i className="fa-solid fa-heart"></i>
              </div>
              <div>
                <h2>Mis Antojos Favoritos</h2>
                <span className="loyalty-badge-gold" style={{ background: '#fff1f2', color: '#e11d48', border: '1px solid rgba(225, 29, 72, 0.15)' }}>
                  <i className="fa-solid fa-heart text-red"></i> 3 Platos Guardados
                </span>
              </div>
            </div>

            <p className="panel-sub" style={{ marginTop: '-15px' }}>
              Estos son los platos que has marcado con un corazón. Nuestra IA NGR predice que son tu combinación perfecta para el fin de semana.
            </p>

            <div className="favorites-scroll-list">
              {favoritesList.map(fav => (
                <div key={fav.id} className="history-row-item fav-row-item">
                  <div className="fav-cell-left">
                    <span className="fav-emoji-icon">{fav.icon}</span>
                    <div className="fav-meta">
                      <strong>{fav.name}</strong>
                      <p>{fav.desc}</p>
                    </div>
                  </div>
                  <div className="fav-cell-right-block">
                    <strong className="fav-item-price">S/ {fav.price.toFixed(2)}</strong>
                    <button className="btn-fav-add" onClick={() => {
                      const prodObj = productsList.find(p => p.id === fav.id);
                      if(prodObj) {
                        handleAddCartItem(prodObj);
                        triggerToast(`💖 "${fav.name}" agregado al carrito.`);
                      }
                    }}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="favorites-action-footer">
              <button className="btn-auto-combo-favorites" onClick={handleAddAllFavorites}>
                <i className="fa-solid fa-wand-magic-sparkles"></i> Agregar Todos (Auto-Combo IA NGR)
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ADDRESSES MODAL (Mis Direcciones de Entrega 🏠) */}
      {showAddressesModal && (
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
      )}

      {/* ORDERS MODAL (Mis Pedidos NGR 🧾) */}
      {showOrdersModal && (
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
      )}

      {/* PÁGINA DE MÉTODOS DE PAGO */}
      {showPaymentPage && (
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

                  {/* Real-time Luxury Credit Card Preview (Innovative Addition!) */}
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
                        <img 
                          src={newCard.type === 'visa' ? "/img/logos/visa-logo.png" : "/img/logos/mastercard-logo.png"} 
                          alt={newCard.type} 
                          className="card-logo-small"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            if (newCard.type === 'visa') {
                              e.target.insertAdjacentHTML('afterend', `<svg viewBox="0 0 120 40" width="55" height="18"><path fill="white" d="M14.6 30.6l3.7-21.2H12.5l-3.7 21.2h5.8zm23.8-20.7c-1.1-.4-2.8-.8-4.9-.8-5.4 0-9.2 2.7-9.2 6.6 0 2.9 2.7 4.5 4.8 5.5 2.1 1 2.8 1.6 2.8 2.5 0 1.4-1.8 2-3.4 2-2.3 0-3.5-.3-5.4-1.1l-.8 4.3c1.3.6 3.7 1.1 6.2 1.1 5.7 0 9.4-2.7 9.4-6.9 0-2.3-1.4-4-4.7-5.5-2.2-1-3.5-1.7-3.5-2.8 0-1 .1-2.1 2.4-2.1.9 0 2.6.2 3.8.7l.5-4.4c-1.1-.3-2.6-.5-3.8-.5zm23.1.2h-4.4c-1.4 0-2.4.4-3 1.7L46.8 30.6h6.1l1.2-3.2h7.5l.7 3.2h5.4L61.5 10.1zm-8.8 13.5l2.4-6.3.8 6.3h-3.2zm24.1-13.5l-4.7 20.5h5.8l4.7-20.5h-5.8z" /><path fill="white" d="M5.4 10.1L.1 30.6h5.8L11.2 10.1H5.4z" opacity="0.9" /></svg>`);
                            } else {
                              e.target.insertAdjacentHTML('afterend', `<svg viewBox="0 0 100 60" width="40" height="24"><circle cx="33" cy="30" r="28" fill="white" opacity="0.8" /><circle cx="67" cy="30" r="28" fill="white" opacity="0.9" /><path d="M50 8.4A28 28 0 0 1 61.8 30 28 28 0 0 1 50 51.6 28 28 0 0 1 38.2 30 28 28 0 0 1 50 8.4z" fill="#FFF" opacity="0.7" /></svg>`);
                            }
                          }}
                        />
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
                      <img 
                        src="/img/logos/visa-logo.png" 
                        alt="Visa" 
                        className="card-logo-small"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.insertAdjacentHTML('afterend', `<svg viewBox="0 0 120 40" width="60" height="20"><path fill="${newCard.type === 'visa' ? '#1a1f71' : '#a09890'}" d="M14.6 30.6l3.7-21.2H12.5l-3.7 21.2h5.8zm23.8-20.7c-1.1-.4-2.8-.8-4.9-.8-5.4 0-9.2 2.7-9.2 6.6 0 2.9 2.7 4.5 4.8 5.5 2.1 1 2.8 1.6 2.8 2.5 0 1.4-1.8 2-3.4 2-2.3 0-3.5-.3-5.4-1.1l-.8 4.3c1.3.6 3.7 1.1 6.2 1.1 5.7 0 9.4-2.7 9.4-6.9 0-2.3-1.4-4-4.7-5.5-2.2-1-3.5-1.7-3.5-2.8 0-1 .1-2.1 2.4-2.1.9 0 2.6.2 3.8.7l.5-4.4c-1.1-.3-2.6-.5-3.8-.5zm23.1.2h-4.4c-1.4 0-2.4.4-3 1.7L46.8 30.6h6.1l1.2-3.2h7.5l.7 3.2h5.4L61.5 10.1zm-8.8 13.5l2.4-6.3.8 6.3h-3.2zm24.1-13.5l-4.7 20.5h5.8l4.7-20.5h-5.8z" /><path fill="#f79e1b" d="M5.4 10.1L.1 30.6h5.8L11.2 10.1H5.4z" /></svg>`);
                        }}
                      />
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
                      <img 
                        src="/img/logos/mastercard-logo.png" 
                        alt="Mastercard" 
                        className="card-logo-small"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.insertAdjacentHTML('afterend', `<svg viewBox="0 0 100 60" width="45" height="27"><circle cx="33" cy="30" r="28" fill="#EB001B" /><circle cx="67" cy="30" r="28" fill="#F79E1B" opacity="0.9" /><path d="M50 8.4A28 28 0 0 1 61.8 30 28 28 0 0 1 50 51.6 28 28 0 0 1 38.2 30 28 28 0 0 1 50 8.4z" fill="#FF5F00" /></svg>`);
                        }}
                      />
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
                            <img 
                              src={card.type === 'visa' ? "/img/logos/visa-logo.png" : "/img/logos/mastercard-logo.png"} 
                              alt={card.type} 
                              className="card-logo-small"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                if (card.type === 'visa') {
                                  e.target.insertAdjacentHTML('afterend', `<svg viewBox="0 0 120 40" width="55" height="18" style="display: block"><path fill="white" d="M14.6 30.6l3.7-21.2H12.5l-3.7 21.2h5.8zm23.8-20.7c-1.1-.4-2.8-.8-4.9-.8-5.4 0-9.2 2.7-9.2 6.6 0 2.9 2.7 4.5 4.8 5.5 2.1 1 2.8 1.6 2.8 2.5 0 1.4-1.8 2-3.4 2-2.3 0-3.5-.3-5.4-1.1l-.8 4.3c1.3.6 3.7 1.1 6.2 1.1 5.7 0 9.4-2.7 9.4-6.9 0-2.3-1.4-4-4.7-5.5-2.2-1-3.5-1.7-3.5-2.8 0-1 .1-2.1 2.4-2.1.9 0 2.6.2 3.8.7l.5-4.4c-1.1-.3-2.6-.5-3.8-.5zm23.1.2h-4.4c-1.4 0-2.4.4-3 1.7L46.8 30.6h6.1l1.2-3.2h7.5l.7 3.2h5.4L61.5 10.1zm-8.8 13.5l2.4-6.3.8 6.3h-3.2zm24.1-13.5l-4.7 20.5h5.8l4.7-20.5h-5.8z" /><path fill="white" d="M5.4 10.1L.1 30.6h5.8L11.2 10.1H5.4z" opacity="0.9" /></svg>`);
                                } else {
                                  e.target.insertAdjacentHTML('afterend', `<svg viewBox="0 0 100 60" width="40" height="24" style="display: block"><circle cx="33" cy="30" r="28" fill="white" opacity="0.8" /><circle cx="67" cy="30" r="28" fill="white" opacity="0.9" /></svg>`);
                                }
                              }}
                            />
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
                      <img 
                        src="/img/logos/Falabella-logo.png" 
                        alt="Falabella" 
                        className="bank-logo"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = 'bank-logo-visual falabella-visual';
                          fallback.innerHTML = '<span>CMR</span>';
                          e.target.parentNode.insertBefore(fallback, e.target.nextSibling);
                        }}
                      />
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
                      <img 
                        src="/img/logos/bcp-logo.png" 
                        alt="BCP" 
                        className="bank-logo"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = 'bank-logo-visual bcp-visual';
                          fallback.innerHTML = '<span>BCP</span>';
                          e.target.parentNode.insertBefore(fallback, e.target.nextSibling);
                        }}
                      />
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
                      <img 
                        src="/img/logos/interbank-logo.png" 
                        alt="Interbank" 
                        className="bank-logo"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          const fallback = document.createElement('div');
                          fallback.className = 'bank-logo-visual interbank-visual';
                          fallback.innerHTML = '<span>ib</span>';
                          e.target.parentNode.insertBefore(fallback, e.target.nextSibling);
                        }}
                      />
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
      )}

      {/* USER SETTINGS MODAL (Ajustes de Perfil / Dieta IA ⚙️) */}
      {showSettingsModal && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-box animate-fade">
            <button className="close-profile-modal" onClick={() => setShowSettingsModal(false)}>✕</button>
            
            <div className="profile-header-meta">
              <div className="profile-avatar-big" style={{ background: 'linear-gradient(135deg, #475569, #334155)' }}>
                <i className="fa-solid fa-gear"></i>
              </div>
              <div>
                <h2>Configuración de Perfil</h2>
                <span className="loyalty-badge-gold" style={{ background: '#f1f5f9', color: '#475569', border: '1px solid rgba(71, 85, 105, 0.15)' }}>
                  Ajustes Inteligentes IA
                </span>
              </div>
            </div>

            <p className="panel-sub" style={{ marginTop: '-15px' }}>
              Personaliza tu experiencia de compras NGR. Nuestro motor de IA optimizará las sugerencias basándose en estos parámetros.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); triggerToast("⚙️ Preferencias guardadas y sincronizadas con IA NGR", "success"); setShowSettingsModal(false); }} className="settings-user-form">
              
              {/* Diet selection preference */}
              <div className="profile-section-block">
                <h3>Preferencia Alimenticia (Filtro IA)</h3>
                <p className="panel-sub">El sistema prioritizará los platos que coincidan con tu dieta y colocará alertas de escasez y recomendación</p>
                <div className="diet-options-grid">
                  {[
                    { id: 'ninguna', label: 'Ninguna (Dieta estándar)' },
                    { id: 'vege', label: 'Vegetariano' },
                    { id: 'sin-lactosa', label: 'Sin Lactosa' },
                    { id: 'bajo-sodio', label: 'Bajo en Sodio' }
                  ].map(opt => (
                    <label key={opt.id} className={`diet-radio-card ${dietPreference === opt.id ? 'active-radio' : ''}`}>
                      <input 
                        type="radio" 
                        name="diet-pref" 
                        value={opt.id}
                        checked={dietPreference === opt.id}
                        onChange={() => {
                          setDietPreference(opt.id);
                          if (opt.id === 'ninguna') {
                            triggerToast("🥗 Filtro de dieta desactivado", "info");
                          } else {
                            const label = opt.id === 'vege' ? 'Vegetariano' : opt.id === 'sin-lactosa' ? 'Sin Lactosa' : 'Bajo en Sodio';
                            triggerToast(`🎯 IA activó dieta: ${label}`, "info");
                          }
                        }}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Toggles settings */}
              <div className="profile-section-block">
                <h3>Ajustes de Plataforma</h3>
                
                <div className="sett-toggle-row">
                  <div>
                    <strong>Notificaciones GPS por WhatsApp</strong>
                    <span className="form-help">Recibe la localización en tiempo real de tu repartidor NGR</span>
                  </div>
                  <label className="switch-toggle-custom">
                    <input 
                      type="checkbox" 
                      checked={whatsappNotifications}
                      onChange={() => setWhatsappNotifications(!whatsappNotifications)}
                    />
                    <span className="slider-round-custom"></span>
                  </label>
                </div>

                <div className="sett-toggle-row" style={{ marginTop: '15px' }}>
                  <div>
                    <strong>Pago Rápido 1-Click (Visa/Yape)</strong>
                    <span className="form-help">Habilita compras inmediatas saltándote el checkout convencional</span>
                  </div>
                  <label className="switch-toggle-custom">
                    <input 
                      type="checkbox" 
                      checked={oneClickPay}
                      onChange={() => setOneClickPay(!oneClickPay)}
                    />
                    <span className="slider-round-custom"></span>
                  </label>
                </div>
              </div>

              <div className="favorites-action-footer">
                <button type="submit" className="btn-auto-combo-favorites" style={{ background: 'var(--grad-primary)' }}>
                  Guardar Preferencias
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* SHOPPING CART DRAWER (Cajón Lateral del Carrito 🛒) */}
      {showCartDrawer && (
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
                        if (donutProd) handleAddCartItem(donutProd);
                        alert("🍩 ¡Donut Box añadida al Carrito!");
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
      )}

      {/* Toast Notification Container */}
      {toast.show && (
        <div className={`ngr-toast-notification toast-${toast.type} animate-slide-up`}>
          <div className="toast-content-box">
            <i className={`fa-solid ${
              toast.type === 'success' ? 'fa-circle-check text-green animate-bounce' : 
              toast.type === 'info' ? 'fa-circle-info text-blue' : 'fa-circle-exclamation text-yellow'
            } toast-icon`}></i>
            <span className="toast-message-text">{toast.message}</span>
          </div>
          <div className="toast-progress-bar"></div>
        </div>
      )}

      {/* Simulated Premium Checkout Overlay */}
      {checkoutStep && (
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
                    <div className="t-row"><span>Fecha:</span><strong>24/05/2026</strong></div>
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
      )}

    </div>
  );
}

export default App;
