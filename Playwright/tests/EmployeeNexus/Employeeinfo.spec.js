const { test, expect } = require('@playwright/test');

test('Employeeinfo', async ({ page }) => {

    await page.goto("https://hrms-dev.valuehealthai.com", { timeout: 30000 });
    await page.setViewportSize({ width: 1920, height: 1085 });

    try {
        // Login
        await page.locator("#emailId").fill("tharun.s@valuehealthsol.com");
        await page.locator("[name='password']").fill("Test@123.");
        await page.locator("//body/div[@id='root']/div[3]/div[3]/div[3]/button[1]").click();
    } catch (error) {
        console.error("Login failed, retrying...");
        await page.locator("//body/div[@id='root']/div[3]/div[3]/div[3]/button[1]").click();
    }
    await page.locator("span[aria-label='Click to view details'] svg").click();
    const icons = await page.locator(".css-1f773le-MuiButtonBase-root-MuiAccordionSummary-root");
    const count = await icons.count();

    for (let i = 1; i < count; i++) {  // Start from index 1 (skip first)
        await icons.nth(i).click();  // Open the accordion
        await page.waitForTimeout(500);

        // Wait for UI update
        await icons.nth(i).click();  // Close the accordion
        console.log(`Accordion ${i} opened and closed`);

    }















});
































