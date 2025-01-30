export interface TabData {
    url: string;
    title: string;
}

export function saveTabs(tabs: TabData[], format: 'json' | 'markdown' | 'html'): string {
    if (format === 'json') {
        return JSON.stringify(tabs);
    }

    return '';
}