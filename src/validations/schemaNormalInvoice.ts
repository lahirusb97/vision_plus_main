import z from "zod";

export const schemaNormalInvoiceFormModel = z.object({
  branch_id: z.number({ invalid_type_error: "Branch is required" }),
  online_transfer: z.number().min(0),
  discount: z.number().min(0),
  credit_card: z.number().min(0),
  cash: z.number().min(0),
});

export type NormalInvoiceFormModel = z.infer<
  typeof schemaNormalInvoiceFormModel
>;
