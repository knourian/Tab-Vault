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
        const content: string = message.content;
        const tabs = loadTabs(content);
        tabs.forEach(tab => {
            chrome.tabs.create({ url: tab.url });
        });
    }
});