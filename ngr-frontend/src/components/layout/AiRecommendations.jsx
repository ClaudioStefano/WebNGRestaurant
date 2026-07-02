import React from 'react';

function AiRecommendations({
  isLoggedIn,
  userName,
  productsList,
  handleAddCartItem
}) {
  const handleAddAiCombo = () => {
    const combProduct = productsList.find(p => p.id === 1);
    if (combProduct) handleAddCartItem(combProduct);
    const donutProduct = productsList.find(p => p.id === 11);
    if (donutProduct) handleAddCartItem(donutProduct);
    alert("🍔🍩 ¡Sugerencia IA agregada al Carrito con precio promocional!");
  };

  return (
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
              <button className="btn-ai-add" onClick={handleAddAiCombo}>
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
  );
}

export default AiRecommendations;
