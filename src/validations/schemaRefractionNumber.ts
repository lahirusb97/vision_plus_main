import z from "zod";

export const schemaRefractionNumber = z.object({
  customer_full_name: z.string().min(1, "Name is required"),
  nic: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  customer_mobile: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  branch_id: z.number({ invalid_type_error: "Branch is required" }),
});

export type RefractionNumberFormModel = z.infer<typeof schemaRefractionNumber>;
