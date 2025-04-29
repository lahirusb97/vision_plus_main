type Item = {
  id: number;
  name: string;
  price: string;
  is_active: boolean;
};
type Stock = {
  id: number;
  other_item: Item;
  initial_count: number;
  qty: number;
  limit: number;
};
export type OtherItemModel = {
  item: Item;
  stock: Stock[];
};
