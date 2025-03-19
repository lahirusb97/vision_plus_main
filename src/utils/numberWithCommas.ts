export function numberWithCommas(value: number) {
  // Convert value to an integer
  if (typeof value == "number") {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (isNaN(value)) return "Invalid number";

  // Format with commas
}
