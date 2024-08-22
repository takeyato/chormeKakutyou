chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url.includes('example.com')) {
    chrome.storage.local.get(['reloadEnabled', 'reloaded', 'notificationsEnabled'], (result) => {
      if (result.reloadEnabled && !result.reloaded) {
        chrome.tabs.reload(tabId, () => {
          if (result.notificationsEnabled) {
            chrome.notifications.create({
              type: 'basic',
              iconUrl: 'icon.png',
              title: 'ページがリロードされました',
              message: '指定されたURLがリロードされました。',
              priority: 2
            });
          }
          chrome.storage.local.set({ reloaded: true });
        });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.resetReload) {
    chrome.storage.local.set({ reloaded: false });
  }
});
