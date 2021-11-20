const FORM_ID = '#login-form-full'

// TODO add check for captcha
export async function login(page, login, password) {
  await page.goto('https://rutracker.org/forum/login.php');

  await page.type(`${FORM_ID} input[name="login_username"]`, login);
  await page.type(`${FORM_ID} input[name="login_password"]`, password);

  await page.click(`${FORM_ID} input[name="login"]`);
  // page.screenshot({path: 'login.png'})
  await page.waitForNavigation();
}
