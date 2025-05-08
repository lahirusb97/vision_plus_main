import z from "zod";

export const schemaAddToSafe = z.object({
  branch: z.number().min(1, "Branch is required"),
  transaction_type: z.enum(["deposit", "income", "expence"]).default("deposit"),
  amount: z.number().min(1, "Date is required"),
  reason: z.string().optional(),
  reference_id: z.string().optional(),
});

export type AddToSafeFormModel = z.infer<typeof schemaAddToSafe>;
