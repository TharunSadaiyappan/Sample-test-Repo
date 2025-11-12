const { test, expect } = require('@playwright/test');
const ExcelJs = require('exceljs');

//  Function to read data from Excel and return an object
async function getExcelData() {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile("C:\\Users\\CVHS\\Downloads\\PatientScripts.xlsx");
  const worksheet = workbook.getWorksheet("Sheet1");

  const headers = worksheet.getRow(1).values.slice(1); // skip first empty cell
  const row = worksheet.getRow(2).values.slice(1);     // data from second row

  const data = {};
  headers.forEach((header, i) => {
    data[header] = row[i];
  });
  
  return data;
}

// Use Excel data inside Playwright test
test('@Patient Nexus', async ({ browser }) => {
  const dataObj = await getExcelData(); // Load data before test steps

  const context = await browser.newContext({
    geolocation: { latitude: 37.7749, longitude: -122.4194 },
    permissions: ['geolocation'],
    //viewport: { width: 1920, height: 1080 },
  });

  const page = await context.newPage();
  await page.goto("https://qa-vhs-lsc-dev-ed.develop.my.site.com/");
  console.log(await page.title());

  await page.getByRole('button', { name: 'Neuravive Pathways' }).click();
  await page.getByText('Enroll online as a Patient/Caregiver', { exact: true }).click();

  // Use Excel values
  await page.getByLabel('Patient First Name*').fill(dataObj['FirstName']);
  await page.getByLabel('Patient Middle Name*').fill(dataObj['MiddleName']);
  await page.getByLabel('Patient Last Name*').fill(dataObj['LastName']);

  await page.locator("[class='nds-input nds-input_mask']").click();
  await page.selectOption(".nds-select", '2000');
  await page.locator("span[aria-label='Fri Jun 02 2000']").click();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByLabel('Search Address*').fill('Downtown,daniel street');
  await page.getByRole("combobox",{name:'Gender'}).click();
  await page.locator("span[title='Female']").click();
  await page.getByLabel('Email*').fill(dataObj['Email']);
  await page.getByLabel('Cell Phone*').fill(dataObj['Phone'].toString());
  await page.getByPlaceholder('Enter Annual Household Income').fill(dataObj['Income'].toString());
  await page.getByPlaceholder('Enter Number of People in Household').fill(dataObj['HouseholdSize'].toString());

  await page.getByRole('button', { name: 'Next' }).click();

  // Optional handling of caregiver fields
  await page.locator("omnistudio-omniscript-select[class='nds-size_12-of-12 nds-medium-size_12-of-12']").click();
  const optionLocator = page.getByRole('option').nth(2);
  const selectedText = await optionLocator.textContent();
  await optionLocator.click();
  
  if (selectedText.trim().toLowerCase() === 'yes') {
    await page.waitForSelector('span.nds-checkbox-span', { timeout: 5000 });

    await page.getByLabel('Caregiver/Legal Guardian First Name*').fill(dataObj['CaregiverFirst']);
    await page.getByLabel('Caregiver/Legal Guardian Last Name*').fill(dataObj['CaregiverLast']);
    await page.locator("omnistudio-omniscript-select[data-omni-key='Relationship to patient'] div[class='nds-form-element nds-form-container']").click();
    await page.getByRole('option').nth(2).click();
    await page.getByLabel('Caregiver/Legal Guardian Phone*').fill(dataObj['CaregiverPhone'].toString());
    await page.getByLabel('Caregiver/Legal Guardian Email*').fill(dataObj['CaregiverEmail']);
    await page.getByRole('button', { name: 'Next' }).click();
  } else {
    await page.getByRole('button', { name: 'Next' }).click();
  }

  // Final steps...
  // Prescriber
  await page.getByRole('combobox', { name: /Prescriber Name/i }).fill('kimberly');
  await page.getByText('KIMBERLY PHAM - Oncology -').click();
  await page.getByRole('button', { name: 'Next' }).click();

  // Insurance
  await page.getByRole('combobox', { name: 'Is Patient Insured?' }).click();
  await page.getByRole('option').nth(1).click();
  await page.getByRole('combobox', { name: /Insurance Company Name/i }).fill('Gainsco');
  await page.getByText('GAINSCO - Aetna HMO Basic').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(1000);

  // Consent + Signature
  await page.locator('omnistudio-omniscript-checkbox span').first().click();

  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  const box = await canvas.boundingBox();

  if (box) {
    const { x, y, width, height } = box;
    await page.mouse.move(x + width / 4, y + height / 2);
    await page.mouse.down();
    await page.mouse.move(x + width / 2, y + height / 2 - 20);
    await page.mouse.move(x + (3 * width) / 4, y + height / 2 + 10);
    await page.mouse.move(x + width / 2, y + height / 2 + 20);
    await page.mouse.up();
  }

  await page.getByRole('button', { name: 'Save' }).click();
  await page.pause();
});
