import CATEGORIES from './static/categories';
import QUERIES from './static/queries';

export async function search(page) {
  await page.goto('https://rutracker.org/forum/tracker.php');

  const results = [];

  for (const query of QUERIES) {
    const result = {...query, count: 0}

    await page.type(`#title-search`, query.title);

    const category = CATEGORIES.find(({text}) => text.includes(query.category));
    await page.select(`#fs-main`, category.value);

    await page.click(`#tr-submit-btn`);
    await page.waitForNavigation();

    let searchResult = await page.$$eval(`#tor-tbl > tbody > tr > td`, ([element]) => element.innerHTML);
    searchResult = searchResult.replace(/^\s+|\s+$/g, '');
    if (searchResult === 'Не найдено') {
      results.push(result);
      break;
    }

    let resultCount = await page.$eval(`#main_content_wrap > table > tbody > tr > td.w100.vMiddle > p.med.bold`, (element) => element.innerHTML);
    result.count = resultCount.replace(/^\s+|\s+$|Результатов поиска: | <span class="normal">\(max: 500\)<\/span>/g, '');
    results.push(result)
  }

  return results
}
