export type HearingItemModel = {
  id: number;
  name: string;
  price: string;
  is_active: boolean;
  warranty: string;
  code: string | null;
};
type Stock = {
  id: number;
  initial_count: number;
  qty: number;
  branch_id: number;
  limit: number;
};
export type HearingItemStockSerializer = {
  item: HearingItemModel;
  stock: Stock[];
};
