import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30000,

  reporter: 'html',

  use: {
    headless: false,

    actionTimeout: 0,

    launchOptions: {
      slowMo: 200,
    },

    // 📸 screenshot khi fail
    screenshot: 'only-on-failure',

    // 🎥 video khi fail
    video: 'retain-on-failure',

    // 🧠 trace để debug (chỉ bật khi retry)
    trace: 'on-first-retry',


  },
  
});