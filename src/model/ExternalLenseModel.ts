// Lens information
interface Lens {
  type: number;
  coating: number;
  brand: number;
  price: number;
}
interface LensNames {
  typeName: string;
  coatingName: string;
  brandName: string;
}

// Power details for each eye
interface Power {
  power: number;
  value: number;
  side: string | null;
}

// External lens data containing lens details and powers
interface ExternalLensData {
  lens: Lens;
  powers: Power[];
}

// Main model for the entire structure
interface ExternalLenseModel {
  id: number; //added by index
  external_lens_data: ExternalLensData;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  is_non_stock: boolean;
  lensNames: LensNames;
}

export type { ExternalLenseModel };
