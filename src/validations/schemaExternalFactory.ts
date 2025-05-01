import { z } from "zod";

export const schemaExternalFactory = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type ExternalFactoryForm = z.infer<typeof schemaExternalFactory>;
