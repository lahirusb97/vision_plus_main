import { TypeBraned } from "./StaticTypeModels";

export type SpeciesType = "Metal" | "Plastic" | "Metal/Plastic";
export type SizeType = "Half" | "Full" | "Rimless";
interface FrameStockModel {
  id: number; // Unique stock ID
  frame: number; // Reference to the associated frame ID
  qty: number; // Available quantity in stock
  initial_count: number; // Initial stock count
  limit: number; // Stock limit (e.g., threshold for low stock)
  branch_id: number;
  branch_name: string;
}

interface FrameModel {
  id: number; // Unique frame ID
  brand: number; // Reference to the brand ID
  brand_name: string;
  code: number; // Code for the frame
  code_name: string;
  color: number; // Color ID for the frame
  color_name: string;
  price: string; // Price of the frame (as string for precision)
  size: SizeType; // Size (e.g., "Half", "Full")
  species: SpeciesType; // Species (e.g., "Metal", "Plastic")
  image: string | null; // Optional image URL or null if no image
  stock: FrameStockModel[]; // Stock details for this frame
  brand_type: TypeBraned;
  brand_type_display: string;
  image_url: string | null;
  store: number;
}

export type { FrameModel, FrameStockModel };
