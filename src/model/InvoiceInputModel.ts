interface InvoiceInputModel {
  sales_staff_code: string;
  hb_rx_right_dist: string;
  hb_rx_left_dist: string;
  hb_rx_right_near: string;
  hb_rx_left_near: string;
  auto_ref_right: string;
  auto_ref_left: string;
  right_eye_dist_sph?: string | undefined;
  right_eye_dist_cyl?: string | undefined;
  right_eye_dist_axis?: string | undefined;
  right_eye_near_sph?: string | undefined;
  left_eye_dist_cyl?: string | undefined;
  left_eye_dist_axis?: string | undefined;
  left_eye_dist_sph?: string | undefined;
  left_eye_near_sph?: string | undefined;
  remark?: string;
  name: string;
  nic: string;
  phone_number: string;
  address: string;
  dob: string;
  cash: number;
  discount: number;
  card: number;
}

export type { InvoiceInputModel };
