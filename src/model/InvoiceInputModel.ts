import {
  PaymentMethodTypes,
  ProgressStatus,
  TransactionStatusTypes,
  TypeLensSide,
  TypeOrderStatus,
  TypeWhatappMSG,
} from "./StaticTypeModels";

// Patient Model

export interface Patient {
  refraction_id: number;
  date_of_birth: string | null;
  name: string;
  phone_number: string | null;
  address: string | null;
  nic: string | null;
}
// Order Model
export interface Order {
  refraction: number;
  status: Omit<TypeOrderStatus, "pending" | "completed">;
  sub_total: number;
  discount: number;
  total_price: number;
  order_remark: string | null;
  sales_staff_code?: number;
  pd?: string | null;
  height?: string | null;
  right_height?: string | null;
  left_height?: string | null;
  left_pd?: string | null;
  right_pd?: string | null;
  fitting_on_collection: boolean;
  on_hold: boolean;
  branch_id: number;
  user_date: string | null;
  bus_title: number | null;
  progress_status: ProgressStatus;
}

// External Lens Model
export interface ExternalLens {
  lens: {
    type: number;
    coating: number;
    brand: number;
    price: number;
  };
  powers: {
    power: number;
    value: number;
    side: TypeLensSide;
  }[];
}

// Order Item Model (Lens, Frame, External Lens)
export interface OrderItemLensInput {
  lens: number;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  is_non_stock: boolean;
  whatsapp_sent?: null;
}

export interface OrderItemFrameInput {
  frame: number;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  is_non_stock: boolean;
  whatsapp_sent?: null;
}

export interface OrderItemExternalLensInput {
  external_lens_data: ExternalLens;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  note: string | null;
  is_non_stock: boolean;
  whatsapp_sent: TypeWhatappMSG;
}

export type OrderItemInput =
  | OrderItemLensInput
  | OrderItemFrameInput
  | OrderItemExternalLensInput;

// Payment Model
export interface OrderPayment {
  amount: number;
  payment_method: PaymentMethodTypes;
  transaction_status: TransactionStatusTypes;
}

// Full Order Model
export interface FactoryOrderInputModel {
  patient: Patient;
  order: Order;
  order_items: OrderItemInput[];
  order_payments: OrderPayment[];
}
