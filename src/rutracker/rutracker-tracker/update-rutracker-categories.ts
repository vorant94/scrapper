import { Page } from 'puppeteer';
import { Database } from 'sqlite';
import { RutrackerCategory } from './rutracker-category';

const FORM_ID = '#tr-form';

export async function updateRutrackerCategories(
  page: Page,
  db: Database,
): Promise<void> {
  await page.goto('https://rutracker.org/forum/tracker.php');

  const categories: RutrackerCategory[] = await page.$$eval(
    `${FORM_ID} select[name="f[]"] option`,
    (elements) =>
      elements.map((element) => ({
        innerHTML: element.innerHTML,
        value: (element as HTMLOptionElement).value,
      })),
  );

  await Promise.all(
    categories.map((category) =>
      db.run(
        `INSERT INTO category(innerHTML, value)
         VALUES (?, ?)`,
        [category.innerHTML, category.value],
      ),
    ),
  );
}
