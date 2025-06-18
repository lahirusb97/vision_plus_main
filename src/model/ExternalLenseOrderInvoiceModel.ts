import { PaymentModel } from "./PaymentModel";
import { ProgressStatusModel } from "./progressStatusModel";
import { ProgressStatus } from "./StaticTypeModels";

interface WhatsAppSent {
  id: number;
  status: "sent" | "mnt_marked";
  created_at: string;
}
interface ArrivalStatus {
  id: number;
  arrival_status: "received" | "mnt_marked";
  created_at: string;
}
export interface ExternalLenseOrderInvoiceModel {
  id: number;
  external_lens: number;
  quantity: number;
  price_per_unit: string;
  subtotal: string;
  order_id: number;
  invoice_number: string;
  invoice_date: string;
  branch_name: string;
  customer_name: string;
  total_price: string;
  payments: PaymentModel[];
  progress_status: ProgressStatusModel;
  on_hold: boolean;
  fitting_on_collection: boolean;
  urgent: boolean;
  whatsapp_sent: WhatsAppSent | null;
  arrival_status: ArrivalStatus | null;
}
