document.getElementById('saveTabsBtn')?.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'saveTabs' });
});

document.getElementById('loadTabsBtn')?.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'loadTabs' });
});
