import * as Yup from "yup";

export const refractionValidationSchema = Yup.object().shape({
  hb_rx_right_dist: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  hb_rx_left_dist: Yup.number(),
  hb_rx_right_near: Yup.number(),
  hb_rx_left_near: Yup.number(),
  auto_ref_right: Yup.number(),
  auto_ref_left: Yup.number(),
  ntc_right: Yup.number(),
  ntc_left: Yup.number(),
  va_without_glass_right: Yup.number(),
  va_without_glass_left: Yup.number(),
  va_without_ph_right: Yup.number(),
  va_without_ph_left: Yup.number(),
  va_with_glass_right: Yup.number(),
  va_with_glass_left: Yup.number(),
  right_eye_dist_sph: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  right_eye_dist_cyl: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  right_eye_dist_axis: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  right_eye_near_sph: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  left_eye_dist_sph: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  left_eye_dist_cyl: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  left_eye_dist_axis: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  left_eye_near_sph: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  remark: Yup.string(),
  note: Yup.string(),
});
