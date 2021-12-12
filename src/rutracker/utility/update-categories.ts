import fs from 'fs';
import { Page } from 'puppeteer';

const FORM_ID = '#tr-form';

export async function updateCategories (page: Page) {
  await page.goto('https://rutracker.org/forum/tracker.php');

  const categories = await page.$$eval(
    `${FORM_ID} select[name="f[]"] option`,
    (elements) => elements.map(element => ({
      text: element.innerHTML,
      value: (element as HTMLOptionElement).value
    }))
  );

  fs.writeFileSync('./src/rutracker/static/options.json', JSON.stringify(categories));
}
