interface PatientModel {
  id: number;
  nic: string | null;
  name: string;
  date_of_birth: string | null;
  phone_number: string;
  address: string | null;
  refraction_id: number | null;
}
export type { PatientModel };
