import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  forbidOnly: true,
  retries: 0,
  workers: 2,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:4327', browserName: 'chromium' },
  projects: [
    { name: 'narrow', use: { viewport: { width: 320, height: 740 } } },
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
  ],
  webServer: {
    command: 'node scripts/preview-for-tests.mjs',
    url: 'http://127.0.0.1:4327',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
