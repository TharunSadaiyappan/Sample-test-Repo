import { test, expect } from '@playwright/test';
import * as XLSX from 'xlsx';

test('Ask questions from Excel', async ({ page }) => {

  // --------------------------
  // 1️⃣ Read questions from Excel
  // --------------------------
  const workbook = XLSX.readFile("C:\\Users\\VH0000085\\Downloads\\Vassist_VSC (3).xlsx");
  const sheet = workbook.Sheets['Sheet1'];
  const data = XLSX.utils.sheet_to_json(sheet);

  // data = [{ Questions: 'Hello' }, { Questions: 'What is your name?' } ...]

  // --------------------------
  // 2️⃣ Login Steps
  // --------------------------
  await page.goto('https://v-assist-rp-qa.healthitplatform.com/login');

  await page.getByRole('textbox', { name: 'name@company.com' }).fill('tharun.sadaiyappan@valuehealthai.com');
  await page.locator('#password').nth(1).fill('Demo@123');
  await page.getByRole('button', { name: 'Login', exact: true }).click();

  await page.getByRole('combobox').filter({ hasText: 'Select client' }).click();
  await page.getByRole('option', { name: 'RP-Internal' }).click();
  await page.getByRole('combobox').filter({ hasText: 'Loading...' }).click();
  await page.getByRole('option', { name: 'VRA Assist' }).click();
  await page.getByRole('button', { name: 'Connect' }).click();

  // -----------------------------------------------------
  // 3️⃣ Loop through Excel questions and send them
  // -----------------------------------------------------
  for (const row of data) {
    const question = row.Questions;

    console.log("Asking: ", question);

    await page.getByRole('textbox', { name: 'Type your message...' }).fill(question);
    await page.getByRole('textbox', { name: 'Type your message...' }).press('Enter');

    await page.waitForTimeout(2000);   // To wait for reply before sending the next message
  }

});
