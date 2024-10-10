import { test, expect } from '@playwright/test';
const websiteURL = 'http://192.168.45.171:4012/'
test('check redirect', async ({ page }) => {
  await page.goto(websiteURL);

  // Expect a title to be Options Creator
  await expect(page.locator('h2').first()).toHaveText("Options Creator");
  // Expect h2 tag with text Login
  await expect(page.locator("#loginDiv").first().locator("h2")).toHaveText("Login")
});

test('check login', async ({page}) => {
  await page.goto(websiteURL);

  //Wait for page to load
  await expect(page.locator("#loginDiv").first().locator("h2")).toHaveText("Login")

  //Fill in login modal
  await page.getByLabel("Email").fill("renq@excelcabinetsinc.com")
  await page.getByLabel("Password").fill("password9902")
  await page.locator("#loginDiv").first().locator("button").click()
  await page.waitForTimeout(1000)
  await expect(page.locator('#jobMenuHeader').first().locator("h1")).toHaveText("Job Menu")
})
