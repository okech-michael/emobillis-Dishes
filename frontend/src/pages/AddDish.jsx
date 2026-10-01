import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DishForm from '../components/DishForm';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import { createDish, getDish, updateDish } from '../services/api';

function AddDish({ isEdit = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(Boolean(isEdit));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDish() {
      if (!isEdit || !id) {
        setInitialData(null);
        setLoading(false);
        return;
      }

      try {
        // The edit screen needs the current database record before it can pre-populate the form.
        const dish = await getDish(id);
        setInitialData({
          ...dish,
          price: Number(dish.price).toString(),
        });
      } catch (err) {
        console.error('Dish load error:', err);
        setError(err.message || 'Unable to load the dish details.');
      } finally {
        setLoading(false);
      }
    }

    loadDish();
  }, [id, isEdit]);

  const handleSubmit = async (data) => {
    // The form submission is the boundary between the UI and the API, so we keep the request flow
    // explicit and then redirect back to the catalog after a successful save.
    setIsSubmitting(true);
    setError('');

    try {
      if (isEdit) {
        await updateDish(id, data);
        navigate('/dishes', { state: { message: 'Dish updated successfully.' } });
      } else {
        await createDish(data);
        navigate('/dishes', { state: { message: 'Dish added successfully.' } });
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message || 'Unable to save the dish.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading message={isEdit ? 'Loading dish...' : 'Preparing form...'} />;

  return (
    <section>
      <div className="page-header">
        <div>
          <p className="eyebrow">{isEdit ? 'Update menu item' : 'New dish'}</p>
          <h1>{isEdit ? 'Edit dish' : 'Add a new dish'}</h1>
        </div>
      </div>

      {error ? <ErrorMessage message={error} /> : null}

      <DishForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel={isEdit ? 'Update dish' : 'Add dish'}
        isSubmitting={isSubmitting}
      />
    </section>
  );
}

export default AddDish;
