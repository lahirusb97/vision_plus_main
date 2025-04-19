import { PaymentMethodTypes, TransactionStatusTypes } from "./StaticTypeModels";

interface PaymentModel {
  id: number;
  order: number;
  payment_date: string; // ISO date string
  amount: string; // Keeping it as a string to match API response
  payment_method: PaymentMethodTypes;
  transaction_status: TransactionStatusTypes;
  is_partial: boolean;
  is_final_payment: boolean;
}

export type { PaymentModel };
