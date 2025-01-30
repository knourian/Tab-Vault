import { saveTabs } from '../scripts/saveTabs';
import { TabData } from '../scripts/saveTabs';

describe('saveTabs', () => {
    it('should save tabs in JSON format', () => {
        const tabs: Array<TabData> = [  // Explicitly use Array<TabData>
            { url: 'https://example.com', title: 'Example' },
            { url: 'https://another.com', title: 'Another Example' },
        ];
        const result = saveTabs(tabs, 'json');
        expect(result).toBe(JSON.stringify(tabs));
    });
});
