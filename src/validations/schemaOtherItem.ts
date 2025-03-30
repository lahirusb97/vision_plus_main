import z from "zod";

export const schemaOtherItem = z.object({
  name: z.string().min(1, "Name is required"),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .positive("Price must be greater than 0"),
  is_active: z.boolean().optional().default(true),
  initial_count: z
    .number({ invalid_type_error: "Quantity is required" })
    .optional(),
  qty: z.number({ invalid_type_error: "Quantity is required" }),
  branch_id: z.number({ invalid_type_error: "Branch is required" }),
  limit: z.number({ invalid_type_error: "Alert Level is required" }),
});

export type OtherItemFormModel = z.infer<typeof schemaOtherItem>;
