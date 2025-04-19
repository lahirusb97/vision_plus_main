import { getUserCurentBranch } from "./authDataConver";

export const getBranchName = (): string => {
  const branchName = getUserCurentBranch()?.branch_name;
  if (typeof branchName !== "string" || !branchName.trim()) return "";
  return branchName.trim().slice(0, 3).toUpperCase();
};
