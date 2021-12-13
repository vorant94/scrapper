import { ElementHandle, Page } from 'puppeteer';
import { Credentials, SearchResult } from '../shared';
import { login } from './login';
import { tracker } from './tracker';

export async function rutracker(
  page: Page,
  credentials: Credentials,
): Promise<SearchResult[]> {
  await page.goto('https://rutracker.org');

  const isLoggedIn: ElementHandle<HTMLElement> | null = await page.$(
    '#logged-in-username',
  );
  if (!isLoggedIn) {
    await login(page, credentials.username, credentials.password);
  }

  return await tracker(page);
}
