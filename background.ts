import { TabData } from './models/TabData';
import { TabFormat } from './models/TabFormat';
import { loadTabs } from './scripts/loadTabs';
import { saveTabs } from './scripts/saveTabs';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'saveTabs') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tabData: TabData[] = tabs.map(tab => ({
                url: tab.url || '',
                title: tab.title || '',
            }));
            const json = saveTabs(tabData, TabFormat.JSON);
            chrome.storage.local.set({ savedTabs: json });
        });
    } else if (message.action === 'loadTabs') {
        chrome.storage.local.get('savedTabs', (result) => {
            if (result.savedTabs) {
                const tabs = loadTabs(result.savedTabs);
                console.log('Loaded Tabs:', tabs);
                const outputDiv = document.getElementById('tabsOutput');
                if (outputDiv) {
                    outputDiv.innerHTML = tabs.map(tab => `<a href="${tab.url}">${tab.title}</a><br>`).join('');
                }
            }
        });
    }
});