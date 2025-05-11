import z from "zod";

export const schemaDoctorClaimChannel = z.object({
  invoice_number: z.string().min(1, "Invoice Number is required"),
  name: z.string().min(1, "Name is required"),
  phone_number: z.string(),
  address: z.string(),
  channel_date: z.string(),
  channel_time: z.string(),
  channeling_fee: z.number().min(0, "Channeling Fee is required"),
  online_transfer: z.number().min(0),
  credit_card: z.number().min(0),
  cash: z.number().min(0),
  doctor_id: z.number(),
});

export type DoctorClaimChannelFormModel = z.infer<
  typeof schemaDoctorClaimChannel
>;
