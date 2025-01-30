import { TabData } from "../models/TabData";
import { loadTabs } from "../scripts/loadTabs";

describe('loadTabs', () => {
    it('should load tabs from a valid JSON string', () => {
        const json = '[{"url": "https://example.com", "title": "Example"}]';
        const expected: TabData[] = [{ url: 'https://example.com', title: 'Example' }];
        expect(loadTabs(json)).toEqual(expected);
    });

    it('should throw an error for an invalid JSON string', () => {
        const invalidJson = '[{"url": "https://example.com", "title": "Example"}';  // Missing closing bracket
        expect(() => loadTabs(invalidJson)).toThrow('Failed to parse JSON');
    });
});
