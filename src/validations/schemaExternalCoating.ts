import { z } from "zod";

export const schemaExternalCoating = z.object({
  name: z.string().min(1, "Name is required"),
});

export type ExternalCoatingForm = z.infer<typeof schemaExternalCoating>;
