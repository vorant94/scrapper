import puppeteer from 'puppeteer';
import {envSchema} from 'env-schema';
import {login} from "./utility/login";
import {search} from "./search";
import SCHEMA from "./static/schema";

(async () => {
  const config = envSchema({schema: SCHEMA, dotenv: true});

  // TODO find out why it doesn't work in headless mode as smoothly as in regular one
  const browser = await puppeteer.launch({headless: config.PUPPETEER_HEADLESS});
  const page = await browser.newPage();
  await page.goto('https://rutracker.org');

  const isLoggedIn = await page.$('#logged-in-username');
  // await page.screenshot({path: 'is-logged-in.png'})
  if (!isLoggedIn) {
    await login(page, config.RUTRACKER_LOGIN, config.RUTRACKER_PASSWORD);
  }

  const res = await search(page);
  console.log(res);
  // await page.screenshot({path: 'rutracker.png'});

  // await browser.close();
})();

