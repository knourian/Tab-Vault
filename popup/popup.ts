import { TabData } from '../models/TabData';
import { TabFormat } from '../models/TabFormat';
import { downloadFile } from '../scripts/fileHandler';

const saveButton = document.getElementById('saveTabsBtn') as HTMLButtonElement;
const loadButton = document.getElementById('loadTabsBtn') as HTMLButtonElement;
const formatSelect = document.getElementById('format') as HTMLSelectElement;
const tabsList = document.getElementById('tabs-list') as HTMLDivElement;
const selectAllButton = document.getElementById('selectAllBtn') as HTMLButtonElement;
const clearSelectionButton = document.getElementById('clearSelectionBtn') as HTMLButtonElement;

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

loadButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                chrome.runtime.sendMessage({
                    action: 'loadTabs',
                    content,
                });
            };
            reader.readAsText(file);
        }
    };
    input.click();

});

selectAllButton.addEventListener('click', () => {
    const checkboxes = tabsList.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        (checkbox as HTMLInputElement).checked = true;
    });
});

clearSelectionButton.addEventListener('click', () => {
    const checkboxes = tabsList.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        (checkbox as HTMLInputElement).checked = false;
    });
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