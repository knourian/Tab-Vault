import { TabData } from '../models/TabData';
import { TabFormat } from '../models/TabFormat';
import { downloadFile } from '../scripts/fileHandler';

const saveButton = document.getElementById('saveTabsBtn') as HTMLButtonElement;
const loadButton = document.getElementById('loadTabsBtn') as HTMLButtonElement;
const formatSelect = document.getElementById('format') as HTMLSelectElement;
const tabsList = document.getElementById('tabs-list') as HTMLDivElement;

chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = tab.id!.toString();
        checkbox.id = `tab-${tab.id}`;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(tab.title || tab.url as string));
        label.title = tab.url as string;
        tabsList.appendChild(label);
    });
});

saveButton.addEventListener('click', () => {
    const selectedTabs: TabData[] = [];
    const selectedFormat = TabFormat[formatSelect.value as keyof typeof TabFormat];

    // Collect selected tabs
    const checkboxes = tabsList.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach(element => {
        const checkbox = element as HTMLInputElement;
        const tabId = parseInt(checkbox.value, 10);
        chrome.tabs.get(tabId, (tab) => {
            if (tab) {
                selectedTabs.push({ title: tab.title as string, url: tab.url as string });
            }
        });
    });

    setTimeout(() => {
        chrome.runtime.sendMessage({
            action: 'saveTabs',
            selectedTabs,
            selectedFormat,
        });
    }, 2000);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const { savedData, selectedFormat } = message;
    if (message.action === 'downloadFile') {
        switch (selectedFormat) {
            case TabFormat.JSON:
                downloadFile(savedData, 'tabs.json', 'application/json');
                break;
            case TabFormat.MARKDOWN:
                downloadFile(savedData, 'tabs.md', 'text/markdown');
                break;
            case TabFormat.HTML:
                downloadFile(savedData, 'tabs.html', 'text/html');
                break;
            default:
                throw new Error('Unsupported format');
        }
    }
});