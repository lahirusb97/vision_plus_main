import z from "zod";

export const schemaPatientFormModel = z.object({
  name: z.string().min(1, "Name is required"),
  date_of_birth: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  phone_number: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val || val === "") return null;
      return val.replace(/[\s+]/g, "").toUpperCase();
    }),
  address: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  nic: z
    .string()
    .nullable()
    .transform((val) => {
      if (!val || val === "") return null;
      return val.replace(/\s/g, "").toUpperCase();
    }),
  patient_note: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  extra_phone_number: z
    .string()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
});

export type PatientFormModel = z.infer<typeof schemaPatientFormModel>;
