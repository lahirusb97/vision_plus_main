export type ORDERSTATUS = "pending" | "processing" | "completed" | "cancelled";
export type ProgressStatus =
  | "received_from_customer"
  | "Received from Customer"
  | "issue_to_factory"
  | "received_from_factory"
  | "issue_to_customer";

export type LensArrivalStatus = "received" | "not_received" | null;
export type InvoiceType = "factory" | "normal";
