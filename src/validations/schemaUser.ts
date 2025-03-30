import zod from "zod";

export const schemaUser = zod.object({
  username: zod.string().min(2, "Username must be at least 3 characters"),
  email: zod.string().min(3, "Email must be at least 5 characters"),
  password: zod.string().min(4, "Password must be at least 4 characters"),
  user_code: zod.string().min(2, "User Code must be at least 2 characters"),
  mobile: zod.string().min(10, "Mobile must be 10 Numbers").max(10),
  first_name: zod.string().min(1, "Enter First Name"),
  last_name: zod.string().min(1, "Enter Last Name"),
  branch_ids: zod.array(zod.number()).min(1, "Select at least one branch"),
});
export type UserFormModel = zod.infer<typeof schemaUser>;
