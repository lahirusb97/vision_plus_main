import { z } from "zod";

// Zod schema for ExternalLens creation
export const shcemaExternalLens = z.object({
  // branch: z.number(),//!Feature not Requsted yet
  lens_type: z.number(),
  coating: z.number(),
  brand: z.number(),
  branded: z.enum(["non_branded", "branded"]),
  price: z.number().nonnegative(),
});

// TypeScript model inferred from schema
export type ExternalLensForm = z.infer<typeof shcemaExternalLens>;
