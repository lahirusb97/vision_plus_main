interface CustomerDetails {
  id: number;
  name: string;
  date_of_birth: string; // ISO date format "YYYY-MM-DD"
  phone_number: string;
  address: string;
  nic: string;
  refraction_id: number;
}

interface RefractionDetails {
  id: number;
  customer_full_name: string;
  customer_mobile: string;
  refraction_number: string;
}

interface OrderItem {
  id: number;
  order: number;
  lens: number | null;
  lens_cleaner: number | null;
  frame: number | null;
  quantity: number;
  price_per_unit: string; // Decimal as string
  subtotal: string; // Decimal as string
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
  customer_details: CustomerDetails;
  refraction_details: RefractionDetails;
  invoice_type: string; // Consider enum: 'factory' | 'retail' | 'wholesale'
  daily_invoice_no: number;
  invoice_date: string; // ISO datetime format
  order_details: OrderDetails;
  order_items: OrderItem[];
  order_payments: OrderPayment[];
}

export type { Invoice };
