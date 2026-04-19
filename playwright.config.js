import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',

  // параллельный запуск (нужно для CI/CD задания)
  fullyParallel: true,

  // CI поведение
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  // ===== РЕПОРТЫ (ВАЖНО ДЛЯ МЕТОДИЧКИ) =====
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['line'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  use: {
    // важно для твоего server.js
    baseURL: 'http://localhost:3000',

    // стабильность тестов в CI
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // браузеры (как в методичке)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // локальный запуск сервера (очень желательно для CI)
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    // timeout: 120 * 1000,
  },
});

