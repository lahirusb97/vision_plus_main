import { SizeType, SpeciesType } from "./FrameModel";
import { Power } from "./LenseModel";
import { MntOrderModel } from "./MTNOrderModel";
import { PatientModel } from "./Patient";
import { PaymentModel } from "./PaymentModel";
import { ProgressStatusModel } from "./progressStatusModel";
import { RefractionDetailModel } from "./RefractionDetailModel";
import {
  InvoiceType,
  LensArrivalStatus,
  TypeBraned,
  TypeFittingStatus,
  TypeOrderStatus,
} from "./StaticTypeModels";

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
  size: SizeType;
  species: SpeciesType;
  image: string | null;
  brand_type_display: string;
  brand_type: TypeBraned;
}
interface OtherItemDetail {
  id: number;
  name: string;
  price: string;
  is_active: boolean;
}

export interface FrameOrderItem {
  frame: number;
  frame_detail: FrameDetail;
  lens: null;
  other_item: null;
  lens_detail: null;
  lens_powers: [];
  external_lens: null;
  external_lens_name: null;
  external_lens_powers: [];
  note: string | null;
  other_item_detail: null;
  // Other shared fields
  id: number;
  order: number;
  quantity: number;
  price_per_unit: string;
  subtotal: string;

  user: number | null;
  admin: number | null;
  user_username?: string;
  admin_username?: string;
  deleted_at?: string;
}
export interface NormalOrderItem {
  frame: null;
  frame_detail: null;
  lens: null;
  other_item: number;
  lens_powers: [];
  lens_detail: null;
  external_lens: null;
  external_lens_name: null;
  external_lens_powers: [];
  other_item_detail: OtherItemDetail;
  note: string | null;
  // Other shared fields
  id: number;
  order: number;
  quantity: number;
  price_per_unit: string;
  subtotal: string;

  user: number | null;
  admin: number | null;
  user_username?: string;
  admin_username?: string;
  deleted_at?: string;
}
export interface LensOrderItem {
  lens: number;
  lens_detail: LensDetail;
  lens_powers: Power[];
  frame: null;
  other_item: null;
  frame_detail: null;
  external_lens: null;
  external_lens_name: null;
  external_lens_powers: [];
  note: string | null;
  other_item_detail: null;
  // Other shared fields
  id: number;
  order: number;
  quantity: number;
  price_per_unit: string;
  subtotal: string;

  user: number | null;
  admin: number | null;
  user_username?: string;
  admin_username?: string;
  deleted_at?: string;
}

export interface ExternalLensOrderItem {
  external_lens: number;
  type_name: string;
  coating_name: string;
  brand_name: string;
  quantity: number;
  other_item: null;
  price_per_unit: string;
  subtotal: string;
  is_non_stock: boolean;
  note: string | null;
  other_item_detail: null;
  // Other shared fields
  frame: null;
  frame_detail: null;
  lens: null;
  lens_detail: null;
  external_lens_name: string | null;
  ex_branded_type: TypeBraned;
  id: number;
  order: number;
  lens_powers: Power[] | null;
  branded_display?: string;
  user: number | null;
  admin: number | null;
  user_username?: string;
  admin_username?: string;
  deleted_at?: string;
}

type OrderItem =
  | FrameOrderItem
  | LensOrderItem
  | ExternalLensOrderItem
  | NormalOrderItem;

interface OrderDetails {
  id: number;
  customer: number;
  refraction: number;
  order_date: string; // ISO datetime format
  order_updated_date: string; // ISO datetime format
  status: TypeOrderStatus; // Consider enum: 'pending' | 'completed' | 'cancelled'
  sub_total: string; // Decimal as string
  discount: string; // Decimal as string
  total_price: string; // Decimal as string
  order_items: OrderItem[];
  order_payments: PaymentModel[];
  sales_staff_code: number | null;
  branch_id: number;
  branch_name: string;
  order_remark: string;
  pd: string | null;
  height: string | null;
  right_height: string | null;
  left_height: string | null;
  left_pd: string | null;
  right_pd: string | null;
  fitting_on_collection: false;
  on_hold: false;
  sales_staff_username: string;
  user_date: string | null;
  bus_title: number | null;
  bus_title_name?: string;
  progress_status: ProgressStatusModel;
  fitting_status: TypeFittingStatus;
  fitting_status_updated_date: string;
  urgent: boolean;
  mnt_order: MntOrderModel;
}

interface Invoice {
  id: number;
  order: number;
  customer: number;
  invoice_number: string;
  customer_details: PatientModel;
  refraction_details?: RefractionDetailModel | null;
  invoice_type: InvoiceType; // Consider enum: 'factory' | 'retail' | 'wholesale'
  daily_invoice_no: number;
  invoice_date: string; // ISO datetime format
  order_details: OrderDetails;
  order_items: OrderItem[];
  lens_arrival_status: LensArrivalStatus;
  whatsapp_sent: boolean;
}

export type { Invoice, OrderItem };
