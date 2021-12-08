export const SCHEMA = {
  type: 'object',
  required: [
    'RUTRACKER_LOGIN',
    'RUTRACKER_PASSWORD'
  ],
  properties: {
    PUPPETEER_HEADLESS: {
      type: 'boolean',
      default: false
    },
    RUTRACKER_LOGIN: {
      type: 'string'
    },
    RUTRACKER_PASSWORD: {
      type: 'string'
    }
  }
};