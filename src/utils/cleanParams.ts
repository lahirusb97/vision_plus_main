export const cleanParams = (
  params: Record<string, string | number | null | undefined>
): Record<string, string | number> => {
  return Object.fromEntries(
    Object.entries(params).filter(([value]) => value != null) as [
      string,
      string | number
    ][]
  );
};
