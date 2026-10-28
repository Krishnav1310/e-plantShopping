import React from 'react';
import './PlantImageModal.css';

function PlantImageModal({ plant, onClose, onAddToCart, isInCart }) {
  if (!plant) return null;

  return (
    <div className="plant-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-plant-title">
      <div className="plant-modal-card" onClick={(e) => e.stopPropagation()}>
        <button 
          type="button" 
          className="plant-modal-close-btn" 
          onClick={onClose} 
          aria-label="Close plant preview"
        >
          &times;
        </button>

        <div className="plant-modal-image-column">
          <img 
            src={plant.image} 
            alt={plant.name} 
            className="plant-modal-image"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="%23eef7ee"><rect width="100%" height="100%" fill="%23f0fdf4"/><circle cx="300" cy="200" r="110" fill="%23dcfce7"/><path d="M300 120 C340 160, 360 210, 300 260 C240 210, 260 160, 300 120 Z" fill="%23166534"/><path d="M300 140 L300 245" stroke="%2386efac" stroke-width="4"/><text x="300" y="310" font-family="sans-serif" font-size="18" font-weight="bold" fill="%2314532d" text-anchor="middle">Paradise Nursery Specimen</text></svg>';
            }}
          />
          <span className="plant-modal-price-tag">{plant.cost}</span>
        </div>

        <div className="plant-modal-info-column">
          <div className="plant-modal-badge">Botanical Specimen</div>
          <h2 id="modal-plant-title" className="plant-modal-title">{plant.name}</h2>
          
          <p className="plant-modal-desc">{plant.description}</p>
          
          <div className="plant-care-features">
            <div className="care-feature-item">
              <span className="care-icon">💧</span>
              <div>
                <strong>Watering</strong>
                <p>1-2 times weekly when soil top is dry</p>
              </div>
            </div>
            <div className="care-feature-item">
              <span className="care-icon">☀️</span>
              <div>
                <strong>Sunlight</strong>
                <p>Bright indirect to ambient daylight</p>
              </div>
            </div>
            <div className="care-feature-item">
              <span className="care-icon">🌱</span>
              <div>
                <strong>Nursery Soil</strong>
                <p>Nutrient-rich organic compost mix</p>
              </div>
            </div>
          </div>

          <div className="plant-modal-actions">
            <button
              type="button"
              className={`plant-modal-add-btn ${isInCart ? 'in-cart' : ''}`}
              disabled={isInCart}
              onClick={() => onAddToCart(plant)}
            >
              {isInCart ? '✓ Already in Cart' : `Add ${plant.name} to Cart • ${plant.cost}`}
            </button>
            <button 
              type="button" 
              className="plant-modal-back-btn" 
              onClick={onClose}
            >
              Back to Catalog
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlantImageModal;
