import { TabData } from '../models/TabData';
import { TabFormat } from '../models/TabFormat';

export function saveTabs(tabs: TabData[], format: TabFormat): string {
    switch (format) {
        case TabFormat.JSON:
            return JSON.stringify(tabs, null, 2);
        case TabFormat.MARKDOWN:
            return tabs
                .map(tab => `- [${tab.title}](${tab.url})`)
                .join('\n');
        case TabFormat.HTML:
            return `
            <html>
              <head><title>Saved Tabs</title></head>
              <body>
                <h1>Saved Tabs</h1>
                <ul>
                  ${tabs.map(tab => `<li><a href="${tab.url}">${tab.title}</a></li>`).join('')}
                </ul>
              </body>
            </html>
          `; // HTML format
        default:
            throw new Error('Unsupported format');
    }
}