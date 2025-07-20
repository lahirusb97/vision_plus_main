export interface ChannelPaymentReport {
  channel_id: number;
  channel_no: number;
  amount_cash: number;
  amount_credit_card: number;
  amount_online: number;
  total_paid: number;
  total_due: number;
  balance: number;
  appointment_id: number;
  invoice_number: string;
  is_deleted: boolean;
  is_refund: boolean;
}
