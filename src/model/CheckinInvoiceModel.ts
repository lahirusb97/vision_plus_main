import { InvoiceType, ProgressStatus } from "./StaticTypeModels";

export interface CheckinInvoiceModel {
  id: number;
  order: number;
  customer: string;
  invoice_type: InvoiceType; // Add other possible types if known
  daily_invoice_no: string;
  invoice_number: string;
  invoice_date: string; // ISO string; use Date if you plan to parse it
  progress_status: ProgressStatus; // Extend with other statuses
  lens_arrival_status: string | null; // Change type if the value is more specific
  whatsapp_sent: boolean;
  fitting_on_collection: boolean | null;
  on_hold: boolean | null;
}
