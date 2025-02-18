interface RefractionModel {
  id: number;
  customer_full_name: string;
  customer_mobile: string;
  refraction_number: string;
}

interface RefractionResponseModel {
  count: number;
  next: string | null;
  previous: string | null;
  results: RefractionModel[];
}

export type { RefractionModel, RefractionResponseModel };
