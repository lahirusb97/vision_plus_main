import * as Yup from "yup";

export const factoryInvoiceSchema = Yup.object().shape({
  name: Yup.string().required("Patient Name is required"),
  nic: Yup.string(),
  phone_number: Yup.string()
    .required("Phone number is required")
    .min(10)
    .max(10),
  address: Yup.string().notRequired(),
  dob: Yup.string(),
  discount: Yup.number().required("discount is required").min(0),
  online_transfer: Yup.number().required("payment Amount is required").min(0),
  credit_card: Yup.number().required("payment Amount is required").min(0),
  cash: Yup.number().required("payment Amount is required").min(0),
  order_remark: Yup.string().notRequired(),
  on_hold: Yup.boolean().required(),
  fitting_on_collection: Yup.boolean().required(),
  pd: Yup.string().notRequired().nullable(),
  right_pd: Yup.string().notRequired().nullable(),
  left_pd: Yup.string().notRequired().nullable(),
  height: Yup.string().notRequired().nullable(),
  left_height: Yup.string().notRequired().nullable(),
  right_height: Yup.string().notRequired().nullable(),
});

import z from "zod";
import { schemaPatientFormModel } from "./schemaPartient";
import { FrameModel } from "../model/FrameModel";
import { LenseModel } from "../model/LenseModel";
// Define a new schema that extends schemaPatientFormModel
export const schemaFactoryOrderPatient = schemaPatientFormModel
  .omit({ patient_note: true }) // Remove `patient_note`
  .extend({ refraction_id: z.number() }); // Add `refraction_id`

//Order related Data status
export const OrderSchema = z.object({
  refraction: z.number(),
  status: z.enum(["pending", "completed", "cancelled"]),
  sub_total: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  total_price: z.number().nonnegative(),
  order_remark: z.string().optional(),
  sales_staff_code: z.number(),
  fitting_on_collection: z.boolean(),
  on_hold: z.boolean(),
});

//EXTERNAL LENSES
export const externalLensSchema = z.object({
  type: z.number(),
  coating: z.number(),
  brand: z.number(),
  price: z.number().nonnegative(),
  branch_id: z.number(),
});

export const externalPowerSchema = z.array(
  z.object({
    power: z.number(),
    value: z.number(),
    side: z.enum(["left", "right"]),
  })
);

export const schemaOrderExternalLenseForm = z.object({
  lens: externalLensSchema, // add here ,

  quantity: z.number().int().positive(),
  price_per_unit: z.number().nonnegative(),
  subtotal: z.number().nonnegative(),
  is_non_stock: z.boolean(),
  external_lens_data: z
    .object({
      lens: z.object({
        type: z.number(),
        coating: z.number(),
        brand: z.number(),
        price: z.number().nonnegative(),
      }),
      powers: externalPowerSchema,
    })
    .optional(),
});
export type FactoryOrderExternalLenseFormModel = z.infer<
  typeof schemaOrderExternalLenseForm
>;

//LENSE ORDER schema
export const schemaOrderLenseForm = z.object({
  lens: z.number(), //ID
  quantity: z.number().int().positive(),
  price_per_unit: z.number().int().positive(),
  subtotal: z.number().int().positive(),
});
export type FactoryOrderLensFormModel = z.infer<typeof schemaOrderLenseForm>;
//TODO to hadleing lense invoice & lense details display
export interface FactoryOrderLensInvoice {
  //  refraction data
  id: number;
  invoice: FactoryOrderLensFormModel;
  details: LenseModel;
}
//FRAME ORDER schema
export const schemaOrderFrameForm = z.object({
  frame: z.number(), //ID
  quantity: z.number().int().positive(),
  price_per_unit: z.number().int().positive(),
  subtotal: z.number().int().positive(),
});
export type FactoryOrderFrameFormModel = z.infer<typeof schemaOrderFrameForm>;

//TODO to hadleing frame invoice & frame details display
export interface FactoryOrderFrameInvoice {
  //  refraction data
  id: number;
  invoice: FactoryOrderFrameFormModel;
  details: FrameModel;
}

//ORDER PAYMENT METHODS
export const OrderPaymentSchema = z.object({
  amount: z.number().nonnegative(),
  payment_method: z.enum(["online_transfer", "credit_card", "cash"]),
  transaction_status: z.enum(["success", "failed", "pending"]),
});
export const schemaOrderItem = z.union([
  schemaOrderLenseForm, // Stock Lens Order
  schemaOrderFrameForm, // Frame Order
  schemaOrderExternalLenseForm, // External Lens Order
]);
export const schemaFactoryOrderForm = z.object({
  patient: schemaFactoryOrderPatient,
  order: OrderSchema,
  order_items: z.array(schemaOrderItem),
  order_payments: z.array(OrderPaymentSchema),
});

export type FactoryFullOrderFormModel = z.infer<typeof schemaFactoryOrderForm>;
