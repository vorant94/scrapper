import puppeteer from 'puppeteer';
import {envSchema} from 'env-schema';
import {login} from "./utility/login";
import {search} from "./search";
import SCHEMA from "./static/schema";
import {BROWSER_LOGGER_TOKEN, browserLoggerFunction} from "./utility/browser-logger.js";

(async () => {
  const config = envSchema({schema: SCHEMA, dotenv: true});

  const browser = await puppeteer.launch({headless: config.PUPPETEER_HEADLESS});
  const page = await browser.newPage();
  await page.exposeFunction(BROWSER_LOGGER_TOKEN, browserLoggerFunction);
  await page.goto('https://rutracker.org');

  const isLoggedIn = await page.$('#logged-in-username');
  if (!isLoggedIn) {
    await login(page, config.RUTRACKER_LOGIN, config.RUTRACKER_PASSWORD);
  }

  const res = await search(page);
  console.log(res)
  await page.screenshot({path: `rutracker-${new Date().getTime()}.png`});

  await browser.close();
})();

