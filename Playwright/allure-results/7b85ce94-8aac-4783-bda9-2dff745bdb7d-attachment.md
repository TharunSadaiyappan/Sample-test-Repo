# Test info

- Name: @Vassist Add Users from Excel
- Location: C:\Users\CVHS\Documents\VS Code\tests\PracticePlaywright\Vassist.spec.js:26:1

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://vassist-rp.healthitplatform.com/login", waiting until "load"

    at C:\Users\CVHS\Documents\VS Code\tests\PracticePlaywright\Vassist.spec.js:33:20
```

# Test source

```ts
   1 | const { test } = require('@playwright/test');
   2 | const ExcelJs = require('exceljs');
   3 |
   4 | // Read all rows from Excel
   5 | async function getAllExcelData() {
   6 |     const workbook = new ExcelJs.Workbook();
   7 |     await workbook.xlsx.readFile("C:\\Users\\CVHS\\Downloads\\Book 2.xlsx");
   8 |     const worksheet = workbook.getWorksheet("Sheet1");
   9 |
  10 |     const headers = worksheet.getRow(1).values.slice(1); // skip empty first cell
  11 |     const dataRows = [];
  12 |
  13 |     worksheet.eachRow((row, rowNumber) => {
  14 |         if (rowNumber === 1) return; // skip header
  15 |         const values = row.values.slice(1); // skip first empty cell
  16 |         const dataObj = {};
  17 |         headers.forEach((header, i) => {
  18 |             dataObj[header] = values[i];
  19 |         });
  20 |         dataRows.push(dataObj);
  21 |     });
  22 |
  23 |     return dataRows;
  24 | }
  25 |
  26 | test('@Vassist Add Users from Excel', async ({ browser }) => {
  27 |     const allUsers = await getAllExcelData();
  28 |
  29 |     for (const dataObj of allUsers) {
  30 |         const context = await browser.newContext();
  31 |         const page = await context.newPage();
  32 |
> 33 |         await page.goto("https://vassist-rp.healthitplatform.com/login");
     |                    ^ Error: page.goto: Target page, context or browser has been closed
  34 |         console.log(await page.title());
  35 |
  36 |         // Login
  37 |         await page.getByPlaceholder("Enter your Email Id ").fill("Rasheed.Shaik@valuehealthai.com");
  38 |         await page.getByPlaceholder("Enter your Password").fill("Demo@123");
  39 |         await page.getByRole('button', { name: 'Login' }).click();
  40 |
  41 |         // Navigate to Add User
  42 |         await page.getByRole('button', { name: 'User Management' }).click();
  43 |         await page.getByRole('button', { name: 'Add User' }).click();
  44 |         // Fill form using Excel data
  45 |         await page.getByPlaceholder("First Name").fill(dataObj['FirstName'] || '');
  46 |         await page.getByPlaceholder("Last Name").fill(dataObj['LastName'] || '');
  47 |         await page.getByPlaceholder("Email Id").fill(dataObj['Email'] || '');
  48 |         await page.locator("span[class='ant-input-group ant-input-group-compact css-dev-only-do-not-override-1wwf28x'] span[class='ant-select-selection-item']").click();
  49 |         await page.locator('.ant-select-item-option-content').nth(2).click();
  50 |         await page.getByPlaceholder("Phone Number").fill("8903812972");
  51 |
  52 |         await page.locator('div').filter({ hasText: /^Designation \*$/ }).locator('div').nth(1).click();
  53 |         await page.getByText('agent').click();
  54 |         await page.locator('div:nth-child(6) > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
  55 |         await page.getByText('RP').first().click();
  56 |         await page.locator('div:nth-child(7) > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
  57 |         await page.getByText('VHS').click();
  58 |         await page.locator('div:nth-child(8) > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
  59 |         await page.getByText('Admin').nth(4).click();
  60 |         await page.locator('div:nth-child(9) > .ant-select > .ant-select-selector > .ant-select-selection-wrap > .ant-select-selection-item').click();
  61 |         await page.getByText('True').click();
  62 |         await page.waitForTimeout(1000);
  63 |         // await page.getByRole('button', { name: 'Save Changes' }).click();
  64 |
  65 |         await context.close(); // Cleanup
  66 |     }
  67 | });
  68 |
```