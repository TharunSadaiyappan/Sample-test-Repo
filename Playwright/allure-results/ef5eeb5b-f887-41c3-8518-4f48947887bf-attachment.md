# Test info

- Name: test
- Location: C:\Users\CVHS\Documents\VS Code\tests\PracticePlaywright\V1assist.spec.js:3:5

# Error details

```
Error: locator.click: Error: strict mode violation: getByText('Default') resolved to 2 elements:
    1) <span title="Default" class="ant-select-selection-item">Default</span> aka locator('#root').getByText('Default')
    2) <div class="ant-select-item-option-content">Default</div> aka getByText('Default').nth(1)

Call log:
  - waiting for getByText('Default')

    at C:\Users\CVHS\Documents\VS Code\tests\PracticePlaywright\V1assist.spec.js:22:35
```

# Page snapshot

```yaml
- complementary:
  - img "collapse-img"
  - paragraph
  - menu:
    - menuitem "users-img Home":
      - img "users-img"
      - text: Home
- banner:
  - img "logo-alt"
  - button "AI Assistant"
- main:
  - main:
    - img "logo-alt"
    - heading "Please select to continue" [level=3]
    - combobox:
      - listbox:
        - option "Default" [selected]: 8496e34a-3950-411a-8d8d-1d4ea8121da4
    - text: Default
    - combobox [expanded]:
      - listbox:
        - img "No data"
        - text: No data
    - text: Select Program
    - textbox "Enter your message..." [disabled]: For which specific types and stages of cancer is LIBTAYO approved, and what diagnostic criteria must be met before initiating treatment?
    - img "audio"
- contentinfo:
  - paragraph: Copyright
  - text: ©
  - paragraph: 2025 V Assist. All Rights Reserved.
- text: Default
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test('test', async ({ page }) => {
   4 |   await page.goto('https://demovassist.healthitplatform.com/login');
   5 |   await page.getByRole('textbox', { name: 'Email' }).click();
   6 |   await page.getByRole('textbox', { name: 'Email' }).fill('tharun.sadaiyappan@valuehealthai.com');
   7 |   await page.getByRole('textbox', { name: 'Enter your Password' }).click();
   8 |   await page.getByRole('textbox', { name: 'Enter your Password' }).fill('Demo@123');
   9 |   await page.getByRole('button', { name: 'Login' }).click();
  10 |   await page.getByRole('textbox', { name: 'Enter your message...' }).click();
  11 |   let questions = [
  12 |   "For which specific types and stages of cancer is LIBTAYO approved, and what diagnostic criteria must be met before initiating treatment?",
  13 |   "How is LIBTAYO administered, and how often is it usually given?"
  14 | ];
  15 |
  16 | for (const question of questions) {
  17 |   await page.getByRole('textbox', { name: 'Enter your message...' }).fill(question);  // fill with the actual question
  18 |   await page.getByTestId('SendOutlinedIcon').click();
  19 |   await page.locator('.ant-select-selection-search').first().click();
  20 |   await page.getByText('Default').click();
  21 |   await page.locator('div').filter({ hasText: /^Select Program$/ }).nth(2).click();
> 22 |   await page.getByText('Default').click();
     |                                   ^ Error: locator.click: Error: strict mode violation: getByText('Default') resolved to 2 elements:
  23 | }
  24 |  
  25 | });
```