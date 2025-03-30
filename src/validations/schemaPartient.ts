import z from "zod";

export const schemaPatientFormModel = z.object({
  name: z.string().min(1, "Name is required"),
  dob: z.string(),
  phone_number: z.string(),
  address: z.string(),
  nic: z.string(),
  patient_note: z.string(),
});

export type PatientFormModel = z.infer<typeof schemaPatientFormModel>;
