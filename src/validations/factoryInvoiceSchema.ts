import { z } from "zod";

export const schemaFactoryInvoice = z.object({
  name: z.string().min(1, { message: "Patient Name is required" }),
  nic: z.string().optional(),
  phone_number: z
    .string()
    .min(10, { message: "Phone number must be 10 digits" })
    .max(10, { message: "Phone number must be 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must be numeric" })
    .refine((val) => val.length === 10, {
      message: "Phone number must be 10 digits",
    }),
  address: z.string().optional(),
  dob: z.string().optional(),
  discount: z.number().min(0, { message: "Discount must be 0 or greater" }),
  online_transfer: z.number().min(0, { message: "Payment amount is required" }),
  credit_card: z.number().min(0, { message: "Payment amount is required" }),
  cash: z.number().min(0, { message: "Payment amount is required" }),
  order_remark: z.string().optional(),
  on_hold: z.boolean({ message: "On Hold is required" }),
  fitting_on_collection: z.boolean({
    message: "Fitting on Collection is required",
  }),
  pd: z.string().nullable().optional(),
  right_pd: z.string().nullable().optional(),
  left_pd: z.string().nullable().optional(),
  height: z.string().nullable().optional(),
  left_height: z.string().nullable().optional(),
  right_height: z.string().nullable().optional(),
  user_date: z.string().nullable().optional(),
  branch_id: z.number(),
});
export type FactoryInvoiceFormModel = z.infer<typeof schemaFactoryInvoice>;
