import z from "zod";

export const schemaRefractionNumber = z.object({
  customer_full_name: z.string().min(1, "Name is required"),
  nic: z.string().min(1, "NIC is required"),
  customer_mobile: z
    .string()
    .min(10, "Numeber Must be 10 Digits")
    .max(10, "Numeber Must be 10 Digits"),
  //   branch_id: z.number({ invalid_type_error: "Branch is required" }),
});

export type RefractionNumberFormModel = z.infer<typeof schemaRefractionNumber>;
