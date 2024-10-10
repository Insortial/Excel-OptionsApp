import { test, expect } from '@playwright/test';
let testJobObj = {
  builder: "A & R Corp",
  project: "Baker Ranch",
  phase: "9",
  super: "Super",
  phone: "9095678901",
  foreman: "Rogelio (GD Cabinets)",
  jobID: "10023",
  lot: "12",
  date:"2023-02-12"
}

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4012/');
  // Wait for title element to render
  const titleElement = page.locator('#titleCover')
  await expect(titleElement).toBeVisible();
  await page.waitForTimeout(1000)
  // Click the builder input.
  await page.getByLabel("builder").focus();
  // Expects the drop down to be visible
  await page.locator('#builder').locator('xpath=following-sibling::*[1]').click();

  // Click the project input.
  await page.getByLabel("project").focus();
  // Expects the drop down to be visible
  await page.locator('#project').locator('xpath=following-sibling::*[1]').click();

  //Fill rest of job inputs
  await page.getByLabel("phase").fill(testJobObj.phase)
  await page.getByLabel("superintendent").fill(testJobObj.super)
  await page.getByLabel("phone").fill(testJobObj.phone)
  await page.getByLabel("foreman").fill(testJobObj.foreman)
  await page.locator('#foreman').locator('xpath=following-sibling::*[1]').click();
  await page.locator("#jobID").fill(testJobObj.jobID)
  await page.locator("#date").fill(testJobObj.date)

  //Fill out lot number and navigate to lot table
  await page.locator("#createJobButton").click()
  const modalSelector = page.locator(".modal").first()
  await expect(modalSelector).toBeVisible()
  await modalSelector.locator("input").fill(testJobObj.lot)
  await modalSelector.locator("button").click()
  await page.waitForTimeout(1000)
})

test('check options dropdowns', async ({ page }) => {
  await page.locator("#builder").focus();
  await expect(page.locator('#builder').locator('xpath=following-sibling::*[1]')).toBeVisible();

  await page.locator("#project").focus();
  await expect(page.locator('#project').locator('xpath=following-sibling::*[1]')).toBeVisible();

  await page.locator("#foreman").focus();
  await expect(page.locator('#foreman').locator('xpath=following-sibling::*[1]')).toBeVisible();

  await page.locator("#boxStyle").focus();
  await expect(page.locator('#boxStyle').locator('xpath=following-sibling::*[1]')).toBeVisible();
  
  await page.locator("#drawerFronts").focus();
  await expect(page.locator('#drawerFronts').locator('xpath=following-sibling::*[1]')).toBeVisible();

  await page.locator("#drawerBoxes").focus();
  await expect(page.locator('#drawerBoxes').locator('xpath=following-sibling::*[1]')).toBeVisible();

  await page.locator("#drawerGuides").focus();
  await expect(page.locator('#drawerGuides').locator('xpath=following-sibling::*[1]')).toBeVisible();

  await page.locator("#doorHinges").focus();
  await expect(page.locator('#doorHinges').locator('xpath=following-sibling::*[1]')).toBeVisible();

  await page.locator("#interiors").focus();
  await expect(page.locator('#interiors').locator('xpath=following-sibling::*[1]')).toBeVisible();

  await page.locator("#doors").focus();
  await expect(page.locator('#doors').locator('xpath=following-sibling::*[1]')).toBeVisible();

  await page.locator("#pullsButton").click();
  await page.waitForTimeout(500);
  await page.locator("#pulls").focus();
  await expect(page.locator('#pulls').locator('xpath=following-sibling::*[1]')).toBeVisible();

  await page.locator("#bothButton").click();
  await page.waitForTimeout(500);
  await page.locator("#pulls").focus();
  await expect(page.locator('#pulls').locator('xpath=following-sibling::*[1]')).toBeVisible();

});
