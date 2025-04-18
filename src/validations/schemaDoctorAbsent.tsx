import { z } from "zod";

export const doctorAbsentSchema = z.object({
  doctor_id: z.number().int().positive(),
  branch_id: z.number().int().positive(),
  from_date: z.date().or(z.string()),
  to_date: z.date().or(z.string()),
});

export type DoctorAbsentForm = z.infer<typeof doctorAbsentSchema>;
