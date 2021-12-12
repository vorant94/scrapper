import puppeteer from 'puppeteer';
import { Browser, ElementHandle, Page } from 'puppeteer';
import { envSchema } from 'env-schema';
import { BROWSER_LOGGER_TOKEN, browserLoggerFunction } from '../shared';
import { login } from './login';
import { search, SearchResult } from './search';
import { Env, SCHEMA } from '../core';

(async () => {
  const config: Env = envSchema<Env>({
    schema: SCHEMA,
    dotenv: true
  });

  const browser: Browser = await puppeteer.launch({ headless: config.PUPPETEER_HEADLESS });
  const page: Page = await browser.newPage();
  await page.exposeFunction(BROWSER_LOGGER_TOKEN, browserLoggerFunction);
  await page.goto('https://rutracker.org');

  const isLoggedIn: ElementHandle<HTMLElement> | null = await page.$('#logged-in-username');
  if (!isLoggedIn) {
    await login(page, config.RUTRACKER_LOGIN, config.RUTRACKER_PASSWORD);
  }

  const res: SearchResult[] = await search(page);
  console.log(res);
  await page.screenshot({ path: `rutracker-${new Date().getTime()}.png` });

  await browser.close();
})();
