import { z } from "zod";

export const schemaAddOtherIncome = z.object({
  branch: z.number().int().positive(),
  category: z.number().int().positive(),
  amount: z.number().int().positive(),
  note: z.string().optional(),
});
export type AddOtherIncomeModel = z.infer<typeof schemaAddOtherIncome>;
