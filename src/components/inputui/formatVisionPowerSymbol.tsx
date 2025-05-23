export const formatVisionPowerSymbol = (
  rawValue: string | null | undefined
): string => {
  if (!rawValue) return "";
  // Do not process if already negative or has +, or not a number
  if (
    rawValue.startsWith("-") ||
    rawValue.startsWith("+") ||
    isNaN(Number(rawValue))
  ) {
    return rawValue;
  }
  // Edge cases for zero, dot, empty
  if (rawValue === "0" || rawValue === ".") {
    return rawValue;
  }
  return "+" + rawValue;
};
