import { z } from "zod";

export const schemaPatientReshedule = z.object({
  new_doctor_id: z.number().min(1, "Doctor is required").nullable(),
  new_date: z.date().or(z.string()),
  new_time: z.string().regex(/^\d{2}:\d{2}:\d{2}$/, {
    message: "Time must be in HH:MM:SS format",
  }),
  branch_id: z.number({ invalid_type_error: "Branch is required" }),
});

// Type inference
export type PatientResheduleModel = z.infer<typeof schemaPatientReshedule>;
