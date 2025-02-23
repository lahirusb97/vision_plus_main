import * as Yup from "yup";

export const refractionValidationSchema = Yup.object().shape({
  hb_rx_right_dist: Yup.string().required("Right Distance is required"),
  hb_rx_left_dist: Yup.string().required("Left Distance is required"),
  hb_rx_right_near: Yup.string().required("Right Near is required"),
  hb_rx_left_near: Yup.string().required("Left Near is required"),
  auto_ref_right: Yup.string().required("Auto Ref Right is required"),
  auto_ref_left: Yup.string().required("Auto Ref Left is required"),
  ntc_right: Yup.string().required("NTC Right is required"),
  ntc_left: Yup.string().required("NTC Left is required"),
  va_without_glass_right: Yup.string().required(
    "VA Without Glass Right is required"
  ),
  va_without_glass_left: Yup.string().required(
    "VA Without Glass Left is required"
  ),
  va_without_ph_right: Yup.string().required(
    "VA Without P/H Right is required"
  ),
  va_without_ph_left: Yup.string().required("VA Without P/H Left is required"),
  va_with_glass_right: Yup.string().required("VA With Glass Right is required"),
  va_with_glass_left: Yup.string().required("VA With Glass Left is required"),
  right_eye_dist_sph: Yup.string().required(
    "Right Eye Distance Sph is required"
  ),
  right_eye_dist_cyl: Yup.string(),
  right_eye_dist_axis: Yup.string(),
  right_eye_near_sph: Yup.string(),
  left_eye_dist_sph: Yup.string().required("Left Eye Distance Sph is required"),
  left_eye_dist_cyl: Yup.string(),
  left_eye_dist_axis: Yup.string(),
  left_eye_near_sph: Yup.string(),
  remark: Yup.string().required("ss"),
  note: Yup.string(),
});
