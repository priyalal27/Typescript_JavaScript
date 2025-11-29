// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { config } from 'process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  //testDir: './tests',
  timeout:40000,
  workers: 3, // Run 3 tests in parallel
  reporter: [
    ['html', { outputFolder: './reports/html-report' }],
    ['json', { outputFile: './reports/results.json' }]
  ],
   use: {
    browserName: 'chromium',
    headless: false,
    slowMo: 2000,
    trace:'retain-on-failure',
    screenshot:'on',
    ignoreHTTPSErrors: true
  }

    
});

