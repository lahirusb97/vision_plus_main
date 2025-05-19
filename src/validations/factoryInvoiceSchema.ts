import { z } from "zod";

export const schemaFactoryInvoice = z.object({
  name: z.string().min(1, { message: "Patient Name is required" }),
  nic: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  phone_number: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  // .min(10, { message: "Phone number must be 10 digits" })
  // .max(10, { message: "Phone number must be 10 digits" })
  // .regex(/^\d+$/, { message: "Phone number must be numeric" })
  // .refine((val) => val.length === 10, {
  //   message: "Phone number must be 10 digits",
  // })

  address: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  dob: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  discount: z.number().min(0, { message: "Discount must be 0 or greater" }),
  online_transfer: z.number().min(0, { message: "Payment amount is required" }),
  credit_card: z.number().min(0, { message: "Payment amount is required" }),
  cash: z.number().min(0, { message: "Payment amount is required" }),
  order_remark: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" || val === undefined ? null : val)),
  on_hold: z.boolean({ message: "On Hold is required" }),
  fitting_on_collection: z.boolean({
    message: "Fitting on Collection is required",
  }),
  pd: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" || val === undefined ? null : val)),
  right_pd: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" || val === undefined ? null : val)),
  left_pd: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" || val === undefined ? null : val)),
  height: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" || val === undefined ? null : val)),
  left_height: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" || val === undefined ? null : val)),
  right_height: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" || val === undefined ? null : val)),
  user_date: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val === "" || val === undefined ? null : val)),
  branch_id: z.number(),
  bus_title: z
    .number()
    .nullable()
    .optional()
    .transform((val) => (val === undefined ? null : val)),
  progress_status: z
    .enum([
      "received_from_customer",
      "issue_to_factory",
      "received_from_factory",
      "issue_to_customer",
    ])
    .default("received_from_customer"),
});
export type FactoryInvoiceFormModel = z.infer<typeof schemaFactoryInvoice>;
