import { TypeLensSide } from "./StaticTypeModels";

interface Power {
  id: number;
  lens: number;
  power: number;
  value: string;
  side: TypeLensSide;
  power_name: string;
}

interface LenseStock {
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
  branch_id: number;
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
  stock: LenseStock[];
  powers: Power[];
}

export type { Power, LenseStock, LenseModel };
