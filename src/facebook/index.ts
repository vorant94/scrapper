import { FACEBOOK_ENV_SCHEMA, FacebookEnv } from './facebook-env';
import { config } from 'dotenv';
import fetch from 'node-fetch';
import { URL } from 'url';

(async () => {
  const { parsed } = config();
  const env: FacebookEnv = await FACEBOOK_ENV_SCHEMA.validateAsync(parsed);

  const url = new URL('https://graph.facebook.com/v12.0/me');
  url.searchParams.append('access_token', env.FACEBOOK_ACCESS_TOKEN);

  const res = await (await fetch(url.toString())).json();
  console.log(res);
})();
