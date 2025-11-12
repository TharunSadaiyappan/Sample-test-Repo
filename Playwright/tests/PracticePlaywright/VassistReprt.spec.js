import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';
import fs from 'fs';

// ---------------------
// 🔹 Read Excel utility
// ---------------------
function readExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);
  return jsonData.filter(row => row.Questions && row.Questions.trim() !== '');
}

// ---------------------
// 🔹 Test start
// ---------------------
const inputPath = "C:\\Users\\VH0000085\\Downloads\\Vassist_VSC (3).xlsx";
const outputPath = "C:\\Users\\VH0000085\\Downloads\\Vassist_Report.xlsx";
const users = readExcel(inputPath);

test('Ask all questions from Excel and save report', async ({ page }) => {
  test.setTimeout(90000000); // 10 min timeout

  const results = [];

  // ---- Login ----
  await page.goto('https://vassist-rp.healthitplatform.com/login');
  const page1Promise = page.waitForEvent('popup');
  await page.locator('div').filter({ hasText: /^Sign in with Microsoft$/ }).nth(2).click();
  const page1 = await page1Promise;

  await page1.getByRole('textbox', { name: 'Enter your email, phone, or' }).fill('tharun.sadaiyappan@valuehealthai.com');
  await page1.getByRole('button', { name: 'Next' }).click();
  await page1.getByRole('textbox', { name: 'Enter the password for tharun' }).fill('Cvhs@121');
  await page1.getByRole('button', { name: 'Sign in' }).click();
  try {
    await page1.getByRole('button', { name: 'Yes' }).click({ timeout: 5000 });
  } catch { console.log('No "Stay signed in" prompt.'); }

  await page.locator('div').filter({ hasText: /^Select Client$/ }).nth(1).click();
  await page.getByTitle('RP-Internal').click();
  await page.locator('div').filter({ hasText: /^Select Program$/ }).nth(2).click();
  await page.getByTitle('VRA Assist').click();
  await page.waitForTimeout(3000);

  // ---- Wait for chat input ----
  await page.waitForSelector('textarea[placeholder="Enter your message..."]', { timeout: 60000 });
  console.log(`✅ Total questions to send: ${users.length}`);

  // ---- Ask questions and capture responses ----
  for (const [index, user] of users.entries()) {
    const question = user.Questions?.trim();
    if (!question) continue;

    console.log(`➡️ (${index + 1}/${users.length}) Sending: ${question}`);

    const messageBox = page.locator('textarea[placeholder="Enter your message..."]');
    await messageBox.fill(question);
    await messageBox.press('Enter');

    // Wait for a new response to appear
    let responseText = 'No response';
    try {
      const lastResponse = page.locator('.bot-message').last();
      await expect(lastResponse).toBeVisible({ timeout: 15000 });
      responseText = await lastResponse.textContent() || 'Empty response';
    } catch {
      console.warn(`⚠️ No response found for question ${index + 1}`);
    }

    // Store result
    results.push({
      SNo: index + 1,
      Question: question,
      Response: responseText.trim(),
      Status: responseText.trim() !== 'No response' ? '✅ Success' : '❌ No Response'
    });

    await page.waitForTimeout(1000);
  }

  console.log('✅ All questions processed. Generating Excel report...');

  // ---- Write Results to Excel ----
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(results);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'VAssist Report');
  XLSX.writeFile(workbook, outputPath);

  console.log(`📊 Report saved successfully at: ${outputPath}`);
  await page.pause();
});
