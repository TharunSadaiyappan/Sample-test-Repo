
const { test } = require('@playwright/test');

test('test', async ({ page }) => {
    await page.goto('https://ipsenpharmaceutiques--jcqa.sandbox.my.salesforce.com/');
    await page.getByRole('textbox', { name: 'Username' }).fill('Karthick@jcrmqa.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('TestQA@123');
    await page.getByRole('button', { name: 'Log In to Sandbox' }).click();
    await page.getByRole('textbox', { name: 'Verification Code' }).click();
    //await page.waitForTimeout(50000);

     await page.getByRole('textbox', { name: 'Verification Code' }).fill('170264');
    await page.getByRole('button', { name: 'Verify' }).click();
    await page.goto('https://ipsenpharmaceutiques--jcqa.sandbox.lightning.force.com/lightning/o/APXTConga4__Conga_Template__c/home%27');
  await page.getByRole('button', { name: 'Setup' }).click();
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('menuitem', { name: 'Setup Opens in a new tab Setup for current app' }).click();
    const page1 = await page1Promise;
    await page1.goto('https://ipsenpharmaceutiques--jcqa.sandbox.my.salesforce-setup.com/lightning/setup/SetupOneHome/home%27');
  await page1.getByRole('link', { name: 'Users' }).click();
    await page1.getByRole('link', { name: 'Users' }).nth(1).click();
    await page1.waitForEvent('networkidel');
    // Wait for iframe to appear
    const iframe = page1.frameLocator('iframe[name="vfFrameId_1763617186585"]');

    // Wait for the element inside the iframe
    const mLink = iframe.getByRole('link', { name: 'M' }).first();

    // Ensure element is visible before clicking
    await mLink.waitFor({ state: 'visible', timeout: 60000 });

    // Scroll into view if needed
    await mLink.scrollIntoViewIfNeeded();

    // Click
    await mLink.click();
    //   await page1.locator('iframe[name="vfFrameId_1763617186585"]').contentFrame().getByRole('link', { name: 'M' }).first().click();
    const page2Promise = page1.waitForEvent('popup');
    await page1.locator('iframe[name="vfFrameId_1763617226249"]').contentFrame().getByTitle('Login - Record 4 - Manager,').click();
    const page2 = await page2Promise;
    await page2.goto('https://ipsenpharmaceutiques--jcqa.sandbox.lightning.force.com/lightning/r/Contact/003O300001GKD12IAH/view?ws=%2Flightning%2Fr%2FCareProgramEnrollee%2F0WwO3000000BCU5KAO%2Fview%27');
  await page2.getByRole('button', { name: 'Show Navigation Menu' }).click();
    await page2.getByRole('menuitem', { name: 'Leads' }).click();
    await page2.getByRole('button', { name: 'New' }).click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().locator('.slds-radio_faux').first().click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('button', { name: 'Next' }).click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().locator('#input-45').fill('William');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().locator('#input-50').click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().locator('#input-50').fill('Mathew');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().locator('#input-55').click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByLabel('Pick a Year').selectOption('1990');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByLabel('-11-01').getByRole('button', { name: '1' }).click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('combobox', { name: 'Care Program' }).click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByText('IQIRVO Patient Support').click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('button', { name: 'Next' }).click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByLabel('*Lead Source').selectOption('PartnerReferral');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('textbox', { name: 'Street' }).click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('textbox', { name: 'Street' }).fill('33');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('textbox', { name: 'City' }).click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('textbox', { name: 'City' }).fill('Sanfransico');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('combobox', { name: 'State/Province' }).click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('option', { name: 'Alaska' }).click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('textbox', { name: 'Zip/Postal Code' }).click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('textbox', { name: 'Zip/Postal Code' }).fill('40021');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByLabel('Sex').selectOption('Sex.Male');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().locator('#input-288').click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('button', { name: '20' }).click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByLabel('Consented by Others').selectOption('ConsenrtedByOthers.No');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByLabel('Im not Enrolled in').selectOption('ImnotEnrolledinHealthInsurancePlan.No');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().locator('#input-319').click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().locator('#input-319').fill('140000');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().locator('#input-329').click();
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().locator('#input-329').fill('4');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('button', { name: 'Next' }).click();
    const page3Promise = page2.waitForEvent('popup');
    await page2.locator('iframe[name="vfFrameId_1763617268050"]').contentFrame().getByRole('link', { name: 'Click here to view the Lead' }).click();
    const page3 = await page3Promise;
    await page3.goto('https://ipsenpharmaceutiques--jcqa.sandbox.lightning.force.com/lightning/r/Lead/00QO300000XpoXeMAJ/view%27');
});
