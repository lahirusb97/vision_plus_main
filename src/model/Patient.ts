interface PatientModel {
  id: number;
  nic: string | null;
  name: string;
  date_of_birth: string | null;
  phone_number: string;
  extra_phone_number: string | null;
  address: string | null;
  patient_note: string | null;
}
export type { PatientModel };
