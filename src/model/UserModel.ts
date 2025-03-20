import { BranchModel } from "./BranchModel";
// type UserBranchModel = Pick<BranchModel, "id" | "branch_name">;

interface UserModel {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  token: string;
  user_code: string;
  is_superuser: boolean;
  branches: BranchModel[];
}
export type { UserModel };
