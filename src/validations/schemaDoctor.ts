import { z } from "zod";
export const doctorSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  contact_info: z.string().optional().nullable(),
  status: z.enum(["available", "unavailable"]),
});

export type DoctorFormModel = z.infer<typeof doctorSchema>;
