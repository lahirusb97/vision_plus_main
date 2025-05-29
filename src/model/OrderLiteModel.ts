import { ProgressStatus } from "./StaticTypeModels";

export interface OrderLiteModel {
  id: number;
  order: number;
  customer_name: string;
  branch_name: string;
  order_date: string;
  status: string;
  progress_status: ProgressStatus;
  total_price: string;
  issued_by_id: number | null;
  issued_by_username?: string;
  issued_by_user_code?: string;
  issued_date: string | null;
  invoice_number: string;
}
