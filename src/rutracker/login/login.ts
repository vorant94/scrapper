import { Page } from 'puppeteer';

const FORM_ID = '#login-form-full';

// TODO add check for captcha
export async function login (page: Page, login: string, password: string): Promise<void> {
  await page.goto('https://rutracker.org/forum/login.php');

  await page.type(`${FORM_ID} input[name="login_username"]`, login);
  await page.type(`${FORM_ID} input[name="login_password"]`, password);

  await Promise.all([
    page.click(`${FORM_ID} input[name="login"]`),
    page.waitForNavigation()
  ]);
}