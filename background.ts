import { TabData } from './models/TabData';
import { TabFormat } from './models/TabFormat';
import { downloadFile } from './scripts/fileHandler';
import { loadTabs } from './scripts/loadTabs';
import { saveTabs } from './scripts/saveTabs';

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'saveTabs') {
        const selectedTabs: TabData[] = message.selectedTabs;
        const selectedFormat: TabFormat = message.selectedFormat;

        let savedData: string;

        savedData = saveTabs(selectedTabs, selectedFormat);

        chrome.storage.local.set({ savedTabs: savedData }, () => {
            console.log('Tabs saved successfully');
        });

        chrome.runtime.sendMessage({
            action: 'downloadFile',
            savedData: savedData,
            selectedFormat: selectedFormat,
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