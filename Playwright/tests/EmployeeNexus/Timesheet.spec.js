const { test, expect } = require('@playwright/test');
const { networkInterfaces } = require('os');

test('Timesheet', async ({ page }) => {

    await page.goto("https://hrms-dev.valuehealthai.com");
    await page.setViewportSize({ width: 1920, height: 1085 });
    await page.locator("#emailId").fill("tharun.s@valuehealthsol.com");
    await page.locator("[name='password']").fill("Test@123.");
    await page.locator("button[type='submit']").click();
    await page.locator("text=Timesheet").click();

    await page.locator("td[style*='text-align: center']").nth(1).click();
    await page.getByRole('button', { name: 'Add Task' }).click();
    await page.getByText("Select Task").click();
    await page.getByText("PROD Deployment ").click();
    await page.locator("input[id*='hours']").fill("9");
    await page.locator("#description").fill("Testing Qwerty #FUlly loaded");
    await page.getByText("Cancel").click();
    await page.locator("svg[data-testid*='CloseIcon']").click();
    //Day2
    await page.locator("td[style*='text-align: center']").nth(2).click();
    await page.getByRole('button', { name: 'Add Task' }).click();
    await page.getByText("Select Task").click();
    await page.getByText("PROD Deployment ").click();
    await page.locator("input[id*='hours']").fill("9");
    await page.locator("#description").fill("Testing Qwerty #FUlly loaded");
    await page.getByText("Cancel").click();
    await page.locator("svg[data-testid*='CloseIcon']").click();

    //Day3
    await page.locator("td[style*='text-align: center']").nth(3).click();
    await page.getByRole('button', { name: 'Add Task' }).click();
    await page.getByText("Select Task").click();
    await page.getByText("PROD Deployment ").click();
    await page.locator("input[id*='hours']").fill("9");
    await page.locator("#description").fill("Testing Qwerty #FUlly loaded");
    await page.getByText("Cancel").click();
    await page.locator("svg[data-testid*='CloseIcon']").click();


    //Day4
    await page.locator("td[style*='text-align: center']").nth(4).click();
    await page.getByRole('button', { name: 'Add Task' }).click();
    await page.getByText("Select Task").click();
    await page.getByText("PROD Deployment ").click();
    await page.locator("input[id*='hours']").fill("9");
    await page.locator("#description").fill("Testing Qwerty #FUlly loaded");
    await page.getByText("Cancel").click();
    await page.locator("svg[data-testid*='CloseIcon']").click();

    await page.pause();




















})