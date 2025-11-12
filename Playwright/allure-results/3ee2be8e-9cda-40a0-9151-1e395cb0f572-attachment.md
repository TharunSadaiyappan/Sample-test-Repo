# Test info

- Name: Vassist Add Users from Excel
- Location: C:\Users\CVHS\Documents\VS Code\tests\PracticePlaywright\Vassist.spec.js:27:1

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://vassist-rp.healthitplatform.com/login", waiting until "load"

    at C:\Users\CVHS\Documents\VS Code\tests\PracticePlaywright\Vassist.spec.js:34:20
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 | const ExcelJs = require('exceljs');
   3 | // Read all rows from Excel
   4 | async function getAllExcelData() {
   5 |     const workbook = new ExcelJs.Workbook();
   6 |     await workbook.xlsx.readFile("C:\\Users\\CVHS\\Downloads\\Book 2.xlsx");
   7 |     const worksheet = workbook.getWorksheet("Sheet1");
   8 |
   9 |     const headers = worksheet.getRow(1).values.slice(1); // skip empty first cell
  10 |     const dataRows = [];
  11 |
  12 |     worksheet.eachRow((row, rowNumber) => {
  13 |         if (rowNumber === 1) return; // skip header
  14 |         const values = row.values.slice(1); // skip first empty cell
  15 |         const dataObj = {};
  16 |         headers.forEach((header, i) => {
  17 |             dataObj[header] = values[i];
  18 |         });
  19 |         dataRows.push(dataObj);
  20 |     });
  21 |
  22 |     return dataRows;
  23 | }
  24 |
  25 | test.describe.configure({ mode: 'parallel' });
  26 |
  27 | test('Vassist Add Users from Excel', async ({ browser }) => {
  28 |     const allUsers = await getAllExcelData();
  29 |
  30 |     for (const dataObj of allUsers) {
  31 |         const context = await browser.newContext();
  32 |         const page = await context.newPage();
  33 |
> 34 |         await page.goto("https://vassist-rp.healthitplatform.com/login");
     |                    ^ Error: page.goto: Target page, context or browser has been closed
  35 |         console.log(await page.title());
  36 |
  37 |         // Login
  38 |         await page.getByPlaceholder("Enter your Email Id ").fill("Rasheed.Shaik@valuehealthai.com");
  39 |         await page.getByPlaceholder("Enter your Password").fill("Demo@123");
  40 |         await page.getByRole('button', { name: 'Login' }).click();
  41 |
  42 |         // Navigate to Add User
  43 |         await page.getByRole('button', { name: 'User Management' }).click();
  44 |         await page.getByRole('button', { name: 'Add User' }).click();
  45 |         // Fill form using Excel data
  46 |         await page.getByPlaceholder("First Name").fill(dataObj['FirstName'] || '');
  47 |         await page.getByPlaceholder("Last Name").fill(dataObj['LastName'] || '');
  48 |         await page.getByPlaceholder("Email Id").fill(dataObj['Email'] || '');
  49 |         await page.locator("span[class='ant-input-group ant-input-group-compact css-dev-only-do-not-override-1wwf28x'] span[class='ant-select-selection-item']").click();
  50 |         await page.locator('.ant-select-item-option-content').nth(2).click();
  51 |         await page.getByPlaceholder("Phone Number").fill("8903812972");
  52 |
  53 |         await page.locator('div').filter({ hasText: /^Designation \*$/ }).locator('div').nth(1).click();
  54 |         await page.getByText('agent').click();
  55 |         await page.locator('div:nth-child(6) > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
  56 |         await page.getByText('RP').first().click();
  57 |         await page.locator('div:nth-child(7) > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
  58 |         await page.getByText('VHS').click();
  59 |         await page.locator('div:nth-child(8) > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
  60 |         await page.getByText('Admin').nth(4).click();
  61 |         await page.locator('div:nth-child(9) > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
  62 |         await page.getByText('True').click();
  63 |         await page.waitForTimeout(1000);
  64 |         // await page.getByRole('button', { name: 'Save Changes' }).click();
  65 |
  66 |         await context.close(); // Cleanup
  67 |     }
  68 | });
  69 |
```