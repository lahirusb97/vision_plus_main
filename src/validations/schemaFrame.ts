{
    "frame": {
        "brand": 1,
        "code": 1,
        "color": 1,
        "price": "120.00",
        "size": "Large",
        "species": "Metal",
        "image": "frame_url"
    },
      "stock": [ //can without
        {
            "qty": 10,
            "initial_count": 20,
            "limit": 5,
            "branch_id": 2
        },
        {
            "qty": 8,
            "initial_count": 15,
            "limit": 3,
            "branch_id": 1
        }
    ]
}
import z from "zod";
import { frameSpeciesMetal, frameSpeciesMetalPlastic, frameSpeciesPlastic } from "../data/staticVariables"

export const schemaFrame = z.object({
  brand: z.number({ invalid_type_error: "Brand is required" }),
  code: z
    .number({ invalid_type_error: "Code is required" }),
    color: z
    .number({ invalid_type_error: "Color is required" }),
   price: z
       .number({ invalid_type_error: "Price is required" })
       .positive("Price must be greater than 0"),
       species: z.nativeEnum({
        Metal: frameSpeciesMetal,
        Plastic: frameSpeciesPlastic,
        "Metal/Plastic": frameSpeciesMetalPlastic,
      }),

});

export type FrameFormModel = z.infer<typeof schemaFrame>;
