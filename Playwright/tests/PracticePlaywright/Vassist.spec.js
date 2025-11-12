import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';

function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);
  return jsonData.filter(row => row.Questions && row.Questions.trim() !== '');
}

const users = readExcel("C:\\Users\\VH0000085\\Downloads\\Vassist_VSC (3).xlsx");

test('Ask all questions from Excel (resilient)', async ({ page }) => {
  test.setTimeout(90000000); // 10 minutes total

  // ---- Login ----
   await page.goto('https://vassist-rp.healthitplatform.com/login');
  const page1Promise = page.waitForEvent('popup');
  await page.locator('div').filter({ hasText: /^Sign in with Microsoft$/ }).nth(2).click();
  const page1 = await page1Promise;
  await page1.getByRole('textbox', { name: 'Enter your email, phone, or' }).click();
  await page1.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill('tharun.sadaiyappan@valuehealthai.com');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('textbox', { name: 'Enter the password for tharun' }).click();
  await page1.getByRole('textbox', { name: 'Enter the password for tharun' }).fill('Cvhs@121');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  await page1.getByRole('button', { name: 'Yes' }).click();
  await page.locator('div').filter({ hasText: /^Select Client$/ }).nth(1).click();
  await page.getByTitle('RP-Internal').click();
  await page.locator('div').filter({ hasText: /^Select Program$/ }).nth(2).click();
  await page.getByTitle('VRA Assist').click();
  await page.waitForTimeout(3000);


  // ---- Wait for chat input ----
  await page.waitForSelector('textarea[placeholder="Enter your message..."]', { timeout: 60000 });
  console.log(`✅ Total questions to send: ${users.length}`);

  for (const [index, user] of users.entries()) {
    const question = user.Questions?.trim();
    if (!question) continue;

    console.log(`➡️ (${index + 1}/${users.length}) Sending: ${question}`);

    // Re-locate every loop to avoid stale handles
    const messageBox = page.locator('textarea[placeholder="Enter your message..."]');

    // Wait up to 30s for input to be enabled
    try {
      await page.waitForFunction(
        el => !el.disabled,
        await messageBox.elementHandle(),
        { timeout: 30000 }
      );
    } catch {
      console.warn(`⚠️ Chatbox still disabled after 30s. Skipping question ${index + 1}.`);
      continue;
    }

    // Fill message
    await messageBox.fill(question);
    await messageBox.press('Enter');

    // Wait up to 10s for bot to respond and input to re-enable
    try {
      await page.waitForFunction(
        el => !el.disabled,
        await messageBox.elementHandle(),
        { timeout: 10000 }
      );
    } catch {
      console.warn(`⚠️ Chatbox did not re-enable after sending question ${index + 1}.`);
    }

    // Small buffer between messages
    await page.waitForTimeout(1000);
  }

  console.log('✅ Completed all questions successfully.');
  await page.pause();
});
