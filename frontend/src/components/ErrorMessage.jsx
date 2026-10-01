function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" role="alert">
      <strong>Something went wrong</strong>
      <p>{message}</p>
      {onRetry ? (
        <button type="button" className="secondary-button" onClick={onRetry}>
          Try again
        </button>
      ) : null}
    </div>
  );
}

export default ErrorMessage;
