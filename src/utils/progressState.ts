import { ProgressStatus } from "../model/StaticTypeModels";

export const progressStatus = (status: ProgressStatus): string => {
  const statusMap: Record<ProgressStatus, string> = {
    received_from_customer: "Received from Customer",
    issue_to_factory: "Issued to Factory",
    received_from_factory: "Received from Factory",
    issue_to_customer: "Issued to Customer",
  };

  return statusMap[status] || "Unknown Status";
};
