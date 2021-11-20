import fs from "fs";

const FORM_ID = '#tr-form'

export async function updateCategories(page) {
  await page.goto('https://rutracker.org/forum/tracker.php');

  const categories = await page.$$eval(
    `${FORM_ID} select[name="f[]"] option`,
    (elements) => elements.map(element => ({
      text: element.innerHTML,
      value: element.value
    }))
  );

  fs.writeFileSync('./src/rutracker/static/options.json', JSON.stringify(categories));
}
