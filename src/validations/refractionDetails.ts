import * as Yup from "yup";

export const refractionValidationSchema = Yup.object().shape({
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
  hb_rx_right_near: Yup.string().required("Hb Rx Rigt near rquired"),
  hb_rx_left_near: Yup.string().required("Hb Rx Left near rquired"),
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
  ntc_right: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  ntc_left: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  va_without_glass_right: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  va_without_glass_left: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  va_without_ph_right: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  va_without_ph_left: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  va_with_glass_right: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  va_with_glass_left: Yup.string()
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
  remark: Yup.string(),
  note: Yup.string(),
});
