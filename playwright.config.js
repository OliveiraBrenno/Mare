import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './tests', testIgnore: '**/deploy/**', workers: 1, use: { baseURL: 'http://127.0.0.1:5173', launchOptions: { executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' } }, webServer: { command: 'npm run dev -- --host 127.0.0.1', url: 'http://127.0.0.1:5173', reuseExistingServer: true } });
