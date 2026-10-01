function DeleteConfirmation({ itemName, onCancel, onConfirm, open }) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <h3>Delete dish</h3>
        <p>
          This confirmation step helps prevent accidental menu changes when someone is deleting a dish.
        </p>
        <p>
          Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="danger-button" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
