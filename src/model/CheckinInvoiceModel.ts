import { ArrivalStatus, WhatsAppSent } from "./ExternalLenseOrderInvoiceModel";
import { PaymentModel } from "./PaymentModel";
import { ProgressStatusModel } from "./progressStatusModel";
import { InvoiceType, TypeFittingStatus } from "./StaticTypeModels";

export interface CheckinInvoiceModel {
  id: number;
  order: number;
  customer: string;
  invoice_type: InvoiceType; // Add other possible types if known
  daily_invoice_no: string;
  invoice_number: string;
  invoice_date: string; // ISO string; use Date if you plan to parse it
  progress_status: ProgressStatusModel; // Extend with other statuses
  lens_arrival_status: string | null; // Change type if the value is more specific
  fitting_on_collection: boolean | null;
  on_hold: boolean | null;
  payments: PaymentModel[];
  total_price: string;
  fitting_status: TypeFittingStatus;
  fitting_status_updated_date: string;
  issued_by_id: number | null;
  issued_by_user_name?: string;
  issued_by_user_code?: string;
  issued_date: string | null;
  whatsapp_sent: WhatsAppSent | null;
  arrival_status: ArrivalStatus | null;
  mnt_number: string | null;
}
