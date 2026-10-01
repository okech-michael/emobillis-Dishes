import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteConfirmation from '../components/DeleteConfirmation';
import DishCard from '../components/DishCard';
import DishModal from '../components/DishModal';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { deleteDish, getDishes } from '../services/api';

function Dishes() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishToDelete, setDishToDelete] = useState(null);
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availableFilter, setAvailableFilter] = useState('');

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const categories = useMemo(
    () => [...new Set(dishes.map((dish) => dish.category).filter(Boolean))],
    [dishes],
  );

  const loadDishes = async () => {
    // Load the dish list whenever the filters or search text changes.
    setLoading(true);
    setError('');

    try {
      const data = await getDishes({
        search: searchTerm,
        category: categoryFilter,
        available: availableFilter,
      });
      setDishes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Dishes load error:', err);
      setError(err.message || 'Unable to load dishes right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDishes();
  }, [searchTerm, categoryFilter, availableFilter]);

  const handleDelete = async () => {
    // Ask before deleting so the user does not remove a dish by accident.
    if (!dishToDelete) return;

    try {
      await deleteDish(dishToDelete.id);
      setDishes((current) => current.filter((dish) => dish.id !== dishToDelete.id));
      setSuccessMessage(`Deleted ${dishToDelete.name}.`);
      setDishToDelete(null);
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message || 'Could not delete the dish.');
      setDishToDelete(null);
    }
  };

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h1>Dishes</h1>
        </div>
      </div>

      {successMessage ? <div className="success-banner">{successMessage}</div> : null}

      <div className="toolbar">
        <input
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search dishes"
          aria-label="Search dishes"
        />

        <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select value={availableFilter} onChange={(event) => setAvailableFilter(event.target.value)} aria-label="Filter by availability">
          <option value="">All availability</option>
          <option value="true">Available</option>
          <option value="false">Unavailable</option>
        </select>
      </div>

      {loading ? <Loading message="Loading dishes..." /> : null}
      {!loading && error ? <ErrorMessage message={error} onRetry={loadDishes} /> : null}

      {!loading && !error && dishes.length === 0 ? (
        <div className="empty-state">
          <h3>No dishes found</h3>
          <p>Try another search or add a new dish.</p>
        </div>
      ) : null}

      {!loading && !error ? (
        <div className="dish-grid">
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onView={setSelectedDish}
              onEdit={(id) => navigate(`/dishes/${id}/edit`)}
              onDelete={setDishToDelete}
            />
          ))}
        </div>
      ) : null}

      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
      <DeleteConfirmation
        itemName={dishToDelete?.name || ''}
        open={Boolean(dishToDelete)}
        onCancel={() => setDishToDelete(null)}
        onConfirm={handleDelete}
      />
    </section>
  );
}

export default Dishes;
