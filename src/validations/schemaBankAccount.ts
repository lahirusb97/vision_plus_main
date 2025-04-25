import { z } from "zod";

export const schemaBankAccount = z.object({
  account_number: z
    .string()
    .min(5, "Account number must be at least 5 characters"),
  bank_name: z.string().min(2, "Bank name is required"),
  branch: z.number().int("Branch must be a whole number"),
});

// Inferred Type (optional)
export type BankAccountForm = z.infer<typeof schemaBankAccount>;
