import { TabData } from '../models/TabData';
import { TabFormat } from '../models/TabFormat';

export function saveTabs(tabs: TabData[], format: 'json' | 'markdown' | 'html'): string {
    if (format === 'json') {
        return JSON.stringify(tabs);
    }

    return '';
}