import { PatientModel } from "./Patient";
import { RefractionDetailCreate } from "./RefractionDetailCreate";
interface LensDetail {
  id: number;
  type: number;
  coating: number;
  price: string;
  brand: number;
  brand_name: string;
  type_name: string;
  coating_name: string;
}

// Types for Frame Details
interface FrameDetail {
  id: number;
  brand: number;
  brand_name: string;
  code: number;
  code_name: string;
  color: number;
  color_name: string;
  price: string;
  size: string;
  species: string;
  image: string | null;
}
interface OrderItem {
  id: number;
  order: number;
  lens: number | null;
  lens_cleaner: number | null;
  lense_name?: string;
  frame_name?: string;
  frame: number | null;
  quantity: number;
  price_per_unit: string; // Decimal as string
  subtotal: string; // Decimal as string
  lens_detail: LensDetail | null;
  frame_detail: FrameDetail | null;
}

interface OrderPayment {
  id: number;
  order: number;
  payment_date: string; // ISO datetime format
  amount: string; // Decimal as string
  payment_method: string; // Consider enum: 'credit_card' | 'cash' | 'check'
  transaction_status: string; // Consider enum: 'success' | 'failed' | 'pending'
  is_partial: boolean;
  is_final_payment: boolean;
}

interface OrderDetails {
  id: number;
  customer: number;
  refraction: number;
  order_date: string; // ISO datetime format
  order_updated_date: string; // ISO datetime format
  status: string; // Consider enum: 'pending' | 'completed' | 'cancelled'
  sub_total: string; // Decimal as string
  discount: string; // Decimal as string
  total_price: string; // Decimal as string
  order_items: OrderItem[];
  order_payments: OrderPayment[];
  sales_staff_code: number | null;
  remark: string;
}

interface Invoice {
  id: number;
  order: number;
  customer: number;
  customer_details: PatientModel;
  refraction_details: RefractionDetailCreate;
  invoice_type: string; // Consider enum: 'factory' | 'retail' | 'wholesale'
  daily_invoice_no: number;
  invoice_date: string; // ISO datetime format
  order_details: OrderDetails;
  order_items: OrderItem[];
  order_payments: OrderPayment[];
  lense_d;
}

export type { Invoice };
