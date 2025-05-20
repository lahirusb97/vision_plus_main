import { z } from "zod";

export const schemayPaymentUpdateDelete = z.object({
  id: z.number().optional().nullable(),
  amount: z.number().min(0, "Amount is required"),
  payment_method: z.enum(["cash", "credit_card", "online_transfer"]),
  is_final: z.boolean().default(false),
  payment_date: z.string(),
});

export type PaymentUpdateDeleteFormData = z.infer<
  typeof schemayPaymentUpdateDelete
>;
