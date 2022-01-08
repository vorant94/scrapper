import { RutrackerCredentials, rutrackerLogin } from './rutracker-login';
import { BROWSER_LOGGER_TOKEN, browserLoggerFunction } from '../shared';
import { RutrackerEnv } from './rutracker-env/rutracker-env';
import { RUTRACKER_ENV_SCHEMA } from './rutracker-env/rutracker-env-schema';
import { RutrackerSearchResult, rutrackerTracker } from './rutracker-tracker';
import { Telegraf } from 'telegraf';
import { config } from 'dotenv';
import puppeteer, { Browser, Page } from 'puppeteer';
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

(async () => {
  const { parsed } = config();
  const env: RutrackerEnv = await RUTRACKER_ENV_SCHEMA.validateAsync(parsed);

  const browser: Browser = await puppeteer.launch({
    headless: env.PUPPETEER_HEADLESS,
  });
  const page: Page = await browser.newPage();
  await page.exposeFunction(BROWSER_LOGGER_TOKEN, browserLoggerFunction);

  const db: Database = await open({
    filename: env.DATABASE_FILENAME,
    driver: sqlite3.Database,
  });

  const credentials: RutrackerCredentials = {
    username: env.RUTRACKER_USERNAME,
    password: env.RUTRACKER_PASSWORD,
  };

  await page.goto('https://rutracker.org');

  await rutrackerLogin(page, credentials);

  // await updateRutrackerCategories(page, db);

  const res: RutrackerSearchResult[] = await rutrackerTracker(page, db);

  const bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);
  await bot.telegram.sendMessage(
    env.TELEGRAM_CHAT_ID,
    `Hi, sir, here are your results:\n\n<pre>${JSON.stringify(res)}</pre>`,
    { parse_mode: 'HTML' },
  );

  await browser.close();
  await db.close();
})();
