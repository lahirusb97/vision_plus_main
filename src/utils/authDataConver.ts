import toast from "react-hot-toast";
import { UserModel } from "../model/UserModel";
import { BranchModel } from "../model/BranchModel";
import { extractErrorMessage } from "./extractErrorMessage";

// Utility function to save data to localStorage
export function saveUserAuth(data: UserModel): void {
  try {
    localStorage.setItem("vision_plus_user", JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to localStorage", error);
  }
}
// Utility function to retrieve data from localStorage
export function getUserAuth(): UserModel | null {
  try {
    const data = localStorage.getItem("vision_plus_user");
    return data ? (JSON.parse(data) as UserModel) : null;
  } catch (error) {
    console.log(error);
    toast.error("Login Expireed Please Login Again");
    return null;
  }
}
export const deleteUserData = async () => {
  try {
    localStorage.removeItem("vision_plus_current_branch");
    // Check if it was removed
    if (localStorage.getItem("vision_plus_current_branch")) {
      throw new Error("Failed to remove branch data");
    }

    localStorage.removeItem("vision_plus_user");
    return null;
  } catch (error) {
    extractErrorMessage(error);
    toast.error("Failed to logout. Try again.");
  }
};

//USER BRANCH
export function saveUserCurentBranch(data: BranchModel): BranchModel | null {
  try {
    localStorage.setItem("vision_plus_current_branch", JSON.stringify(data));
    return data;
  } catch (error) {
    extractErrorMessage(error);
    return null;
  }
}

export function getUserCurentBranch(): BranchModel | null {
  try {
    const data = localStorage.getItem("vision_plus_current_branch");
    return data ? (JSON.parse(data) as BranchModel) : null;
  } catch (error) {
    console.log(error);
    toast.error("Login Expireed Please Login Again");
    return null;
  }
}
