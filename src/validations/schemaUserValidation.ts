import z from "zod";

export const schemaUserValidation = z.object({
  user_code: z.string().min(1, "User Code is required"),
});

export type UserValidationFormModel = z.infer<typeof schemaUserValidation>;
