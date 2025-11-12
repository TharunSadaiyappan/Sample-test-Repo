import { test, expect } from '@playwright/test';

test('ts Check', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/');
    await page.locator('#area-quick-links').getByRole('link', { name: 'Medicare' }).click();
    await page.getByRole('textbox', { name: 'ZIP code' }).click();
    await page.getByRole('textbox', { name: 'ZIP code' }).fill('10001');
    await page.getByRole('button', { name: 'View plans' }).click();
    await page.goto('https://www.uhc.com/medicare/health-plans/plan-summary/10001/061/2025');
    await page.getByRole('link', { name: 'Medicare Advantage plans 5' }).click();
    await page.getByRole('tab', { name: 'Medicare prescription drug' }).click();
   // await page.goto('https://www.uhc.com/medicare/health-plans/plan-summary/10001/061/2025#PDP');
    // Get all matching links
    const links = page.locator("a.plancard-heading.text-primary-blue.underline");
     const first_page= test.info().project.use.first_page;
     const second_page= test.info().project.use.second_page;
     const three_page= test.info().project.use.three_page;

  console.log('First page:', first_page);
  console.log('Second page:', second_page);
  console.log('Third page:', three_page);   
    // Get the total count
    const count = await links.count();
    console.log(count);
    // Loop through each link
    for (let i = 0; i < count; i++) {
        // Optionally, scroll the element into view
        //  await links.nth(i).scrollIntoViewIfNeeded();

        // Click the link
        await links.nth(i + 11).click();

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





