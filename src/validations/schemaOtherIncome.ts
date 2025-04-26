import z from "zod";

export const schemaOtherIncome = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type OtherIncomeForm = z.infer<typeof schemaOtherIncome>;
