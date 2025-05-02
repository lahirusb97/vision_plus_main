export function paramsNullCleaner<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => value !== null && value !== undefined && value !== ""
    )
  ) as Partial<T>;
}
