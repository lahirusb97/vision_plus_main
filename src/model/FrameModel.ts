// types.ts or models/frame.ts

interface StockModel {
  id: number; // Unique stock ID
  frame: number; // Reference to the associated frame ID
  qty: number; // Available quantity in stock
  initial_count: number; // Initial stock count
  limit: number; // Stock limit (e.g., threshold for low stock)
}

interface FrameModel {
  id: number; // Unique frame ID
  brand: number; // Reference to the brand ID
  code: number; // Code for the frame
  color: number; // Color ID for the frame
  price: string; // Price of the frame (as string for precision)
  size: string; // Size (e.g., "Half", "Full")
  species: string; // Species (e.g., "Metal", "Plastic")
  image: string | null; // Optional image URL or null if no image
  stock: StockModel; // Stock details for this frame
}

export type { FrameModel, StockModel };
