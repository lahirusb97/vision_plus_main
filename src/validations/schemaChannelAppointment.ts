import dayjs from "dayjs";
import { z } from "zod";

export const ChannelAppointmentSchema = z.object({
  doctor_id: z.number().min(1, "Doctor ID is required"),
  name: z.string().min(1, "Patient Name is required"),
  address: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  channel_date: z.date().or(z.string()),
  channel_time: z.custom<dayjs.Dayjs>(
    (val) => dayjs.isDayjs(val) && val.isValid(),
    {
      message: "Invalid channel time",
    }
  ),
  doctor_fees: z.number().min(0, "Doctor Fees is required"),
  branch_fees: z.number().min(0, "Branch Fees is required"),
  // channeling_fee: z.number().min(0, "Channeling Fee is required"),
  branch_id: z.number({ invalid_type_error: "Branch is required" }),
  note: z.string().optional().nullable(),
  cash: z.number().min(0, "Cash Amount is required"),
  credit_card: z.number().min(0, "Card Amount is required"),
  online_transfer: z.number().min(0, "Online Transfer Amount is required"),
});

// Type inference
export type ChannelAppointmentForm = z.infer<typeof ChannelAppointmentSchema>;
