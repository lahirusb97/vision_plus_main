import { TypeBraned } from "./StaticTypeModels";

export interface ExternalLensModel {
  id: number;
  branch: null | number;
  lens_type: number;
  lens_type_name: string;
  coating: number;
  coating_name: string;
  brand: number;
  brand_name: string;
  branded: TypeBraned; // assuming this is a string enum like "1" or "0"
  branded_display: string; // display label
  price: string; // if this should be treated as a number, convert it accordingly
  created_at: string; // ISO date
  updated_at: string;
}

interface ExternalLensFilter {
  lens_types: number[];
  coatings: number[];
  branded: TypeBraned; // assuming it's always "0" or "1" as strings
  brands: number[];
}
export interface ExternalLensFilterList {
  results: ExternalLensModel[];
  available_filters: ExternalLensFilter;
}
