import { z } from "zod";

export const doctorArrivalSchema = z.object({
  doctor_id: z.number().int().positive(),
  branch_id: z.number().int().positive(),
  date: z.date().or(z.string()),
  start_time: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, {
    message: "Time must be in HH:MM:SS format",
  }),
});
export type DoctorArrivalForm = z.infer<typeof doctorArrivalSchema>;
