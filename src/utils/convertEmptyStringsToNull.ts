export const convertEmptyStringsToNull = (
  obj: Record<string, any>
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === "" || value === undefined || value === null ? null : value,
    ])
  );
};
