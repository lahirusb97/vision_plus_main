// type UserBranchModel = Pick<BranchModel, "id" | "branch_name">;

interface DoctorClaimInvoiceReportModel {
  id: number;
  invoice_number: string;
  created_at: string;
  branch: string;
}
interface DoctorClaimChannelReportModel {
  id: number;
  invoice_number: string;
  created_at: string;
  branch: string;
  doctor: number;
  doctor_name: string;
}
export type { DoctorClaimInvoiceReportModel, DoctorClaimChannelReportModel };
