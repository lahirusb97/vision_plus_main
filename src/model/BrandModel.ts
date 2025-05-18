import { TypeInStockBrand } from "./StaticTypeModels";

interface BrandModel {
  id: number;
  name: string;
  brand_type: TypeInStockBrand;
}

export type { BrandModel };
