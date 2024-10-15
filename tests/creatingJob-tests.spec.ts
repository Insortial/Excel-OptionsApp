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
    await page.waitForTimeout(5000)
    await page.goto(websiteURL + "creatingJob");
    // Wait for title element to render
    const titleElement = page.locator('#titleCover')
    await expect(titleElement).toBeVisible();
    await page.waitForTimeout(1000)
})

test('check jobID search', async ({ page }) => {
    await page.getByLabel("Job ID:").fill("1012")
    await page.waitForTimeout(1000)
    expect( page.locator("#jobDisplay").locator("h4").first()).toHaveText("Customer Name: Woodside")
});

test('check job info in lot table', async ({ page }) => {
    const testJob = {
        builder: "Tri Pointe Homes",
        project: "Southcreek",
        phase: "15A-35",
        foreman: "Jose Macias",
        jobID: "10412",
        date:"2023-02-12",
        coordinator: "Renwell",
        lot: "113"
    }
    
    //Fill rest of job inputs
    await page.getByLabel("Job ID:").fill(testJob.jobID)
    await page.getByLabel("Date:").fill(testJob.date)
    await page.getByLabel("Options Coordinator:").fill(testJob.coordinator)

    //Fill out lot number and navigate to lot table
    await page.locator(".createButton").click()
    const modalSelector = page.locator(".modal").first()
    await expect(modalSelector).toBeVisible()
    await modalSelector.locator("button").click()
    await page.waitForTimeout(1000)

    const builder = await page.locator("#builder").getAttribute('placeholder')
    const project = await page.locator("#project").getAttribute('placeholder')
    const foreman = await page.locator("#foreman").getAttribute('placeholder')
    const phase = await page.locator("#phase").getAttribute('value')
    const lot = await page.locator("#lot").first().getAttribute('value')


    //Checks if values transferred over
    expect(builder).toBe(testJob.builder)
    expect(project).toBe(testJob.project)
    expect(phase).toBe(testJob.phase)
    expect(foreman).toBe(testJob.foreman)
    expect(lot).toBe(testJob.lot)
});

test("check job input validation", async ({page}) => {
    //Fill rest of job inputs
    await page.getByLabel("Job ID:").fill("1021")

    //Click Create Form to test input validation
    await page.locator(".createButton").click()
})