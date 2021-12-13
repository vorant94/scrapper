import joi, { ObjectSchema } from 'joi';
import { Environment } from './environment';

const { boolean, number, object, string } = joi.types();

export const SCHEMA: ObjectSchema<Environment> = object
  .keys({
    PUPPETEER_HEADLESS: boolean.default(false),
    RUTRACKER_USERNAME: string.required(),
    RUTRACKER_PASSWORD: string.required(),
    TELEGRAM_BOT_TOKEN: string.required(),
    TELEGRAM_CHAT_ID: number.required(),
  })
  .options({
    stripUnknown: true,
  });
