import { useEffect } from "react";
import "./App.css";

function App() {

  useEffect(() => {

    /* LOGIN */

    const button = document.querySelector(".continue-btn");

    if(button){

      button.addEventListener("click", () => {

        const email = document.querySelector(
          'input[type="email"]'
        ).value;

        const password = document.querySelector(
          'input[type="password"]'
        ).value;

        if(
          email === "admin@gmail.com" &&
          password === "123456"
        ){

          document.querySelector(".login-modal").style.display = "none";

          document.querySelector(".nav-right").innerHTML = `

            <div class="user-menu">

              <div class="notification">

                <i class="fa-solid fa-bell"></i>

                <span class="notification-dot"></span>

              </div>

              <div class="user-profile">

                <div class="user-avatar">
                  AS
                </div>

                <div class="user-info">

                  <h4>Alessandra Suarez</h4>

                  <div class="status">

                    <span class="status-dot"></span>

                    <p>Activo</p>

                  </div>

                </div>

                <i class="fa-solid fa-chevron-down"></i>

                <div class="dropdown-menu">

                  <a href="#">
                    <i class="fa-solid fa-user"></i>
                    Mi Perfil
                  </a>

                  <a href="#">
                    <i class="fa-solid fa-box"></i>
                    Mis Pedidos
                  </a>

                  <a href="#">
                    <i class="fa-solid fa-heart"></i>
                    Favoritos
                  </a>

                  <a href="#">
                    <i class="fa-solid fa-location-dot"></i>
                    Direcciones
                  </a>

                  <a href="#">
                    <i class="fa-solid fa-credit-card"></i>
                    Métodos de Pago
                  </a>

                  <a href="#">
                    <i class="fa-solid fa-gear"></i>
                    Configuración
                  </a>

                  <a href="#" id="logoutBtn">
                    <i class="fa-solid fa-right-from-bracket"></i>
                    Cerrar Sesión
                  </a>

                </div>

              </div>

            </div>

          `;

          setTimeout(() => {

            document
              .getElementById("logoutBtn")
              .addEventListener("click", () => {

                location.reload();

            });

          }, 100);

        }else{

          alert("Correo o contraseña incorrectos");

        }

      });

    }

    /* LOCATION */

    const cities = document.querySelectorAll(".city-option");

    const selectedCity =
      document.getElementById("selectedCity");

    cities.forEach(city => {

      city.addEventListener("click", () => {

        selectedCity.innerText = city.innerText;

      });

    });

  }, []);

  return (

    <>

      {/* NAVBAR */}

      <nav>

        <div className="nav-left">

          <div className="logo">

            <div className="logo-circle">
              NGR
            </div>
          </div>

          {/* LOCATION */}

          <div className="location-selector">

            <div className="location-button">

              <i className="fa-solid fa-location-dot"></i>

              <div>

                <p>Enviar a</p>

                <h4 id="selectedCity">
                  Lima Metropolitana
                </h4>

              </div>

              <i className="fa-solid fa-chevron-down"></i>

            </div>

            {/* DROPDOWN */}

            <div className="location-dropdown">

              <div className="city-option">
                Lima Metropolitana
              </div>

              <div className="city-option">
                Arequipa
              </div>

              <div className="city-option">
                Trujillo
              </div>

              <div className="city-option">
                Chiclayo
              </div>

              <div className="city-option">
                Piura
              </div>

              <div className="city-option">
                Cusco
              </div>

              <div className="city-option">
                Huancayo
              </div>

              <div className="city-option">
                Tacna
              </div>

              <div className="city-option">
                Iquitos
              </div>

              <div className="city-option">
                Pucallpa
              </div>

              <div className="city-option">
                Chimbote
              </div>

              <div className="city-option">
                Huaraz
              </div>

              <div className="city-option">
                Cajamarca
              </div>

              <div className="city-option">
                Juliaca
              </div>

              <div className="city-option">
                Ayacucho
              </div>

              <div className="city-option">
                Tarapoto
              </div>

              <div className="city-option">
                Tumbes
              </div>

              <div className="city-option">
                Puno
              </div>

            </div>

          </div>

        </div>

        {/* SEARCH */}

        <div className="search-bar">

          <i className="fa-solid fa-magnifying-glass"></i>

          <input
            type="text"
            placeholder="Buscar hamburguesas, pizzas, promociones..."
          />

        </div>

        {/* USER */}

        <div className="nav-right">

          <button className="login-btn">
            Iniciar Sesión
          </button>

          <div className="cart">

            <i className="fa-solid fa-cart-shopping"></i>

          </div>

        </div>

      </nav>

      {/* HERO */}

      <div className="hero">

        <div className="hero-text">

          <h1>
            "Conectamos tus antojos
            con momentos felices."
          </h1>

          <p>

            Bienvenidos al lugar donde se cocinan
            las mejores experiencias digitales
            de tus restaurantes favoritos.

          </p>

          <button>

            Ver promociones

          </button>

        </div>

        <img
          src="https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=1200&auto=format&fit=crop"
          alt="Hero"
        />

      </div>

      {/* PROMOCIONES */}

      <section>

        <div className="section-title">

          <h2>Promociones</h2>

        </div>

        <div className="promo-grid">

          {/* PROMO 1 */}

          <div className="promo-card">

            <img
              src="/img/2146468775_1.webp"
              className="promo-image"
              alt="Promo"
            />

            <div className="promo-overlay"></div>

            <div className="promo-content">

              <h3>2x1 Bembos</h3>

              <p>

                Aprovecha hamburguesas dobles
                con delivery gratis.

              </p>

            </div>

          </div>

          {/* PROMO 2 */}

          <div className="promo-card">

            <img
              src="/img/Banner-gana-tu-yapa-hd.jpg"
              className="promo-image"
              alt="Promo"
            />

            <div className="promo-overlay"></div>

            <div className="promo-content">

              <h3>Descuento con Yape</h3>

              <p>

                Obtén promociones exclusivas
                pagando con billeteras digitales.

              </p>

            </div>

          </div>

          {/* PROMO 3 */}

          <div className="promo-card">

            <img
              src="/img/686X400.webp"
              className="promo-image"
              alt="Promo"
            />

            <div className="promo-overlay"></div>

            <div className="promo-content">

              <h3>Delivery Gratis</h3>

              <p>

                En pedidos seleccionados
                de Popeyes y Papa Johns.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* MARCAS */}

      <section>

        <div className="section-title">

          <h2>Marcas de NGR</h2>

        </div>

        <div className="brands">

          <div className="brand-card">

            <img
              src="/img/logos/Bembos_logo15.png"
              alt="Bembos"
            />

            <h3>Bembos</h3>

          </div>

          <div className="brand-card">

            <img
              src="/img/logos/5857738527a350b7b08bdd3ffcfdbd37.jpg"
              alt="Don Belisario"
            />

            <h3>Don Belisario</h3>

          </div>

          <div className="brand-card">

            <img
              src="/img/logos/China_Wok_logo.svg.png"
              alt="China Wok"
            />

            <h3>China Wok</h3>

          </div>

          <div className="brand-card">

            <img
              src="/img/logos/popeyes-37670.png"
              alt="Popeyes"
            />

            <h3>Popeyes</h3>

          </div>

          <div className="brand-card">

            <img
              src="/img/logos/png-clipart-papa-johns-logo-restaurant-logos.png"
              alt="Papa Johns"
            />

            <h3>Papa Johns</h3>

          </div>

          <div className="brand-card">

            <img
              src="/img/logos/png-clipart-dunkin-donuts-logo-dunkin-donuts-logo-icons-logos-emojis-iconic-brands.png"
              alt="Dunkin"
            />

            <h3>Dunkin</h3>

          </div>

        </div>

        {/* CATEGORIAS */}

        <div className="categories">

          <div className="category">
            Hamburguesas
          </div>

          <div className="category">
            Combos
          </div>

          <div className="category">
            Pizzas
          </div>

          <div className="category">
            Pollo Broaster
          </div>

          <div className="category">
            Bebidas
          </div>

          <div className="category">
            Postres
          </div>

        </div>

        {/* PRODUCTOS */}

        <div className="products-grid">

          <div className="product-card">

            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop"
              alt="Burger"
            />

            <div className="product-content">

              <h3>Cheese Burger XL</h3>

              <p>

                Hamburguesa premium con queso cheddar,
                carne angus y papas fritas.

              </p>

              <div className="product-footer">

                <div className="price">
                  S/ 24.90
                </div>

                <button className="add-btn">
                  +
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* LOGIN */}

      <div className="login-modal">

        <div className="login-box">

          <h2>Iniciar Sesión</h2>

          <p>

            Continúa para acceder
            a tu cuenta NGR.

          </p>

          <button className="social-btn google">

            <i className="fa-brands fa-google"></i>

            Continuar con Google

          </button>

          <button className="social-btn facebook">

            <i className="fa-brands fa-facebook-f"></i>

            Continuar con Facebook

          </button>

          <div className="email-login">

            <input
              type="email"
              placeholder="Correo electrónico"
            />

            <input
              type="password"
              placeholder="Contraseña"
            />

            <button className="continue-btn">
              Continuar
            </button>

          </div>

        </div>

      </div>

    </>

  );

}

export default App;