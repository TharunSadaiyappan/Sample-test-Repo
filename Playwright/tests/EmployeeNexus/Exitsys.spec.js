const { test, expect } = require('@playwright/test');

async function checkbox(page) {
    const checkboxes = await page.getByRole("checkbox").all();
    for (const checkbox of checkboxes) {
        await checkbox.check();
    }
}
async function toastmsg(page) {

    const isToastVisible = await page.locator("div[role='alert']").first().isVisible();

    if (!isToastVisible) {
        // Execute this block only if no toast message is found
        await page.locator("#selfRating").click();
        await page.getByText("Approve").click();
        await page.getByText("cancel").click();
        await page.locator("div[class ='MuiBox-root css-zdpt2t']").click();
        await page.getByText("Logout").click();
    } else {
        console.log("Skipped  Execution becasue! .This resignation has been approved or rejected and cannot be edited.");
    }
}
test('Exitmanagement', async ({ page }) => {

    await page.goto("https://hrms-dev.valuehealthai.com");
    await page.locator("input#emailId").fill("mohanapriya.r@valuehealthsol.com");
    await page.getByPlaceholder("Password").fill('Test@123.');
    await page.locator("button[type='submit']").click();
    await page.setViewportSize({ width: 1903, height: 984 });
    await page.locator("span[aria-label='Click to view details'] svg").click();
    console.log(await page.locator(".EditInfoCont").allTextContents());
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.getByText('Submit/Withdraw Resignation').click();
    await page.waitForTimeout(1000); // Wait for page update after click
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.locator("#reason").click();
    console.log(await page.locator("div[id='menu-'] div[class='MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation8 MuiPopover-paper MuiMenu-paper MuiMenu-paper css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper']").allTextContents());
    await page.getByText("Health Reason").click();
    await page.locator(".css-1b3zsb4-MuiButtonBase-root-MuiButton-root").click();
    await page.locator("#alternateEmail").fill("tharun.s@valuehealthsol.com");
    await page.locator("#alternateMobile").fill("8903812981");
    await page.getByRole("checkbox").check();
  //  await page.getByText("cancel").click(); //cancel
    await page.locator(".css-1hhl3ke-MuiButtonBase-root-MuiButton-root").click(); // submit 
    await page.evaluate(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) });
    // await page.waitForTimeout(500); // Wait for page update after click
    await page.locator("div[class ='MuiBox-root css-zdpt2t']").click();
    await page.getByText("Logout").click();
    //Manager Approval
    await page.locator("input#emailId").fill("saravanan.r@valuehealthsol.com");
    await page.getByPlaceholder("Password").fill('Test@123.');
    await page.locator("button[type='submit']").click();
    await page.locator("text =Exit Management").click();
    await page.locator("svg[data-testid*='RemoveRedEyeIcon']").click();
    await toastmsg(page);
    //HR Approval
    await page.locator("input#emailId").fill("collins.l@valuehealthsol.com++");
    await page.getByPlaceholder("Password").fill("Test@123.");
    await page.locator("button[type='submit']").click();
    await page.locator("text=Exit Management").click();
    await page.locator("text=HR View").click();
    await toastmsg(page);
    //IT Clearance
    await page.locator("input#emailId").fill("suresh.r@valuehealthsol.com++");
    await page.getByPlaceholder("Password").fill("Test@123.");
    await page.locator("button[type='submit']").click();
    await page.locator("text=Exit Management").click();
    await toastmsg(page);
    //admin clear
    await page.locator("input#emailId").fill("vishaal.s@valuehealthsol.com++");
    await page.getByPlaceholder("Password").fill("Test@123.");
    await page.locator("button[type='submit']").click();
    await page.locator("text=Exit Management").click();
    await toastmsg(page);
    await checkbox(page);
    await page.locator(".css-1s2d13k-MuiButtonBase-root-MuiButton-root").click();

    //finance clear

    await page.locator("input#emailId").fill("elizabeth.k@ valuehealthsol.com++");
    await page.getByPlaceholder("Password").fill("Test@123.");
    await page.locator("button[type='submit']").click();
    await page.locator("text=Exit Management").click();
    await toastmsg(page);
    await checkbox(page);
    await page.locator(".css-1s2d13k-MuiButtonBase-root-MuiButton-root").click();

    // final HR approval
    await page.locator("input#emailId").fill("collins.l@valuehealthsol.com++");
    await page.getByPlaceholder("Password").fill("Test@123.");
    await page.locator("button[type='submit']").click();
    await page.locator("text=Exit Management").click();
    await page.getByText("HR View").click();
    await page.locator("text=Exit Closure Dashboard").click();
    await toastmsg(page);
    const toasts = await page.locator("div[role='alert']").allTextContents();
    console.log("All Toast Messages: Afte", toasts);
    await page.pause();

});