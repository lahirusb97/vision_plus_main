export interface MntOrderModel {
  id: number;
  /** Underlying order id used for audit history */
  order_id?: number;
  mnt_number: string;
  created_at: string;
  user_username: string | null;
  admin_username: string;
  mnt_price: string;
}
