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
  coating: number;
  price: string;
  brand: number;
  stock: Stock;
  powers: Power[];
}

export type { Power, Stock, LenseModel };
