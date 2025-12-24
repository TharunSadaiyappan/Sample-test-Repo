import { test } from '@playwright/test';

test('Login and save auth state', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://ipsenpharmaceutiques--jcqa.sandbox.my.salesforce.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('Karthick@jcrmqa.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('TestQA@123');
  await page.getByRole('button', { name: 'Log In to Sandbox' }).click();

  await page.waitForLoadState('networkidle');

  // 🎯 Save the login session
  await context.storageState({ path: 'state.json' });
});
