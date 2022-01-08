import { Page } from 'puppeteer';
import { RutrackerCredentials } from './rutracker-credentials';

const FORM_ID = '#login-form-full';

// TODO add check for captcha
export async function rutrackerLogin(
  page: Page,
  { username, password }: RutrackerCredentials,
): Promise<void> {
  await page.goto('https://rutracker.org/forum/login.php');

  await page.type(`${FORM_ID} input[name="login_username"]`, username);
  await page.type(`${FORM_ID} input[name="login_password"]`, password);

  await Promise.all([
    page.click(`${FORM_ID} input[name="login"]`),
    page.waitForNavigation(),
  ]);
}
