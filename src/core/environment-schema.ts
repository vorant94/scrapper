import joi, { ObjectSchema } from 'joi';
import { Environment } from './environment';

const { boolean, number, object, string } = joi.types();

export const ENVIRONMENT_SCHEMA: ObjectSchema<Environment> = object
  .keys({
    PUPPETEER_HEADLESS: boolean.default(true),
    DATABASE_FILENAME: string.default('tmp/database.db'),
    RUTRACKER_USERNAME: string.required(),
    RUTRACKER_PASSWORD: string.required(),
    TELEGRAM_BOT_TOKEN: string.required(),
    TELEGRAM_CHAT_ID: number.required(),
  })
  .options({
    stripUnknown: true,
  });
