import { TabData } from '../models/TabData';
import { TabFormat } from '../models/TabFormat';
import { saveTabs } from '../scripts/saveTabs';


describe('saveTabs', () => {
    const tabs: Array<TabData> = [
        { url: 'https://example.com', title: 'Example' },
        { url: 'https://another.com', title: 'Another Example' },
    ];

    it('should save tabs in JSON format', () => {
        const result = saveTabs(tabs, TabFormat.JSON);
        expect(result).toBe(JSON.stringify(tabs, null, 2));
    });

    it('should save tabs in Markdown format', () => {
        const result = saveTabs(tabs, TabFormat.MARKDOWN);
        expect(result).toBe('- [Example](https://example.com)\n- [Another Example](https://another.com)');
    });

    it('should save tabs in HTML format', () => {
        const result = saveTabs(tabs, TabFormat.HTML);
        expect(result).toContain('<html>');
        expect(result).toContain('<a href="https://example.com">Example</a>');
        expect(result).toContain('<a href="https://another.com">Another Example</a>');
    });
});