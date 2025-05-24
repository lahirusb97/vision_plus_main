import { TypeFittingStatus } from "../model/StaticTypeModels";

export function formatFittingStatus(status: TypeFittingStatus | null) {
  if (!status) return "-";
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
