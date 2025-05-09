import { z } from "zod";

export const schemaPaymentForm = z
  .object({
    credit_card: z.number(),
    cash: z.number(),
    online_transfer: z.number(),
    progress_status: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (data.credit_card <= 0 && data.cash <= 0 && data.online_transfer <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Amount is 0",
        path: ["credit_card"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Amount is 0",
        path: ["cash"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Amount is 0",
        path: ["online_transfer"],
      });
    }
  });

export type PaymentFormData = z.infer<typeof schemaPaymentForm>;
