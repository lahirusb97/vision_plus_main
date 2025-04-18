import { z } from "zod";

export const ChannelAppointmentSchema = z.object({
  doctor_id: z.number().min(1, "Doctor ID is required"),
  name: z.string().min(1, "Patient Name is required"),
  address: z.string().min(1, "Patient Address is required"),
  phone_number: z.string().min(1, "Patient Contact is required"),
  channel_date: z.date().or(z.string()),
  time: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, {
    message: "Time must be in HH:MM:SS format",
  }),
  channeling_fee: z.number().min(0, "Channeling Fee is required"),
  branch_id: z.number({ invalid_type_error: "Branch is required" }),
  cash: z.number().min(0, "Cash Amount is required"),
  credit_card: z.number().min(0, "Card Amount is required"),
  online_transfer: z.number().min(0, "Online Transfer Amount is required"),
});

// Type inference
export type ChannelAppointmentForm = z.infer<typeof ChannelAppointmentSchema>;
