// validations/schemaBankDeposit.ts
import { z } from "zod";

export const schemaBankDeposite = z.object({
  branch: z.number().min(1, "Branch is required"),
  bank_account: z.number().min(1, "Bank account is required"),
  amount: z.number().min(1, "Amount must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  note: z.string().optional(),
});

export type BankDepositForm = z.infer<typeof schemaBankDeposite>;
