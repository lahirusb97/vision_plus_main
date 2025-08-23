import { PatientModel } from "./Patient";

interface RefractionNumberModel {
  id: number;
  customer_full_name: string;
  customer_mobile: string;
  nic: string;
  refraction_number: string;
  branch_id: number;
  created_at: string;
  patient_id: number | null;
  branch_name: string;
  patient: PatientModel | null;
}

export type { RefractionNumberModel };
