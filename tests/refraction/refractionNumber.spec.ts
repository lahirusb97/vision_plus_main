import { test, expect } from "@playwright/test";
import { TestLoginAndSelectBranch } from "../test_utils/testLoginHelper";
import { testGenerateRefractionNumber } from "../test_utils/testgenerateRefractionNumberHelper";

test("patient1", async ({ page }) => {
  await TestLoginAndSelectBranch(page, "admin2", "admin2");
  // 7. Assert you're on the home page
  await expect(page).toHaveURL("http://localhost:5173/");

  const patientName = `patient1`;
  const nic = `100000000V`; // Sample NIC pattern: You can customize this as per your need
  const mobileNumber = `100000000`; // Generating mobile numbers dynamically

  // Call the refraction number generation function
  await testGenerateRefractionNumber(page, patientName, nic, mobileNumber);

  // Assert that you're on the home page after generating refraction number
  await expect(page).toHaveURL("http://localhost:5173/");
});
test("patient2", async ({ page }) => {
  await TestLoginAndSelectBranch(page, "admin2", "admin2");
  // 7. Assert you're on the home page
  await expect(page).toHaveURL("http://localhost:5173/");
  const patientName = `patient2-`;
  const nic = `200000000V`; // Sample NIC pattern: You can customize this as per your need
  const mobileNumber = `200000000`; // Generating mobile numbers dynamically
  // Call the refraction number generation function
  await testGenerateRefractionNumber(page, patientName, nic, mobileNumber);
  // Assert that you're on the home page after generating refraction number
  await expect(page).toHaveURL("http://localhost:5173/");
});
