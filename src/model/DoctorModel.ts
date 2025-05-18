export interface DoctorModel {
  id: number;
  name: string;
  contact_info: string | null;
  status: DoctorStatus;
}
type DoctorStatus = "available" | "unavailable";
