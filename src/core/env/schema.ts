export const SCHEMA = {
  type: 'object',
  required: [
    'RUTRACKER_USERNAME',
    'RUTRACKER_PASSWORD',
    'TELEGRAM_BOT_TOKEN',
    'TELEGRAM_CHAT_ID',
  ],
  properties: {
    PUPPETEER_HEADLESS: {
      type: 'boolean',
      default: false,
    },
    RUTRACKER_USERNAME: {
      type: 'string',
    },
    RUTRACKER_PASSWORD: {
      type: 'string',
    },
    TELEGRAM_BOT_TOKEN: {
      type: 'string',
    },
    TELEGRAM_CHAT_ID: {
      type: 'string',
    },
  },
};
