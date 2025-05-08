import z from "zod";
export const expenseSchema = z.object({
  branch: z.number().default(1),
  main_category: z.number().min(1, "Main category is required").nullable(),
  sub_category: z.number().min(1, "Sub category is required").nullable(),
  amount: z.number().min(1, "Amount must be greater than 0"),
  note: z.string(),
  paid_source: z.enum(["Safe", "Cash", "Bank"]).default("Cash"),
  paid_from_safe: z.boolean().default(false),
});

export type ExpenseFormData = z.infer<typeof expenseSchema>;
