import { formatPrice } from '../utils/formatters';

function DishCard({ dish, onView, onEdit, onDelete }) {
  return (
    <article className="dish-card">
      <div className="dish-image-wrap">
        {dish.image_url ? (
          <img
            src={dish.image_url}
            alt={dish.name}
            onError={(event) => {
              event.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="image-placeholder">No image</div>
        )}
      </div>

      <div className="dish-card-body">
        <div className="title-row">
          <h3>{dish.name}</h3>
          <span className={`status-pill ${dish.is_available ? 'available' : 'unavailable'}`}>
            {dish.is_available ? 'Available' : 'Unavailable'}
          </span>
        </div>

        <p className="meta-line">{dish.category}</p>
        <p className="dish-description">{dish.description}</p>
        <div className="price-tag">{formatPrice(dish.price)}</div>

        <div className="dish-actions">
          <button type="button" className="secondary-button" onClick={() => onView(dish)}>
            View
          </button>
          <button type="button" className="secondary-button" onClick={() => onEdit(dish.id)}>
            Edit
          </button>
          <button type="button" className="danger-button" onClick={() => onDelete(dish)}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;
