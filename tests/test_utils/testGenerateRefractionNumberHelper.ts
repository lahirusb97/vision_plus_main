// tests/utils/generateRefractionNumber.ts
import { Page, expect } from "@playwright/test";

/**
 * Utility function to generate a refraction number by filling out the form and submitting it.
 * @param page Playwright Page object
 * @param fullName Customer's full name
 * @param nic Customer's NIC
 * @param mobile Customer's mobile number
 * @param successRedirectUrl The URL to check after form submission (e.g., '/success')
 */
export async function testGenerateRefractionNumber(
  page: Page,
  fullName: string,
  nic: string,
  mobile: string,
  successRedirectUrl: string = "/success"
) {
  // Fill the form fields
  await page.fill('input[name="customer_full_name"]', fullName);
  await page.fill('input[name="nic"]', nic);
  await page.fill('input[name="customer_mobile"]', mobile);

  // Submit the form
  await page.click('button[type="submit"]');

  // Verify success page (adjust based on your implementation)
  await expect(page).toHaveURL(new RegExp(`.*${successRedirectUrl}`));

  // Optionally, validate content on the success page and click the "OK" button
  await page.getByTestId("refaction-number-ok-button").click();

  // Verify redirect back to the home page or your intended URL
  await expect(page).toHaveURL("http://localhost:5173/");
}
