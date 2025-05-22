import z from "zod";

export const schemaSolderingOrder = z.object({
  name: z.string().min(1, "Name is required"),
  nic: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  phone_number: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  address: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  dob: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  branch_id: z.number({ invalid_type_error: "Branch is required" }),
  price: z.number().min(0),
  note: z.string().optional().nullable(),
  online_transfer: z.number().min(0),
  credit_card: z.number().min(0),
  cash: z.number().min(0),
});

export type SolderingOrderFormModel = z.infer<typeof schemaSolderingOrder>;
