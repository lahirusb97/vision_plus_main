import { BranchModel } from "./BranchModel";

export interface FrameStockHistorySerializer {
  id: number;
  frame_id: number;
  brand: string;
  code: string;
  color: string;
  size: string;
  species: string;
  action: "add" | "transfer" | "remove"; // Assuming these are the possible actions
  quantity_changed: number;
  timestamp: string; // ISO 8601 date string
  branch: BranchModel;
  transfer_to: BranchModel | null; // Can be null for 'add' or 'remove' actions
}
