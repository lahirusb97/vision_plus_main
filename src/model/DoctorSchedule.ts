export type DoctorScheduleStatus = "Available" | "Unavailable" | "Booked";

export interface DoctorSchedule {
  id: number;
  doctor: number;
  doctor_name: string;
  branch: number;
  branch_name: string;
  date: string; // Format: YYYY-MM-DD
  start_time: string; // Format: HH:mm:ss
  status: DoctorScheduleStatus; // You can refine enum based on real values
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
