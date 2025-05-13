export type ORDERSTATUS = "pending" | "processing" | "completed" | "cancelled";
export type ProgressStatus =
  | "received_from_customer"
  | "issue_to_factory"
  | "received_from_factory"
  | "issue_to_customer";

export type LensArrivalStatus = "received" | "not_received" | null;
export type InvoiceType = "factory" | "normal";
export type PaymentMethodTypes = "credit_card" | "cash" | "online_transfer";
export type TransactionStatusTypes = "success" | "failed" | "pending";
export type TypeLensSide = "left" | "right" | null;
export type TypeOrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled";
export type TypeBraned = "branded" | "non_branded";
export type TypeWhatappMSG = "sent" | "not_sent" | null;
