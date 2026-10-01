import { formatPrice } from '../utils/formatters';

function DishModal({ dish, onClose }) {
  if (!dish) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <button type="button" className="close-button" onClick={onClose} aria-label="Close dish details">
          ×
        </button>

        <div className="modal-hero">
          {dish.image_url ? (
            <img src={dish.image_url} alt={dish.name} onError={(event) => { event.target.style.display = 'none'; }} />
          ) : (
            <div className="image-placeholder">No image</div>
          )}
        </div>

        <div className="modal-content">
          <div className="title-row">
            <h3>{dish.name}</h3>
            <span className={`status-pill ${dish.is_available ? 'available' : 'unavailable'}`}>
              {dish.is_available ? 'Available' : 'Unavailable'}
            </span>
          </div>

          <p className="meta-line">{dish.category}</p>
          <p className="price-tag">{formatPrice(dish.price)}</p>
          <p>{dish.description}</p>
        </div>
      </div>
    </div>
  );
}

export default DishModal;
