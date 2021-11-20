// TODO add check for captcha
export async function login(page, login, password) {
  await page.goto('https://rutracker.org/forum/login.php');

  await page.type('#login-form-full input[name="login_username"]', login);
  await page.type('#login-form-full input[name="login_password"]', password);

  await page.click('#login-form-full input[name="login"]');
  await page.waitForNavigation();
}
