import z from "zod";

export const schemaDoctorClaimInvoice = z.object({
  name: z.string().min(1, "Name is required"),
  dob: z.string().optional().nullable(),
  phone_number: z.string(),
  address: z.string(),
  nic: z.string().optional(),
  discount: z.number().min(0),
  // branch_id: z.number({ invalid_type_error: "Branch is required" }),
  payment: z.number().min(0),
});

export type DoctorClaimInvoiceFormModel = z.infer<
  typeof schemaDoctorClaimInvoice
>;
