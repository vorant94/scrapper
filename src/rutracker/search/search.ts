import * as CATEGORIES from '../static/categories.json';
import * as QUERIES from '../static/queries.json';
import { Page } from 'puppeteer';
import { SearchResult } from './search-result';

export async function search (page: Page): Promise<SearchResult[]> {
  await page.goto('https://rutracker.org/forum/tracker.php');

  const results: SearchResult[] = [];

  for (const query of QUERIES) {
    const result: SearchResult = {
      ...query,
      count: 0
    };

    await page.type('#title-search', query.title);

    const category = CATEGORIES.find(({ text }) => text.includes(query.category));
    await page.select('#fs-main', category.value);

    await Promise.all([
      page.waitForNavigation(),
      page.click('#tr-submit-btn')
    ]);

    let searchResult: string = await page.$$eval('#tor-tbl > tbody > tr > td', ([element]) => element.innerHTML);
    searchResult = searchResult.replace(/^\s+|\s+$/g, '');
    if (searchResult === 'Не найдено') {
      results.push(result);
      break;
    }

    const resultCount: string = await page.$eval('#main_content_wrap > table > tbody > tr > td.w100.vMiddle > p.med.bold', (element) => element.innerHTML);
    result.count = +resultCount.replace(/^\s+|\s+$|Результатов поиска: | <span class="normal">\(max: 500\)<\/span>/g, '');
    results.push(result);
  }

  return results;
}
