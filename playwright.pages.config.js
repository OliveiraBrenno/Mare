import {defineConfig} from '@playwright/test';
export default defineConfig({testDir:'./tests/deploy',workers:1,use:{baseURL:'http://127.0.0.1:4173/Mare/',launchOptions:{executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}},webServer:{command:'npm run preview:pages -- --host 127.0.0.1',url:'http://127.0.0.1:4173/Mare/',reuseExistingServer:false}});
