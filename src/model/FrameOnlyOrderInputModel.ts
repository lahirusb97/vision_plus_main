import {
  PaymentMethodTypes,
  ProgressStatus,
  TransactionStatusTypes,
} from "./StaticTypeModels";

interface Patient {
  date_of_birth: string | null;
  name: string;
  phone_number: string | null;
  address: string | null;
  nic: string | null;
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
  progress_status: ProgressStatus;
}
