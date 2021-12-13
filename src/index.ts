import { Environment, SCHEMA } from './core';
import puppeteer, { Browser, Page } from 'puppeteer';
import { BROWSER_LOGGER_TOKEN, browserLoggerFunction } from './shared';
import { config } from 'dotenv';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { rutracker, RutrackerSearchResult } from './rutracker';
import { Telegraf } from 'telegraf';

(async () => {
  const { parsed } = config();
  const environment: Environment = await SCHEMA.validateAsync(parsed);

  const browser: Browser = await puppeteer.launch({
    headless: environment.PUPPETEER_HEADLESS,
  });
  const page: Page = await browser.newPage();
  await page.exposeFunction(BROWSER_LOGGER_TOKEN, browserLoggerFunction);

  const db = await open({
    filename: environment.DATABASE_FILENAME,
    driver: sqlite3.Database,
  });

  const res: RutrackerSearchResult[] = await rutracker(
    page,
    {
      username: environment.RUTRACKER_USERNAME,
      password: environment.RUTRACKER_PASSWORD,
    },
    db,
  );

  const bot = new Telegraf(environment.TELEGRAM_BOT_TOKEN);
  await bot.telegram.sendMessage(
    environment.TELEGRAM_CHAT_ID,
    `Hi, sir, here are your results:\n\n<pre>${JSON.stringify(res)}</pre>`,
    { parse_mode: 'HTML' },
  );

  await browser.close();
  await db.close();
})();
