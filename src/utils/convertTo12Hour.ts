export function convertTimeTo12Hour(time24: string): string {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert '0' to '12'
  return `${hour}:${minute} ${ampm}`;
}
