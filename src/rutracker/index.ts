import { ElementHandle, Page } from 'puppeteer';
import { RutrackerCredentials, rutrackerLogin } from './rutracker-login';
import { Database } from 'sqlite';
import { RutrackerSearchResult, rutrackerTracker } from './rutracker-tracker';

export async function rutracker(
  page: Page,
  credentials: RutrackerCredentials,
  db: Database,
): Promise<RutrackerSearchResult[]> {
  await page.goto('https://rutracker.org');

  const isLoggedIn: ElementHandle<HTMLElement> | null = await page.$(
    '#logged-in-username',
  );
  if (!isLoggedIn) {
    await rutrackerLogin(page, credentials.username, credentials.password);
  }

  return await rutrackerTracker(page, db);
}

export { RutrackerSearchResult } from './rutracker-tracker';
