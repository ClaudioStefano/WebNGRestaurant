import React from 'react';

function FavoritesModal({
  showFavoritesModal,
  setShowFavoritesModal,
  favoritesList,
  productsList,
  handleAddCartItem,
  handleAddAllFavorites,
  triggerToast
}) {
  if (!showFavoritesModal) return null;

  return (
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
              <i className="fa-solid fa-heart text-red"></i> {favoritesList.length} Platos Guardados
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
                  if (prodObj) {
                    handleAddCartItem(prodObj);
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
  );
}

export default FavoritesModal;
