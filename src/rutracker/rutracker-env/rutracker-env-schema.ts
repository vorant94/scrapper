import joi, { ObjectSchema } from 'joi';
import { RutrackerEnv } from './rutracker-env';

const { boolean, number, object, string } = joi.types();

export const RUTRACKER_ENV_SCHEMA: ObjectSchema<RutrackerEnv> = object
  .keys({
    PUPPETEER_HEADLESS: boolean.default(true),
    DATABASE_FILENAME: string.default('tmp/rutracker.db'),
    RUTRACKER_USERNAME: string.required(),
    RUTRACKER_PASSWORD: string.required(),
    TELEGRAM_BOT_TOKEN: string.required(),
    TELEGRAM_CHAT_ID: number.required(),
  })
  .options({
    stripUnknown: true,
  });
