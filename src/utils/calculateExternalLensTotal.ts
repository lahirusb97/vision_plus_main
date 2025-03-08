import { ExternalLenseModel } from "../model/ExternalLenseModel";

export const calculateExternalLensTotal = (
  lenses: ExternalLenseModel[]
): number => {
  return lenses.reduce((total, lens) => total + lens.subtotal, 0);
};
