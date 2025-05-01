import { PaymentMethodTypes, TransactionStatusTypes } from "./StaticTypeModels";

interface Patient {
  date_of_birth: string;
  name: string;
  phone_number: string;
  address: string | undefined;
  nic: string | undefined;
}
interface OrderPayment {
  amount: number;
  payment_method: PaymentMethodTypes;
  transaction_status: TransactionStatusTypes;
}
export interface FrameOnlyOrderInputModel {
  patient: Patient;
  frame: number;
  quantity: number;
  price_per_unit: number;
  branch_id: number;
  sales_staff_code?: number;
  payments: OrderPayment[];
}
