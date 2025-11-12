
import { test, expect } from '@playwright/test';
const XLSX = require('xlsx');
// Function to read Excel sheet
function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[1];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet); // Returns array of objects
}

// Read all users from Excel
const users = readExcel('C:\\Users\\VH0000085\\Downloads\\v1update (1).xlsx');

test('Create multiple users from Excel', async ({ page }) => {
  test.setTimeout(9000000);
  // Go to login
  await page.goto('https://vassist-rp.healthitplatform.com/login');
  const page1Promise = page.waitForEvent('popup');
  await page.locator('div').filter({ hasText: /^Sign in with Microsoft$/ }).nth(2).click();
  const page1 = await page1Promise;

  // Login with credentials (can also make password dynamic if needed)
  await page1.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill('Tharun.Sadaiyappan@valuehealthai.com');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('textbox', { name: 'Enter the password for tharun' }).fill('Cvhs@12345');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('button', { name: 'Skip setup' }).click();
  await page1.getByRole('button', { name: 'No' }).click();
  await page.waitForLoadState('networkidle');

  // Loop through all users
  for (const user of users) {
    await page.getByRole('button', { name: 'User Management' }).click();
    await page.getByRole('button', { name: 'Add User' }).click();

    // Fill the user details from Excel
    await page.getByRole('textbox', { name: 'First Name' }).fill(user.First_Name);
    await page.getByRole('textbox', { name: 'Last Name' }).fill(user.Last_Name);
    await page.getByRole('textbox', { name: 'Email Id' }).fill(user.Email_ID);
    await page.locator('.ant-select-selection-item').first().click();
    await page.getByRole('paragraph').filter({ hasText: '+91' }).click();
    await page.getByRole('textbox', { name: 'Phone Number' }).fill('8903812873');

    // Dropdown selections
    await page.locator('.uploadFileFieldsDiv > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').first().click();
    await page.getByText('agent').click();
    await page.locator('div:nth-child(6) > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
    await page.getByText('RP-Internal').click();
    await page.locator('div:nth-child(7) > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
    await page.getByText('VHS').click();
    await page.locator('div:nth-child(8) > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
    await page.getByText('Admin').nth(4).click();
    await page.locator('div:nth-child(9) > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
    await page.getByText('True').click();

    // Save the user
     await page.getByRole('button', { name: 'Save Changes' }).click();

    // Optional: wait for confirmation or reload the user list before next iteration
    await page.waitForTimeout(2000); // 2 seconds pause (adjust as needed)
  }
});
