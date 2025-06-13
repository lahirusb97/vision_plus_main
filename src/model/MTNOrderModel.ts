export interface MntOrderModel {
  id: number;
  mnt_number: string;
  created_at: string;
  user_username: string | null;
  admin_username: string;
  mnt_price: string;
}
