import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
  ],
  testDir: './src/test/pages',
  use: {
    baseURL: 'http://localhost:4200',
    headless: true,
  },
  webServer: {
    command: 'bun run dev',
    port: 4200,
  },
});
