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
        expect(result).toContain('- [Example](https://example.com)');
        expect(result).toContain('- [Another Example](https://another.com)');
        expect(result).toMatch(/# Saved Tabs - \d{4}\/\d{2}\/\d{2} \d{2}:\d{2}/);
    });

    it('should save tabs in HTML format', () => {
        const result = saveTabs(tabs, TabFormat.HTML);
        expect(result).toContain('<html>');
        expect(result).toContain('<a href="https://example.com">Example</a>');
        expect(result).toContain('<a href="https://another.com">Another Example</a>');
        expect(result).toMatch(/<h1>Saved Tabs - \d{4}\/\d{2}\/\d{2} \d{2}:\d{2}<\/h1>/);
    });

    it('should handle an empty list of tabs', () => {
        const resultJson = saveTabs([], TabFormat.JSON);
        expect(resultJson).toBe('[]');

        const resultMarkdown = saveTabs([], TabFormat.MARKDOWN);
        expect(resultMarkdown).toMatch(/# Saved Tabs - \d{4}\/\d{2}\/\d{2} \d{2}:\d{2}\n\n/);

        const resultHtml = saveTabs([], TabFormat.HTML);
        expect(resultHtml).toMatch(/<h1>Saved Tabs - \d{4}\/\d{2}\/\d{2} \d{2}:\d{2}<\/h1>\n\s*<ul>\n\s*<\/ul>/);
    });
});