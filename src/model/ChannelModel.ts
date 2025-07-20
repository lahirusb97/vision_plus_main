import { PaymentMethodTypes, TransactionStatusTypes } from "./StaticTypeModels";
//TODO NEED TO CHANGE IT this new rq body is large
export interface ChannelPaymentModel {
  id: number;
  appointment: number;
  appointment_details: string;
  doctor_name: string;
  patient_name: string;
  payment_date: string; // ISO date string
  amount: string; // Can be changed to number if parsed
  payment_method: PaymentMethodTypes;
  is_final: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChannelFullDetailModel {
  id: number;
  doctor: number;
  doctor_name: string;
  patient: number;
  patient_name: string;
  address: string;
  contact_number: string;
  schedule: number;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm:ss"
  status: TransactionStatusTypes;
  amount: string; // Consider using number if needed
  channel_no: number;
  invoice_number: number;
  payments: ChannelPaymentModel[];
  note: string | null;
  created_at: string;
}
