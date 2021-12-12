import { Page } from 'puppeteer';
import { BrowserListenerConfig } from './browser-listener-config';
import { BROWSER_LOGGER_TOKEN } from './browser-logger-token';

export async function addBrowserListener (
  page: Page,
  browserLoggerConfig: BrowserListenerConfig | BrowserListenerConfig[],
  browserLoggerToken = BROWSER_LOGGER_TOKEN
): Promise<void> {
  function pageFunction (
    browserLoggerConfig: BrowserListenerConfig | BrowserListenerConfig[],
    browserLoggerToken: string
  ): void {
    window.onload = function () {
      const browserListenerConfigs: BrowserListenerConfig[] = browserLoggerConfig instanceof Array
        ? browserLoggerConfig
        : [browserLoggerConfig];

      for (const listenerConfig of browserListenerConfigs) {
        window.document.querySelector(listenerConfig.selector)
          ?.addEventListener(listenerConfig.event, () => {
            (window as { [key: string]: any })[browserLoggerToken](listenerConfig.message);
          });
      }
    };
  }

  await page.evaluateOnNewDocument(pageFunction, browserLoggerConfig, browserLoggerToken);
}
