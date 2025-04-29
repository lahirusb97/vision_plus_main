import {
  PaymentMethodTypes,
  TransactionStatusTypes,
  TypeOrderStatus,
} from "./StaticTypeModels";

interface Patient {
  date_of_birth?: string;
  name: string;
  phone_number: string;
  address?: string | undefined;
  nic?: string | undefined;
}

interface Order {
  invoice_type: "normal" | "other"; // extend as needed
  status: Omit<TypeOrderStatus, "pending" | "completed">; // extend as needed
  sub_total: number;
  discount: number;
  total_price: number;
  order_remark?: string;
  sales_staff_code?: number;
  branch_id: number;
}

interface OrderItem {
  other_item: number; // item ID reference
  quantity: number;
  price_per_unit: number;
  subtotal: number;
}

interface OrderPayment {
  amount: number;
  payment_method: PaymentMethodTypes; // extend as needed
  transaction_status: TransactionStatusTypes; // extend as needed
}

export interface NormalOrderInputModel {
  patient: Patient;
  order: Order;
  order_items: OrderItem[];
  order_payments: OrderPayment[];
}
