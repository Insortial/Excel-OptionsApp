import { test, expect } from '@playwright/test';

test('check redirect', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page.locator('h1').first()).toHaveText("Start NewJob");
});


test('check job dropdowns', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  // Wait for title element to render
  const titleElement = page.locator('#titleCover')
  await expect(titleElement).toBeVisible();
  await page.waitForTimeout(1000)
  // Focus the builder input.
  await page.getByLabel("builder").focus();
  // Expects the drop down to be visible
  await expect(page.locator('#builder').locator('xpath=following-sibling::*[1]')).toBeVisible();

  // Click the project input.
  await page.getByLabel("project").focus();
  // Expects the drop down to be visible
  await expect(page.locator('#project').locator('xpath=following-sibling::*[1]')).toBeVisible();

});

test('check job info in lot table', async ({ page }) => {
  let testJobObj = {
    builder: "A & R Corp",
    project: "Baker Ranch",
    phase: "9",
    super: "Super",
    phone: "9095678901",
    foreman: "Rogelio (GD Cabinets)",
    jobID: "10023",
    lot: "12"
  }


  await page.goto('http://localhost:5173/');
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

  //Fill out lot number and navigate to lot table
  await page.locator("#createJobButton").click()
  const modalSelector = page.locator(".modal").first()
  await expect(modalSelector).toBeVisible()
  await modalSelector.locator("input").fill(testJobObj.lot)
  await modalSelector.locator("button").click()
  await page.waitForTimeout(1000)

  const builder = await page.locator("#builder").getAttribute('placeholder')
  const project = await page.locator("#project").getAttribute('placeholder')
  const foreman = await page.locator("#foreman").getAttribute('placeholder')
  const phase = await page.locator("#phase").getAttribute('value')
  const superintendent = await page.locator("#superintendent").getAttribute('value')
  const phone = await page.locator("#phone").getAttribute('value')
  const lot = await page.locator("#lot").getAttribute('value')


  //Checks if values transferred over
  expect(builder).toBe(testJobObj.builder)
  expect(project).toBe(testJobObj.project)
  expect(phase).toBe(testJobObj.phase)
  expect(superintendent).toBe(testJobObj.super)
  expect(phone).toBe(testJobObj.phone)
  expect(foreman).toBe(testJobObj.foreman)
  expect(lot).toBe(testJobObj.lot)
});
