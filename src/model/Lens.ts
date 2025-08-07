import { BranchModel } from "./BranchModel";

export interface LensStockHistorySerializer {
  id: number;
  lens_id: number;
  size: string;
  action: "add" | "transfer" | "remove";
  quantity_changed: number;
  timestamp: string;
  branch: BranchModel;
  transfer_to: BranchModel | null;
}
