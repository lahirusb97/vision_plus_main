type PaymentMethod = "credit_card" | "cash" | "online_transfer";
type TransactionStatus = "success" | "failed" | "pending";

interface PaymentModel {
  id: number;
  order: number;
  payment_date: string; // ISO date string
  amount: string; // Keeping it as a string to match API response
  payment_method: PaymentMethod;
  transaction_status: TransactionStatus;
  is_partial: boolean;
  is_final_payment: boolean;
}

export type { PaymentModel, PaymentMethod, TransactionStatus };
