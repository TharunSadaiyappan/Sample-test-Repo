import { test, expect } from '@playwright/test';

test('test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.uhc.com/medicare/health-plans/plan-summary/10001/061/2025#MA');
    // Get all matching links
    const links = page.locator("a[class*='heading-3 plancard-heading text-primary-blue underline']");

    // Get the total count
    const count = await links.count();  
    console.log(count);
    // Loop through each link
    for (let i = 0; i < count; i++) {
        // Optionally, scroll the element into view
      //  await links.nth(i).scrollIntoViewIfNeeded();

        // Click the link
        await links.nth(i).click();

        // Wait for some action to complete (optional)
        await page.waitForTimeout(2000);
        await page.evaluate(() => {
        window.scrollBy(0, 1000); // scroll down 500px
    });
    await page.locator('.planSideButton.heading-2.isActive').click();
    // Wait for the new page (tab) to open
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'), // listens for new tab
        page.locator("a[dtmname$='Plans Detail:Comprehensive Formulary (PDF)']").click(), // triggers new tab
    ]);

    // Wait until the page loads
    await newPage.waitForLoadState('domcontentloaded');

    // Get the URL of the PDF
    const pdfUrl = newPage.url();

    console.log('PDF URL:', pdfUrl);

        // Go back to the previous page if needed
        await page.goBack();
    }



    


    await page.pause();


});





/*const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.uhc.com/medicare/health-plans/plan-summary/10001/061/2025#MA');
    // Get all matching links
    const links = page.locator("a[class*='heading-3 plancard-heading text-primary-blue underline']");

    // Get the total count
    const count = await links.count();
    console.log(count);
    // Loop through each link
    for (let i = 0; i < count; i++) {
        // Optionally, scroll the element into view
      //  await links.nth(i).scrollIntoViewIfNeeded();

        // Click the link
        await links.nth(i).click();

        // Wait for some action to complete (optional)
        await page.waitForTimeout(2000);
        await page.evaluate(() => {
        window.scrollBy(0, 1000); // scroll down 500px
    });
    await page.locator('.planSideButton.heading-2.isActive').click();
    // Wait for the new page (tab) to open
    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'), // listens for new tab
        page.locator("a[dtmname$='Plans Detail:Comprehensive Formulary (PDF)']").click(), // triggers new tab
    ]);

    // Wait until the page loads
    await newPage.waitForLoadState('domcontentloaded');

    // Get the URL of the PDF
    const pdfUrl = newPage.url();

    console.log('PDF URL:', pdfUrl);

        // Go back to the previous page if needed
        await page.goBack();
    }*/