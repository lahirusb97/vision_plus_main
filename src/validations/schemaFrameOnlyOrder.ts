import z from "zod";

export const schemaFrameOnlyOrderForm = z.object({
  name: z.string().min(1, "Name is required"),
  dob: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  phone_number: z.string(),
  address: z.string(),
  nic: z
    .string()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  branch_id: z.number({ invalid_type_error: "Branch is required" }),
  online_transfer: z.number().min(0),
  discount: z.number().min(0),
  credit_card: z.number().min(0),
  cash: z.number().min(0),
});

export type FrameOnlyOrderForm = z.infer<typeof schemaFrameOnlyOrderForm>;
