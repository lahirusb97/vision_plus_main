export type DoctorScheduleStatus =
  | "Available"
  | "Unavailable"
  | "Booked"
  | "DOCTOR";

export interface DoctorSchedule {
  id: number;
  doctor: number;
  doctor_name: string;
  branch: number;
  branch_name: string;
  date: string; // Format: YYYY-MM-DD
  start_time: string; // Format: hh:mm A
  status: DoctorScheduleStatus; // You can refine enum based on real values
  created_at: string; //
  updated_at: string; //
}
