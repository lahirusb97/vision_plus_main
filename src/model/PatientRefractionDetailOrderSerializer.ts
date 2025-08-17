import { PatientModel } from "./Patient";
import { RefractionDetailModel } from "./RefractionDetailModel";
import { RefractionNumberModel } from "./RefractionModel";

export interface PatientRefractionDetailOrderSerializer {
  id: number;
  invoice_number: string;
  refraction_details: RefractionDetailModel;
  patient: PatientModel;
  total_price: number;
  order_date: string;
  refraction: RefractionNumberModel;
  total_paid: number;
}
