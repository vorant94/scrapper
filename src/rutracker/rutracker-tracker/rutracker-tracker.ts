import { Page } from 'puppeteer';
import { Database } from 'sqlite';
import { RutrackerSearchQuery } from './rutracker-search-query';
import { RutrackerSearchResult } from './rutracker-search-result';
import { RutrackerCategory } from './rutracker-category';

export async function rutrackerTracker(
  page: Page,
  db: Database,
): Promise<RutrackerSearchResult[]> {
  await page.goto('https://rutracker.org/forum/tracker.php');

  const categories: RutrackerCategory[] = await db.all(
    `SELECT DISTINCT innerHTML, value
     FROM category`,
  );

  const queries: RutrackerSearchQuery[] = await db.all(
    `SELECT DISTINCT title, category
     FROM search_query`,
  );

  return await Promise.all(
    queries.map(async (query) => {
      const result: RutrackerSearchResult = {
        title: query.title,
        category: query.category,
        count: 0,
      };

      await page.type('#title-search', query.title);

      const category = categories.find(({ innerHTML }) =>
        innerHTML.includes(query.category),
      );
      if (!category) {
        throw new Error(`Category [${query.category}] is not found`);
      }
      await page.select('#fs-main', category.value);

      await Promise.all([
        page.waitForNavigation(),
        page.click('#tr-submit-btn'),
      ]);

      let searchResult: string = await page.$$eval(
        '#tor-tbl > tbody > tr > td',
        ([element]) => element.innerHTML,
      );
      searchResult = searchResult.replace(/^\s+|\s+$/g, '');
      if (searchResult === 'Не найдено') {
        return result;
      }

      const resultCount: string = await page.$eval(
        '#main_content_wrap > table > tbody > tr > td.w100.vMiddle > p.med.bold',
        (element) => element.innerHTML,
      );
      result.count = +resultCount.replace(
        /^\s+|\s+$|Результатов поиска: | <span class="normal">\(max: 500\)<\/span>/g,
        '',
      );

      return result;
    }),
  );
}
