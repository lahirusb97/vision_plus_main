import z from "zod";

export const schemaDoctorClaimInvoice = z.object({
  name: z.string().min(1, "Name is required"),
  invoice_number: z.string().min(1, "Invoice Number is required"),
  phone_number: z.string(),
  address: z.string(),
  discount: z.number().min(0),
  online_transfer: z.number().min(0),
  credit_card: z.number().min(0),
  cash: z.number().min(0),
});

export type DoctorClaimInvoiceFormModel = z.infer<
  typeof schemaDoctorClaimInvoice
>;
