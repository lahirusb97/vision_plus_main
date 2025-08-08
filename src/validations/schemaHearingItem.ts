import { initial } from "lodash";
import z from "zod";

export const schemaHearingItem = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  warranty: z.string().min(1, "Warranty information is required"),
  code: z.string().optional(),
  qty: z.number().min(0, "Quantity must be a positive number"),
  limit: z.number().min(0, "Limit must be a positive number"),
  branch_id: z.number().min(1, "Branch ID is required"),
  initial_count: z
    .number()
    .min(0, "Initial count must be a positive number")
    .optional(),
});

export type HearingItemFormModel = z.infer<typeof schemaHearingItem>;
