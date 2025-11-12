const { test, expect } = require('@playwright/test');

test('@Patient Nexus', async ({ browser }) => {
  // console.log('Running on browser:', browserName);
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://qa-vhs-lsc-dev-ed.develop.my.site.com/");
  console.log(await page.title());

  await page.getByRole('button', { name: 'Neuravive Pathways' }).click();
  await page.getByText('Enroll online as a Patient/Caregiver', { exact: true }).click();

  await expect(
    page.getByRole('heading', { name: 'Patient Basic Information' })
  ).toBeVisible({ timeout: 15000 });


  // Fill patient info
  await page.getByLabel('Patient First Name*').fill('hendry');
  await page.getByLabel('Patient Middle Name*').fill('M');
  await page.getByLabel('Patient Last Name*').fill('mark');

  // Select DOB
  await page.locator("[class='nds-input nds-input_mask']").click();
  await page.selectOption(".nds-select", '2000');
  await page.locator("span[aria-label='Fri Jun 02 2000']").click();
  await page.getByRole('button', { name: 'Next' }).click();

  // Fill address and contact
  await page.getByLabel('Search Address*').fill('Sad city 17, flaw street143 ');
  await page.locator("[id*='comboboxId-249']").click();
  await page.locator("span[title='Female']").click();
  await page.getByLabel('Email*').fill('mark@gmail.com');
  await page.getByLabel('Cell Phone*').fill('9087657889');
  await page.getByPlaceholder('Enter Annual Household Income').fill('9800');
  await page.getByPlaceholder('Enter Number of People in Household').fill('8');

  await page.getByRole('button', { name: 'Next' }).click();

  // Handle dropdown based on visible options
  await page.locator("omnistudio-omniscript-select[class='nds-size_12-of-12 nds-medium-size_12-of-12']").click();
  const optionLocator = page.getByRole('option').nth(2);
  const selectedText = await optionLocator.textContent();

  await optionLocator.click(); // Click the option after reading the text

  // Trim and compare the selected text
  if (selectedText.trim().toLowerCase() === 'yes') {
    await page.waitForTimeout(1000); // pauses the test for 2 seconds (2000 ms)
    await page.locator('omnistudio-omniscript-checkbox span').first().click();
    await page.waitForSelector('span.nds-checkbox-span', { timeout: 5000 });

    await page.getByLabel('Caregiver/Legal Guardian First Name*').fill('Sam');
    await page.getByLabel('Caregiver/Legal Guardian Last Name*').fill('sing');
    await page.locator("omnistudio-omniscript-select[data-omni-key='Relationship to patient'] div[class='nds-form-element nds-form-container']").click();
    const optionLocator = page.getByRole('option').nth(2);
    await optionLocator.click();
    await page.getByLabel('Caregiver/Legal Guardian Phone*').fill('9087657889');
    await page.getByLabel('Caregiver/Legal Guardian Email*').fill('tharun.s@valuehealthsol.com');
    await page.getByRole('button', { name: 'Next' }).click();
  }
  else if (selectedText.trim().toLowerCase() === 'no') {
    await page.getByRole('button', { name: 'Next' }).click();

  }
  // Handle  for Prescriber
  await page.getByRole('combobox', { name: /Prescriber Name/i }).fill('kimberly');
  await page.getByText('KIMBERLY PHAM - Oncology -').click();
  await page.getByRole('button', { name: 'Next' }).click();
  //Insurance 
  await page.getByRole('combobox', { name: 'Is Patient Insured?' }).click();
  const insuranceOptions = await page.getByRole('option').allTextContents();
  let options = console.log(insuranceOptions);

  // await page.getByRole('combobox', { name: 'Is Patient Insured?' }).click();
  // const insuranceOption = page.getByRole('option').nth(1);
  // await insuranceOption.click();
  // console.log(await insuranceOption.textContent());



  //   Insurance = page.getByRole('listbox').click();
  //   console.log(Insurance);



});
