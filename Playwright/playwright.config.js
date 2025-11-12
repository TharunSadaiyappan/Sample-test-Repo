import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // test folder
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],

  timeout: 120000, // ⏱️ 2 min max per test

  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000', // ✅ Common base URL (override via env variable)

    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,

    actionTimeout: 30000,     // ⏱️ 30s max for actions
    navigationTimeout: 60000, // ⏱️ 1 min for navigation

    // video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    locale: 'en-US',
    colorScheme: 'light',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  //   {
  //     name: 'firefox',
  //     use: { ...devices['Desktop Firefox'] },
  //   },
  //   {
  //     name: 'webkit',
  //     use: { ...devices['Desktop Safari'] },
  //   },
  //   {
  //     name: 'Mobile Chrome',
  //     use: { ...devices['Pixel 7'] },
  //   },
  //   {
  //     name: 'Mobile Safari - iPhone 16 Pro',
  //     use: {
  //       ...devices['iPhone 14 Pro'], // start from closest profile
  //       viewport: { width: 1179, height: 2556 }, // iPhone 16 Pro resolution
  //       deviceScaleFactor: 3,
  //       userAgent:
  //         'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  //       isMobile: true,
  //       hasTouch: true,
  //       defaultBrowserType: 'webkit', // Safari engine
  //     },
  //   },

   ],

  outputDir: 'test-results/',
});



