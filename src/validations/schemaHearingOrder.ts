import z from "zod";

export const schemaHearingOrderForm = z.object({
  branch_id: z.number({ invalid_type_error: "Branch is required" }),
  online_transfer: z.number().min(0),
  discount: z.number().min(0),
  credit_card: z.number().min(0),
  cash: z.number().min(0),
  progress_status: z.boolean().default(false),
  order_remark: z.string().optional(),
});

export type HearingOrderForm = z.infer<typeof schemaHearingOrderForm>;
