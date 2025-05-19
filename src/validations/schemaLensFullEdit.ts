import { z } from "zod";

const PowerEntry = z.object({
  power: z.number(),
  value: z
    .string()
    .min(1, "Value is required")
    .transform((val) => (val === null || val === "" ? null : val)),
  powerName: z.string(),
  side: z.enum(["left", "right"]).nullable(),
});

export const schemaLensFullEdit = z.object({
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
  powers: z.array(PowerEntry),
  limit: z.number({ invalid_type_error: "Alert is required" }).optional(),
  branch_id: z.number({ invalid_type_error: "Branch ID is required" }),
  global_side: z.enum(["left", "right"]).nullable(),
});

export type LenseFullEditModel = z.infer<typeof schemaLensFullEdit>;
