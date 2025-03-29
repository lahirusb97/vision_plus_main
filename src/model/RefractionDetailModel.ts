export interface RefractionDetailModel {
  id: number;
  refraction: number; //ID
  patient: number;
  hb_rx_right_dist: string | null;
  hb_rx_left_dist: string | null;
  hb_rx_right_near: string;
  hb_rx_left_near: string;
  auto_ref_right: string | null;
  auto_ref_left: string | null;
  ntc_right: string | null;
  ntc_left: string | null;
  va_without_glass_right: string | null;
  va_without_glass_left: string | null;
  va_without_ph_right: string | null;
  va_without_ph_left: string | null;
  va_with_glass_right: string | null;
  va_with_glass_left: string | null;
  right_eye_dist_sph: string | null;
  right_eye_dist_cyl: string | null;
  right_eye_dist_axis: string | null;
  right_eye_near_sph: string | null;
  left_eye_dist_sph: string | null;
  left_eye_dist_cyl: string | null;
  left_eye_dist_axis: string | null;
  left_eye_near_sph: string | null;
  prescription: boolean;
  shuger: boolean;
  refraction_remark: string | null;
  note: string | null;
  is_manual: boolean;
  cataract: boolean;
}
