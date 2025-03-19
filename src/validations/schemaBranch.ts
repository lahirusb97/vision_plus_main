import zod from "zod";

export const schemaBranch = zod.object({
  branch_name: zod.string().min(1),
  location: zod.string().min(1),
});
export type BranchFormModel = zod.infer<typeof schemaBranch>;
