import * as Yup from "yup";

export const factoryInvoiceSchema = Yup.object().shape({
  sales_staff_code: Yup.string().required("Enter Saff Code"),
  hb_rx_right_dist: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  hb_rx_left_dist: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  hb_rx_right_near: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  hb_rx_left_near: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  auto_ref_right: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  auto_ref_left: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  right_eye_dist_sph: Yup.string()
    .required("Right Sph is Required")
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  right_eye_dist_cyl: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  right_eye_dist_axis: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  right_eye_near_sph: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  left_eye_dist_sph: Yup.string()
    .required("Left Sph is Required")
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  left_eye_dist_cyl: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  left_eye_dist_axis: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  left_eye_near_sph: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  remark: Yup.string()
    .nullable()
    .strict()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  note: Yup.string()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  h: Yup.string()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  pd: Yup.string()
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    ),
  shuger: Yup.boolean().notRequired(),
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
});

import z from "zod";
import { schemaPatientFormModel } from "./schemaPartient";
// Define a new schema that extends schemaPatientFormModel
const schemaFactoryOrderPatient = schemaPatientFormModel
  .omit({ patient_note: true }) // Remove `patient_note`
  .extend({ refraction_id: z.number() }); // Add `refraction_id`

//Order related Data status
const OrderSchema = z.object({
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

const externalLensSchema = z.object({
  type: z.number(),
  coating: z.number(),
  brand: z.number(),
  price: z.number().nonnegative(),
  branch_id: z.number(),
});

const externalPowerSchema = z.array(
  z.object({
    power: z.number(),
    value: z.number(),
    side: z.union([z.enum(["left", "right"]), z.null()]),
  })
);
const schemaOrderExternalLenseFormModel = z.object({
  lens: externalLensSchema, // add here ,
  powers: externalPowerSchema,
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
      powers: z.array(
        z.object({
          power: z.number(),
          value: z.number(),
          side: z.enum(["left", "right"]),
        })
      ),
    })
    .optional(),
});

const schemaOrderLenseFormModel = z.object({
  lens: z.number(), //ID
  quantity: z.number().int().positive(),
  price_per_unit: z.number().int().positive(),
  subtotal: z.number().int().positive(),
});
const schemaOrderFrameFormModel = z.object({
  frame: z.number(), //ID
  quantity: z.number().int().positive(),
  price_per_unit: z.number().int().positive(),
  subtotal: z.number().int().positive(),
});

const OrderPaymentSchema = z.object({
  amount: z.number().nonnegative(),
  payment_method: z.enum(["online_transfer", "credit_card", "cash"]),
  transaction_status: z.enum(["success", "failed", "pending"]),
});
const schemaOrderItem = z.union([
  schemaOrderLenseFormModel, // Stock Lens Order
  schemaOrderFrameFormModel, // Frame Order
  schemaOrderExternalLenseFormModel, // External Lens Order
]);
export const schemaFactoryOrderFormModel = z.object({
  patient: schemaFactoryOrderPatient,
  order: OrderSchema,
  order_items: z.array(schemaOrderItem),
  order_payments: z.array(OrderPaymentSchema),
});

export type FactoryFullOrderFormModel = z.infer<
  typeof schemaFactoryOrderFormModel
>;
