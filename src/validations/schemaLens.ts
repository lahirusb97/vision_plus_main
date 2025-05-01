import { isUndefined } from "lodash";
import { z } from "zod";

export const schemaLens = z.object({
  lensType: z.number({ invalid_type_error: "Lens type is required" }),
  brand: z.number({ invalid_type_error: "Brand is required" }),
  coating: z.number({ invalid_type_error: "Coating is required" }),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .positive("Price must be greater than 0"),
  qty: z.number({ invalid_type_error: "Quantity is required" }),
  initial_count: z
    .number({ invalid_type_error: "Quantity is required" })
    .optional(),
  sph: z
    .number({ invalid_type_error: "Sph is required" })
    .or(z.nan())
    .nullable()
    .transform((val) =>
      val === null || isNaN(val) || isUndefined(val) ? null : val
    ),
  add: z
    .number()
    .or(z.nan())
    .nullable()
    .transform((val) =>
      val === null || isNaN(val) || isUndefined(val) ? null : val
    ),
  cyl: z
    .number()
    .or(z.nan())
    .nullable()
    .transform((val) =>
      val === null || isNaN(val) || isUndefined(val) ? null : val
    ),
  side: z
    .string({ invalid_type_error: "Lense side is required" })
    .or(z.undefined())
    .nullable()
    .transform((val) =>
      val === "" || isUndefined(val) || isUndefined(val) ? null : val
    ),
  limit: z.number({ invalid_type_error: "Alert is required" }).optional(),
  branch_id: z.number({ invalid_type_error: "Branch ID is required" }),
});

export type LenseFormModel = z.infer<typeof schemaLens>;
