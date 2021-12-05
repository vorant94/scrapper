export const BROWSER_LOGGER_TOKEN = 'BrowserLogger';

export const browserLoggerFunction = (string) => {
  console.log('Browser log: ', string)
};

export const addBrowserLoggerListener = async (page, browserLoggerConfig, browserLoggerToken = BROWSER_LOGGER_TOKEN) => {
  const pageFunction = (listenerConfigs, browserLoggerToken) => {
    window.onload = () => {
      const listenerConfigsArray = listenerConfigs instanceof Array ? listenerConfigs : [listenerConfigs];

      for (const listenerConfig of listenerConfigsArray) {
        window.document.querySelector(listenerConfig.selector).addEventListener(listenerConfig.event, () => {
          window[browserLoggerToken](listenerConfig.message);
        })
      }
    }
  };

  await page.evaluateOnNewDocument(pageFunction, browserLoggerConfig, browserLoggerToken)
}
