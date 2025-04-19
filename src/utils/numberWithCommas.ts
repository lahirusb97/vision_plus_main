export function numberWithCommas(value: number | string | undefined) {
  // Convert value to an integer
  if (typeof value == "number") {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else if (typeof value == "string") {
    const parsedValue = parseInt(value);
    return parsedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (value === undefined || isNaN(value)) return "Invalid number";

  // Format with commas
}
