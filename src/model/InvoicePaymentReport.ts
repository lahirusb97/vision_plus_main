export interface InvoicePaymentReport {
  invoice_id: number;
  invoice_number: string;
  invoice_type: "normal" | "factory";
  invoice_date: string;
  order_id: number;
  total_invoice_price: number;
  total_cash_payment: number;
  total_credit_card_payment: number;
  total_online_payment: number;
  total_payment: number;
  balance: number;
  is_deleted: boolean;
  is_refund: boolean;
}
