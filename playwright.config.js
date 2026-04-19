import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['line'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  // 🔥 ВАЖНО: только один способ запуска сервера
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: false, // важно для CI
    timeout: 120000,
  },
});