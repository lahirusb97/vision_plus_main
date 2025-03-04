import * as Yup from "yup";

export const factoryInvoiceSchema = Yup.object().shape({
  sales_staff_code: Yup.string().required("Enter Saff Code"),
  hb_rx_right_dist: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  hb_rx_left_dist: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  hb_rx_right_near: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  hb_rx_left_near: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  auto_ref_right: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  auto_ref_left: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  right_eye_dist_sph: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  right_eye_dist_cyl: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  right_eye_dist_axis: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  right_eye_near_sph: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  left_eye_dist_sph: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  left_eye_dist_cyl: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  left_eye_dist_axis: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  left_eye_near_sph: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  remark: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  note: Yup.string()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  name: Yup.string().required("Patient Name is required"),
  nic: Yup.string(),
  phone_number: Yup.string()
    .required("Phone number is required")
    .min(10)
    .max(10),
  address: Yup.string(),
  dob: Yup.string(),
  discount: Yup.number().required("discount is required").min(0),
  cash: Yup.number().required("payment Amount is required").min(0),
  card: Yup.number().required("payment Amount is required").min(0),
  online_transfer: Yup.number().required("payment Amount is required").min(0),
});
