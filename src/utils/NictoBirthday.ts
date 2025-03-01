export function getBirthdateFromNIC(nic: string | null): string {
  if (!nic || (nic.length > 10 && nic.length !== 12)) {
    return ""; // Invalid NIC input
  }

  let year: number, days: number;

  if (nic.length === 10) {
    // Old NIC format: 9 digits + 'V' or 'X' (e.g., "97285461V")
    year = 1900 + parseInt(nic.substring(0, 2)); // Convert to number
    days = parseInt(nic.substring(2, 5)); // Extract the day number
  } else if (nic.length === 12) {
    // New NIC format: 12 digits (e.g., "199728546123")
    year = parseInt(nic.substring(0, 4)); // Convert to number
    days = parseInt(nic.substring(4, 7)); // Extract the day number
  } else {
    return ""; // Invalid NIC format
  }

  // Adjust for females (days > 500 means female)
  if (days > 500) {
    days -= 500;
  }

  // Validate day number (should be within 1-366)
  if (days < 1 || days > 366) {
    return "";
  }

  // Find the birthdate
  const birthdate = new Date(year, 0, days); // Convert year to a number

  // Check for Invalid Date
  if (isNaN(birthdate.getTime())) {
    return "";
  }

  // Format as YYYY-MM-DD
  return birthdate.toISOString().split("T")[0];
}
