import {
  PaymentMethodTypes,
  TransactionStatusTypes,
  TypeLensSide,
  TypeOrderStatus,
} from "./StaticTypeModels";

// Patient Model

export interface Patient {
  refraction_id: number;
  date_of_birth: string;
  name: string;
  phone_number: string;
  address: string | undefined;
  nic: string | undefined;
}
// Order Model
export interface Order {
  refraction: number;
  status: Omit<TypeOrderStatus, "pending" | "completed">;
  sub_total: number;
  discount: number;
  total_price: number;
  order_remark?: string;
  sales_staff_code?: number;
  pd?: string | undefined | null;
  height?: string | undefined | null;
  right_height?: string | undefined | null;
  left_height?: string | undefined | null;
  left_pd?: string | undefined | null;
  right_pd?: string | undefined | null;
  fitting_on_collection: boolean;
  on_hold: boolean;
  branch_id: number;
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
}

export interface OrderItemFrameInput {
  frame: number;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
}

export interface OrderItemExternalLensInput {
  external_lens_data: ExternalLens;
  quantity: number;
  price_per_unit: number;
  subtotal: number;
  note: string | null;
  is_non_stock: boolean;
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
