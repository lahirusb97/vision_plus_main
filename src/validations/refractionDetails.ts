import z from "zod";

const cylinderSchema = z
  .string()
  .optional()
  .nullable()
  .transform((val) => {
    if (val === "" || val === undefined || val === null) return null;
    return val;
  })
  .refine(
    (val) => {
      if (val === null) return true; // Skip check if null
      const num = parseFloat(val);
      return !isNaN(num) && num <= 0;
    },
    {
      message: "Cylinder must be 0 or less than 0",
    }
  );

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
    .string()
    .nullable()
    .transform((val) => (val === null || val === "" ? null : val)),
  right_eye_dist_cyl: cylinderSchema,
  right_eye_dist_axis: z
    .string()
    .nullable()
    .transform((val) => (val === null || val === "" ? null : val)),
  right_eye_near_sph: z
    .string()
    .nullable()
    .transform((val) => (val === null || val === "" ? null : val)),
  left_eye_dist_sph: z
    .string()
    .nullable()
    .transform((val) => (val === null || val === "" ? null : val)),
  left_eye_dist_cyl: cylinderSchema,
  left_eye_dist_axis: z
    .string()
    .nullable()
    .transform((val) => (val === null || val === "" ? null : val)),
  left_eye_near_sph: z
    .string()
    .nullable()
    .transform((val) => (val === null || val === "" ? null : val)),
  shuger: z.boolean(),
  refraction_remark: z
    .string()
    .max(100, "Refraction Remark be 10 characters or fewer")
    .nullable(),
  prescription_type: z.enum(["internal", "vision_plus", "other"] as const, {
    required_error: "Prescription type is required",
  }),
  cataract: z.boolean(),
  blepharitis: z.boolean(),
  note: z.string().max(100, "Note be 10 characters or fewer").nullable(),
});

export type RefractionDetailsFormModel = z.infer<
  typeof schemaRefractionDetails
>;
