import { useEffect, useState } from 'react';

const emptyForm = {
  name: '',
  description: '',
  category: '',
  price: '',
  image_url: '',
  is_available: true,
};

function DishForm({ initialData, onSubmit, submitLabel = 'Save Dish', isSubmitting = false }) {
  const [formData, setFormData] = useState(initialData || emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // A shared form component is reused for both create and edit flows, so it must react to the
    // record that is passed in before the user starts editing.
    setFormData(initialData || emptyForm);
  }, [initialData]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function validate() {
    // Catch common input mistakes before sending a request to the API.
    const nextErrors = {};

    if (!formData.name || !formData.name.trim()) {
      nextErrors.name = 'Dish name is required.';
    }

    if (!formData.category || !formData.category.trim()) {
      nextErrors.category = 'Category is required.';
    }

    if (!formData.description || !formData.description.trim()) {
      nextErrors.description = 'Description is required.';
    }

    if (formData.price === '' || Number(formData.price) <= 0) {
      nextErrors.price = 'Price must be greater than 0.';
    }

    // URL validation is kept intentionally light because the project uses a local static image flow,
    // but a broken URL is still worth catching early to prevent a poor user experience.
    if (formData.image_url && !/^https?:\/\//i.test(formData.image_url.trim())) {
      nextErrors.image_url = 'Please provide a valid URL.';
    }

    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSubmit({
      ...formData,
      name: formData.name.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      image_url: formData.image_url.trim(),
      price: Number(formData.price),
    });
  }

  return (
    <form className="dish-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="field-group">
          <label htmlFor="name">Dish name</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
          {errors.name ? <span className="field-error">{errors.name}</span> : null}
        </div>

        <div className="field-group">
          <label htmlFor="category">Category</label>
          <input id="category" name="category" type="text" value={formData.category} onChange={handleChange} />
          {errors.category ? <span className="field-error">{errors.category}</span> : null}
        </div>

        <div className="field-group">
          <label htmlFor="price">Price</label>
          <input id="price" name="price" type="number" step="0.01" min="0.01" value={formData.price} onChange={handleChange} />
          {errors.price ? <span className="field-error">{errors.price}</span> : null}
        </div>

        <div className="field-group">
          <label htmlFor="image_url">Image URL</label>
          <input id="image_url" name="image_url" type="url" value={formData.image_url} onChange={handleChange} />
          {errors.image_url ? <span className="field-error">{errors.image_url}</span> : null}
        </div>

        <div className="field-group full-width">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
          {errors.description ? <span className="field-error">{errors.description}</span> : null}
        </div>

        <div className="field-group checkbox-group">
          <label htmlFor="is_available">Available</label>
          <input id="is_available" name="is_available" type="checkbox" checked={Boolean(formData.is_available)} onChange={handleChange} />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-button" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default DishForm;
