const returnPlusSymbol = (value: string | null | undefined) => {
  if (!value) return ""; // empty string, nothing to add
  if (value.trim().startsWith("+")) return ""; // already has plus
  if (value.trim().startsWith("-")) return ""; // negative, don't add plus
  const num = parseFloat(value);
  if (isNaN(num) || num <= 0) return ""; // zero, negative, or invalid
  return "+"; // positive, doesn't start with +
};

export default returnPlusSymbol;
