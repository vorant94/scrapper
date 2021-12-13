import { Environment, SCHEMA } from './core';
import puppeteer, { Browser, Page } from 'puppeteer';
import {
  BROWSER_LOGGER_TOKEN,
  browserLoggerFunction,
  SearchResult,
} from './shared';
import { rutracker } from './rutracker';
import { Telegraf } from 'telegraf';
import { config } from 'dotenv';

(async () => {
  const { parsed } = config();
  const environment: Environment = await SCHEMA.validateAsync(parsed);

  const browser: Browser = await puppeteer.launch({
    headless: environment.PUPPETEER_HEADLESS,
  });
  const page: Page = await browser.newPage();
  await page.exposeFunction(BROWSER_LOGGER_TOKEN, browserLoggerFunction);

  const res: SearchResult[] = await rutracker(page, {
    username: environment.RUTRACKER_USERNAME,
    password: environment.RUTRACKER_PASSWORD,
  });

  await browser.close();

  const bot = new Telegraf(environment.TELEGRAM_BOT_TOKEN);
  await bot.telegram.sendMessage(
    environment.TELEGRAM_CHAT_ID,
    `Hi, sir, here are your results:\n\n<pre>${JSON.stringify(res)}</pre>`,
    { parse_mode: 'HTML' },
  );
})();
