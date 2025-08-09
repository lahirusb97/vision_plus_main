interface PatientModel {
  id: number;
  nic: string | null;
  name: string;
  date_of_birth: string | null;
  phone_number: string;
  extra_phone_number: string | null;
  address: string | null;
  refraction_id: number | null;
  refraction_number: string | null;
  patient_note: string | null;
}
export type { PatientModel };
