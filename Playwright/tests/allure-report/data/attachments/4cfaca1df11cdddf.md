# Test info

- Name: @Web Client App login
- Location: C:\Users\CVHS\Documents\VS Code\tests\PracticePlaywright\Practice1.spec.js:3:1

# Error details

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

    at C:\Users\CVHS\Documents\VS Code\tests\PracticePlaywright\Practice1.spec.js:28:41
```

# Page snapshot

```yaml
- navigation:
  - link "Automation Automation Practice":
    - /url: ""
    - heading "Automation" [level=3]
    - paragraph: Automation Practice
  - list:
    - listitem:
      - button " HOME"
    - listitem
    - listitem:
      - button " ORDERS"
    - listitem:
      - button " Cart"
    - listitem:
      - button "Sign Out"
- heading "My Cart" [level=1]
- button "Continue Shopping❯"
- heading "No Products in Your Cart !" [level=1]
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 |  
   3 | test('@Web Client App login', async ({ page }) => {
   4 |    //js file- Login js, DashboardPage
   5 |    const email = "anshika@gmail.com";
   6 |    const productName = 'zara coat 3';
   7 |    const products = page.locator(".card-body");
   8 |    await page.goto("https://rahulshettyacademy.com/client");
   9 |    await page.locator("#userEmail").fill(email);
  10 |    await page.locator("#userPassword").fill("Iamking@000");
  11 |    await page.locator("[value='Login']").click();
  12 |    await page.waitForLoadState('networkidle');           
  13 |    await page.locator(".card-body b").first().waitFor();
  14 |    const titles = await page.locator(".card-body b").allTextContents();
  15 |    console.log(titles); 
  16 |    const count = await products.count();
  17 |    for (let i = 0; i < count; ++i) {
  18 |       if (await products.nth(i).locator("b").textContent() === productName) {
  19 |          //add to cart
  20 |          await products.nth(i).locator("text= Add To Cart").click();
  21 |          break;
  22 |       }
  23 |    }  
  24 |  
  25 |    await page.locator("[routerlink*='cart']").click();
  26 |    //await page.pause();
  27 |  
> 28 |    await page.locator("div li").first().waitFor();
     |                                         ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  29 |    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
  30 |    expect(bool).toBeTruthy();
  31 |    await page.locator("text=Checkout").click();
  32 |  
  33 |    await page.locator("[placeholder*='Country']").fill("ind");
  34 |  
  35 |    const dropdown = page.locator(".ta-results");
  36 |    await dropdown.waitFor();
  37 |    const optionsCount = await dropdown.locator("button").count();
  38 |    for (let i = 0; i < optionsCount; ++i) {
  39 |       const text = await dropdown.locator("button").nth(i).textContent();
  40 |       if (text === " India") {
  41 |          await dropdown.locator("button").nth(i).click();
  42 |          break;
  43 |       }
  44 |    }
  45 |  
  46 |    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  47 |    await page.locator(".action__submit").click();
  48 |    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  49 |    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  50 |    console.log(orderId);
  51 |  
  52 |    await page.locator("button[routerlink*='myorders']").click();
  53 |    await page.locator("tbody").waitFor();
  54 |    const rows = await page.locator("tbody tr");
  55 |  
  56 |  
  57 |    for (let i = 0; i < await rows.count(); ++i) {
  58 |       const rowOrderId = await rows.nth(i).locator("th").textContent();
  59 |       if (orderId.includes(rowOrderId)) {
  60 |          await rows.nth(i).locator("button").first().click();
  61 |          break;
  62 |       }
  63 |    }
  64 |    const orderIdDetails = await page.locator(".col-text").textContent();
  65 |    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  66 |  
  67 | }); 
```