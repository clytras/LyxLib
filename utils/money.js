export function formatToCents(value) {
  value = (value + '').replace(/[^\d.-]/g, '');
  if (value && value.includes('.')) {
    value = value.substring(0, value.indexOf('.') + 3);
  }

  return value ? Math.round(parseFloat(value) * 100) : 0;
}

export function formatFromCents(value) {
  value = (value + '').replace(/[^\d.-]/g, '');
  value = parseFloat(value);
  return value ? value / 100 : 0;
}

export function moneyToCents(value, pressicion = 2) {
  return Math.round(parseFloat(parseFloat(value).toFixed(pressicion)) * 100);
}
