import {defineConfig} from '@playwright/test';
export default defineConfig({
 testDir:'./tests/browser',fullyParallel:true,workers:2,
 use:{baseURL:process.env.AUDIT_ORIGIN||'http://127.0.0.1:3000',browserName:'chromium'},
 reporter:[['list']],
});
