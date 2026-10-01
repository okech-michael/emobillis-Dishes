const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

function getErrorMessage(data) {
  if (!data) return 'Something went wrong.';
  if (typeof data.detail === 'string') return data.detail;
  if (Array.isArray(data.non_field_errors)) return data.non_field_errors.join(' ');

  // DRF returns validation errors by field, so turn them into one readable message for the UI.
  return Object.values(data)
    .flat()
    .filter((message) => typeof message === 'string')
    .join(' ') || 'Something went wrong.';
}

async function request(endpoint, options = {}) {
  // Keep HTTP details here so pages only need to handle data and user actions.
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const contentType = response.headers.get('Content-Type') || '';
  const data = contentType.includes('application/json') ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data;
}

export function getDishes(params = {}) {
  // Send search and filter values to Django as query parameters.
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      search.append(key, String(value));
    }
  });

  const queryString = search.toString();
  return request(`/dishes/${queryString ? `?${queryString}` : ''}`);
}

export function getDish(id) {
  // Fetch one record so the edit form can be pre-filled.
  return request(`/dishes/${id}/`);
}

export function createDish(data) {
  // Send a new dish to Django for validation and storage.
  return request('/dishes/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateDish(id, data) {
  // Replace the selected dish with the values from the edit form.
  return request(`/dishes/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function deleteDish(id) {
  // Delete the selected dish after the user confirms the action.
  return request(`/dishes/${id}/`, {
    method: 'DELETE',
  });
}
