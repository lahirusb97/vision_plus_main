// OrderLiteReportModel.ts

export interface OrderLiteModel {
  id: number;
  customer_name: string;
  branch_name: string;
  order_date: string; // ISO date string, e.g., "2025-06-01T12:34:56.000Z"
  status: string; // e.g., "pending", "processing", etc.
  progress_status: string; // e.g., "received_from_customer", etc.
  total_price: string; // It's a string in Django serializer for Decimal fields
  issued_by: number | null; // user ID, or null
  issued_by_username: string | null;
  issued_date: string | null; // ISO date string, or null
  urgent: boolean;
  invoice_number: string | null;
  total_payment: string;
  // Optional fields for deactivation/refund report (add if used in serializer)
  is_deleted?: boolean;
  deleted_at?: string | null; // ISO date string or null
  is_refund?: boolean;
  refunded_at?: string | null; // ISO date string or null
  refund_note?: string | null;
}
