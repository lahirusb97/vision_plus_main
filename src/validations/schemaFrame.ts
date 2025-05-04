import z from "zod";
import {
  frameSizeFull,
  frameSizeHalf,
  frameSizeRimless,
  frameSpeciesMetal,
  frameSpeciesMetalPlastic,
  frameSpeciesPlastic,
} from "../data/staticVariables";

export const schemaFrame = z.object({
  brand: z.number({ invalid_type_error: "Brand is required" }),
  code: z.number({ invalid_type_error: "Code is required" }),
  color: z.number({ invalid_type_error: "Color is required" }),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .positive("Price must be greater than 0"),

  size: z.nativeEnum({
    Half: frameSizeHalf,
    Full: frameSizeFull,
    Rimless: frameSizeRimless,
  }),
  species: z.nativeEnum({
    Metal: frameSpeciesMetal,
    Plastic: frameSpeciesPlastic,
    "Metal/Plastic": frameSpeciesMetalPlastic,
  }),
  qty: z.number({ invalid_type_error: "Quantity is required" }),
  initial_count: z
    .number({ invalid_type_error: "Quantity is required" })
    .optional(),
  limit: z.number({ invalid_type_error: "Quantity is required" }).optional(),
  brand_type: z.enum(["non_branded", "branded"]),
  branch_id: z.number({ invalid_type_error: "Quantity is required" }),
});

export type FrameFormModel = z.infer<typeof schemaFrame>;
