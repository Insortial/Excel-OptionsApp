import { test, expect } from '@playwright/test';
const websiteURL = 'http://192.168.45.171:4012/'

test.beforeEach(async ({page}) => {
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

test('check logout', async ({page}) => {
    //Logout of app
    await page.locator("#logOutButton").click()
    await expect(page.locator("#loginDiv").first().locator("h2")).toHaveText("Login")
    //Attempt to enter jobMenu page
    await page.goto(websiteURL + 'jobMenu')
    await page.waitForTimeout(1000)
    await expect(page.locator("#loginDiv").first().locator("h2")).toHaveText("Login")
})

test('check job document', async ({page}) => {
    await page.locator(".jobDocument").first().click()
    await expect(page.locator("#optionsNav").first().locator("h1")).toHaveText("Options Creator")
})

test('test nav buttons', async ({page}) => {
    //Check Create Job Document Tab
    page.locator(".jobMenuButtons", { hasText: "Create Job Document"}).click()
    await expect(page.locator("#titleCover").locator("h1")).toHaveText("Start NewJob")
    await page.goBack()
    //Check Create Package Tab
    page.locator(".jobMenuButtons", { hasText: "Edit/Create Job Package"}).click()
    await expect(page.locator("#titleCover").locator("h1")).toHaveText("Job PackageManager")
})

test('delete modal', async ({page}) => {
    page.locator("#menuSettings").locator("button").click()
    const firstJobDocument = page.locator(".jobDocumentContainer").first()
    const jobDocumentTitle = (await firstJobDocument.locator("header").innerText()).replace(/(\r\n|\n|\r)/gm, " ")
    await firstJobDocument.locator(".documentDeleteButton").click()
    await expect(page.locator(".modal")).toBeVisible()
    const modalTitle = await page.locator(".modal").locator("h3").innerText()
    expect(modalTitle).toEqual(jobDocumentTitle)
})