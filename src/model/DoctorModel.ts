export interface DoctorModel {
  id: number;
  name: string;
  contact_info: string;
  status: DoctorStatus;
}
type DoctorStatus = "available" | "unavailable";
