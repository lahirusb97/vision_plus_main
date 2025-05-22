import { PatientModel } from "./Patient";
import { PaymentMethodTypes, ProgressStatus } from "./StaticTypeModels";

// SolderingInvoice.ts

export interface SolderingPayment {
  id: number;
  payment_date: string;
  amount: string;
  payment_method: PaymentMethodTypes;
  transaction_status: string;
  is_final_payment: boolean;
  is_partial: boolean;
  is_deleted: boolean;
  deleted_at: string | null;
  order: number;
}

export interface SolderingOrderDetails {
  id: number;
  note: string;
  price: string;
  status: string;
  progress_status: ProgressStatus;
  progress_status_updated_at: string;
  order_date: string;
  order_updated_date: string;
  completed_at: string | null;
  is_deleted: boolean;
  deleted_at: string | null;
  patient: number;
  branch: number;
}

export interface SolderingInvoiceModel {
  id: number;
  invoice_number: string;
  invoice_date: string;
  order_id: number;
  deleted_at: string | null;
  is_deleted: boolean;
  order_details: SolderingOrderDetails;
  payments: SolderingPayment[];
  patient: PatientModel;
}
