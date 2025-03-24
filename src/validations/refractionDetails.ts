import z from "zod";
export const schemaRefractionDetails = z.object({
  hb_rx_right_dist: z.string().nullable(),
  hb_rx_left_dist: z.string().nullable(),
  hb_rx_right_near: z.string().nullable(),
  hb_rx_left_near: z.string().nullable(),
  auto_ref_right: z.string().nullable(),
  auto_ref_left: z.string().nullable(),
  ntc_right: z.string().nullable(),
  ntc_left: z.string().nullable(),
  va_without_glass_right: z.string().nullable(),
  va_without_glass_left: z.string().nullable(),
  va_without_ph_right: z.string().nullable(),
  va_without_ph_left: z.string().nullable(),
  va_with_glass_right: z.string().nullable(),
  va_with_glass_left: z.string().nullable(),
  right_eye_dist_sph: z
    .number()
    .or(z.nan())
    .nullable()
    .transform((val) => (val === null || isNaN(val) ? null : val)),
  right_eye_dist_cyl: z
    .number()
    .max(0, "Cylinder must be 0 or less than 0")
    .or(z.nan())
    .nullable()
    .transform((val) => (val === null || isNaN(val) ? null : val)),
  right_eye_dist_axis: z
    .number()
    .or(z.nan())
    .nullable()
    .transform((val) => (val === null || isNaN(val) ? null : val)),
  right_eye_near_sph: z
    .number()
    .or(z.nan())
    .nullable()
    .transform((val) => (val === null || isNaN(val) ? null : val)),
  left_eye_dist_sph: z
    .number()
    .or(z.nan())
    .nullable()
    .transform((val) => (val === null || isNaN(val) ? null : val)),
  left_eye_dist_cyl: z
    .number()
    .max(0, "Cylinder must be 0 or less than 0")
    .or(z.nan())
    .nullable()
    .transform((val) => (val === null || isNaN(val) ? null : val)),
  left_eye_dist_axis: z
    .number()
    .or(z.nan())
    .nullable()
    .transform((val) => (val === null || isNaN(val) ? null : val)),
  left_eye_near_sph: z
    .number()
    .or(z.nan())
    .nullable()
    .transform((val) => (val === null || isNaN(val) ? null : val)),
  // pd: z
  //   .number()
  //   .or(z.nan())
  //   .nullable()
  //   .transform((val) => (val === null || isNaN(val) ? null : val)),
  // h: z
  //   .number()
  //   .or(z.nan())
  //   .nullable()
  //   .transform((val) => (val === null || isNaN(val) ? null : val)),
  shuger: z.boolean(),
  refraction_remark: z
    .string()
    .max(100, "Refraction Remark be 10 characters or fewer")
    .nullable(),
  prescription: z.boolean(),
  note: z.string().max(100, "Note be 10 characters or fewer").nullable(),
});

export type RefractionDetailsFormModel = z.infer<
  typeof schemaRefractionDetails
>;
