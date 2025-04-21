// tests/utils/loginHelper.ts
import { Page } from "@playwright/test";

/**
 * Logs in a user and selects the first branch, ending on the home page.
 * @param page Playwright Page object
 * @param username User login name
 * @param password User login password
 */
export async function TestLoginAndSelectBranch(
  page: Page,
  username = "admin2",
  password = "admin2"
) {
  // 1. Go to login page
  await page.goto("http://localhost:5173/login");

  // 2. Fill in credentials
  await page.fill('input[name="username"]', username);
  await page.fill('input[name="password"]', password);

  // 3. Click login button
  await page.getByTestId("login-button").click();

  // 4. Wait for branch selection page
  await page.waitForURL("**/branch_selection", { timeout: 5000 });

  // 5. Click the first branch
  await page.getByTestId("branch-button-0").click();

  // 6. Wait for redirect to home
  await page.waitForURL("http://localhost:5173/", { timeout: 5000 });
}
