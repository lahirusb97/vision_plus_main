export const stringToNumber = (value: string) => {
  const number = parseFloat(value);
  return isNaN(number) ? null : number;
};
