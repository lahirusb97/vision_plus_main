interface Power {
  id: number;
  lens: number;
  power: number;
  value: string;
  side: string | null;
}

interface Stock {
  id: number;
  lens: number;
  lens_type: string;
  coating: string;
  initial_count: number;
  qty: number;
  limit: number;
  powers: Power[];
  created_at: string;
  updated_at: string;
}

interface LenseModel {
  id: number;
  type: number;
  type_name: string;
  coating: number;
  coating_name: string;
  price: string;
  brand: number;
  brand_name: string;
  stock: Stock[];
  powers: Power[];
}
interface LenseWithQty extends LenseModel {
  buyQty: number;
  lenseSide: string;
}

export type { Power, Stock, LenseModel, LenseWithQty };
