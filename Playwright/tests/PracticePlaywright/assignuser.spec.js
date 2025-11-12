import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {
    await page.goto('https://vassist-rp.healthitplatform.com/login');
    const page1Promise = page.waitForEvent('popup');
    await page.locator('div').filter({ hasText: /^Sign in with Microsoft$/ }).nth(2).click();
    const page1 = await page1Promise;
    await page1.getByRole('textbox', { name: 'Enter your email, phone, or' }).click({
        modifiers: ['ControlOrMeta']
    });
    await page1.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill('Tharun.Sadaiyappan@valuehealthai.com');
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.getByRole('textbox', { name: 'Enter the password for tharun' }).click();
    await page1.getByRole('textbox', { name: 'Enter the password for tharun' }).fill('Cvhs@12345');
    await page1.getByRole('button', { name: 'Sign in' }).click();
    await page1.getByRole('button', { name: 'Next' }).click();
    await page1.getByRole('button', { name: 'Skip setup' }).click();
    await page1.getByRole('button', { name: 'No' }).click();
    await page.getByRole('button', { name: 'User Management' }).click();
    await page.getByRole('menuitem', { name: 'user-group-img User Access' }).click();
    await page.getByRole('img', { name: 'Edit' }).click();
    await page.waitForLoadState('networkidle');
    
    

});






