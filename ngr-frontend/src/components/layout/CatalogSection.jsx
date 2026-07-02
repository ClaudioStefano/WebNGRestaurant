import React from 'react';

function CatalogSection({
  BRANDS,
  handleOpenBrandPage,
  dietPreference,
  setDietPreference,
  filterMode,
  setFilterMode,
  selectedIndividualBrand,
  setSelectedIndividualBrand,
  filteredProducts,
  handleAddCartItem
}) {
  return (
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
  );
}

export default CatalogSection;
