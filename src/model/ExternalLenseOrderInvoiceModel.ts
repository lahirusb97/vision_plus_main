import { PaymentModel } from "./PaymentModel";
import { ProgressStatus, TypeWhatappMSG } from "./StaticTypeModels";

export interface ExternalLenseOrderInvoiceModel {
  id: number;
  external_lens: number;
  quantity: number;
  price_per_unit: string;
  subtotal: string;
  whatsapp_sent: TypeWhatappMSG;
  order_id: number;
  invoice_number: string;
  invoice_date: string;
  branch_name: string;
  customer_name: string;
  total_price: string;
  payments: PaymentModel[];
  progress_status: ProgressStatus;
  on_hold: boolean;
  fitting_on_collection: boolean;
  urgent: boolean;
}
