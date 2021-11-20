import puppeteer from 'puppeteer';
import {envSchema} from 'env-schema';
import {login} from "./login";
import {search} from "./search";
import {SCHEMA} from "./schema";

(async () => {
  const config = envSchema({schema: SCHEMA, dotenv: true});
  const browser = await puppeteer.launch({headless: !config.PUPPETEER_HEADLESS});
  const page = await browser.newPage();

  const isLoggedIn = await page.$('#logged-in-username');
  if (!isLoggedIn) {
    await login(page, config.RUTRACKER_LOGIN, config.RUTRACKER_PASSWORD);
  }

  await search(page, config.RUTRACKER_TITLE);

  await page.screenshot({path: 'rutracker.png'});

  await browser.close();
})();

