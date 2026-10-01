export function formatPrice(value) {
  const numericValue = Number(value ?? 0);

  return `KSh ${numericValue.toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
