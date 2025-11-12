const { test, expect } = require('@playwright/test');

test('Projectsetup', async ({ page }) => {

    await page.goto("https://hrms-dev.valuehealthai.com");
    await page.setViewportSize({ width: 1920, height: 1085 });
    await page.locator("#emailId").fill("saravanan.r@valuehealthsol.com");
    await page.locator("[name='password']").fill("Test@123.");
    await page.locator("button[type='submit']").click();
    await page.waitForLoadState('networkidle');
    await page.locator("text=Project Setup").click();
    await page.waitForTimeout(1000); // Wait for page update after click
    await page.locator("svg[data-testid*='RemoveRedEyeIcon']").nth(2).click();
    await page.getByRole('button', { name: 'Edit' }).click();
    await page.locator("#accountname").click();
    await page.getByPlaceholder("DD/MM/YYYY").first().click();
    await page.locator("#description").fill("TetstProjectSetup");
    await page.locator("#description").clear();
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    // await page.getByRole("checkbox").all();
    // await page.getByRole('button',{name:'Remove Task'}).click();
    await page.evaluate(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) });
    await page.locator("text=Reports").click();
    await page.locator("#maritalStatus").click();
    await page.getByText("Weekly Task Report").click();
    await page.getByRole("button", { name: 'submit' }).click();
    await page.getByText("Select Project").click();
    await page.getByText("Internal Product - Employee Nexus").click();


    await page.pause();

})

test('Leavesys', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
   
    await page.goto("https://hrms-dev.valuehealthai.com");
    await page.setViewportSize({ width: 1920, height: 1085 });
    await page.locator("#emailId").fill("saravanan.r@valuehealthsol.com");
    await page.locator("[name='password']").fill("Test@123.");
    await page.locator("button[type='submit']").click();
    await page.waitForLoadState('networkidle');
    await page.getByText("Leave Management").click();
    await page.getByText("My View").click();
    await page.getByRole('button',{name:"Submit Request"}).click();
    await page.locator(".css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input").click();
    await page.getByText("Privilege Leave").click();    
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.getByPlaceholder("Enter Description Here").fill("TestPl")
    await page.getByRole('button',{name:'cancel'}).click();
    await page.evaluate(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) });

    await page.locator("(//img)[8]").click();


    
    await page.pause();


})