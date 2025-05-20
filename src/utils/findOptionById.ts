// utils/selectHelpers.ts

import { AutocompleteInputWrapperOption } from "../components/common/AutocompleteInputWrapper";

// Convert ID to object for value prop
export function findOptionById(
  options: AutocompleteInputWrapperOption[],
  id: number | null | undefined
): AutocompleteInputWrapperOption | null {
  if (id == null) return null;
  return options.find((opt) => opt.id === id) || null;
}
