export const planoConvert = (value: string | null | undefined) => {
  if (!value) return "";
  const valuetoNum = parseFloat(value);
  if (valuetoNum === 0) {
    return "Plano";
  } else {
    return value;
  }
};
