export async function search(page, title) {
  await page.goto('https://rutracker.org/forum/tracker.php')

  await page.type('#tr-form input[name="nm"]', title);

  await page.waitForNavigation();
}
