export function numberWithCommas(value) {
  // Convert value to an integer
  const number = parseInt(value, 10);

  // Handle invalid numbers (e.g., null, undefined, NaN)
  if (isNaN(number)) return "Invalid number";

  // Format with commas
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
