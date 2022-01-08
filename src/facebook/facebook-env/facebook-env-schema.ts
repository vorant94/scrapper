import joi, { ObjectSchema } from 'joi';
import { FacebookEnv } from './facebook-env';

const { object, string } = joi.types();

export const FACEBOOK_ENV_SCHEMA: ObjectSchema<FacebookEnv> = object
  .keys({
    FACEBOOK_ACCESS_TOKEN: string.required(),
    DATABASE_FILENAME: string.default('tmp/facebook.db'),
  })
  .options({
    stripUnknown: true,
  });
