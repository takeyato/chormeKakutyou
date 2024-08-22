document.addEventListener('DOMContentLoaded', () => {
  const reloadCheckbox = document.getElementById('reloadCheckbox');
  const notificationsCheckbox = document.getElementById('notificationsCheckbox');

  // 初期状態を設定
  chrome.storage.local.get(['reloadEnabled', 'notificationsEnabled'], (result) => {
    reloadCheckbox.checked = result.reloadEnabled || false;
    notificationsCheckbox.checked = result.notificationsEnabled || false;
  });

  // チェックボックスの変更を保存
  reloadCheckbox.addEventListener('change', () => {
    chrome.storage.local.set({ reloadEnabled: reloadCheckbox.checked });
    if (!reloadCheckbox.checked) {
      chrome.runtime.sendMessage({ resetReload: true });
    }
  });

  notificationsCheckbox.addEventListener('change', () => {
    chrome.storage.local.set({ notificationsEnabled: notificationsCheckbox.checked });
  });
});
