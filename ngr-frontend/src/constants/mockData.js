export const CITIES = [
  "Lima Metropolitana", "Arequipa", "Trujillo", "Chiclayo", "Piura", 
  "Cusco", "Huancayo", "Tacna", "Iquitos", "Pucallpa", 
  "Chimbote", "Huaraz", "Cajamarca", "Juliaca", "Ayacucho", 
  "Tarapoto", "Tumbes", "Puno"
];

export const CITY_DISTRICTS = {
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

export const PROMOTIONS = [
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

export const BRANDS = [
  { name: "Bembos", logo: "img/logos/Bembos_logo15.png", fallbackLogo: "🍔" },
  { name: "Don Belisario", logo: "img/logos/5857738527a350b7b08bdd3ffcfdbd37.jpg", fallbackLogo: "🍗" },
  { name: "China Wok", logo: "img/logos/China_Wok_logo.svg.png", fallbackLogo: "🥡" },
  { name: "Popeyes", logo: "img/logos/popeyes-37670.png", fallbackLogo: "🍗" },
  { name: "Papa Johns", logo: "img/logos/png-clipart-papa-johns-logo-restaurant-logos.png", fallbackLogo: "🍕" },
  { name: "Dunkin", logo: "img/logos/png-clipart-dunkin-donuts-logo-dunkin-donuts-logo-icons-logos-emojis-iconic-brands.png", fallbackLogo: "🍩" }
];

export const INITIAL_PRODUCTS = [
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

export const BRAND_DETAILS = {
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

export const BRAND_MILESTONES = {
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

export const AVATAR_COLORS = [
  { name: 'Naranja NGR', value: 'linear-gradient(135deg, #ffc107, #ff6b00, #d62828)' },
  { name: 'Cereza Eléctrica', value: 'linear-gradient(135deg, #ec4899, #f43f5e)' },
  { name: 'Azul BCP', value: 'linear-gradient(135deg, #0f2b5c, #051026)' },
  { name: 'Esmeralda', value: 'linear-gradient(135deg, #10b981, #059669)' },
  { name: 'Púrpura Galáctico', value: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
  { name: 'Turquesa Océano', value: 'linear-gradient(135deg, #06b6d4, #0891b2)' },
  { name: 'Oro Falabella', value: 'linear-gradient(135deg, #eab308, #ca8a04)' },
  { name: 'Carbono Elegante', value: 'linear-gradient(135deg, #475569, #1e293b)' }
];
