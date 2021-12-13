import { Env, SCHEMA } from './core';
import { envSchema } from 'env-schema';
import puppeteer, { Browser, Page } from 'puppeteer';
import {
  BROWSER_LOGGER_TOKEN,
  browserLoggerFunction,
  SearchResult,
} from './shared';
import { rutracker } from './rutracker';
import { Telegraf } from 'telegraf';

(async () => {
  const config: Env = envSchema<Env>({
    schema: SCHEMA,
    dotenv: true,
  });
  const browser: Browser = await puppeteer.launch({
    headless: config.PUPPETEER_HEADLESS,
  });
  const page: Page = await browser.newPage();
  await page.exposeFunction(BROWSER_LOGGER_TOKEN, browserLoggerFunction);

  const res: SearchResult[] = await rutracker(page, {
    username: config.RUTRACKER_USERNAME,
    password: config.RUTRACKER_PASSWORD,
  });

  await browser.close();

  const bot = new Telegraf(config.TELEGRAM_BOT_TOKEN);
  await bot.telegram.sendMessage(
    config.TELEGRAM_CHAT_ID,
    `Hi, sir, here are your results:\n\n<pre>${JSON.stringify(res)}</pre>`,
    { parse_mode: 'HTML' },
  );
})();
