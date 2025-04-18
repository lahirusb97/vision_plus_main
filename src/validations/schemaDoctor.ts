import { z } from "zod";
export const doctorSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  contact_info: z
    .string()
    .max(10, "Phone Number must be 10 characters")
    .min(10, "Phone Number must be 10 characters"),
  status: z.enum(["available", "unavailable"]),
});

export type DoctorFormModel = z.infer<typeof doctorSchema>;
