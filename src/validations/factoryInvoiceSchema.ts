import * as Yup from "yup";

export const factoryInvoiceSchema = Yup.object().shape({
  sales_staff_code: Yup.string().required("Sales Staff Code is required"),
  hb_rx_right_dist: Yup.string().required("Right Distance is required"),
  hb_rx_left_dist: Yup.string().required("Left Distance is required"),
  hb_rx_right_near: Yup.string().required("Right Near is required"),
  hb_rx_left_near: Yup.string().required("Left Near is required"),
  auto_ref_right: Yup.string().required("Auto Ref Right is required"),
  auto_ref_left: Yup.string().required("Auto Ref Left is required"),
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
  remark: Yup.string(),
  name: Yup.string().required("Customer Name is required"),
  nic: Yup.string().required("Customer Age is required"),
  phone_number: Yup.string().required("Customer Mobile is required"),
  address: Yup.string().required("Customer Address is required"),
  dob: Yup.string().required("Customer age is required"),
  discount: Yup.number().required("discount is required").min(0),
  cash: Yup.number().required("payment Amount is required").min(0),
  card: Yup.number().required("payment Amount is required").min(0),
});
