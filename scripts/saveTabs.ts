import { TabData } from '../models/TabData';
import { TabFormat } from '../models/TabFormat';
import { getFormattedDate } from './utils';

export function saveTabs(tabs: TabData[], format: TabFormat): string {
  switch (format) {
    case TabFormat.JSON:
      return saveTabsAsJson(tabs);
    case TabFormat.MARKDOWN:
      return saveTabsAsMarkdown(tabs);
    case TabFormat.HTML:
      return saveTabsAsHtml(tabs);
    default:
      throw new Error('Unsupported format');
  }
}


function saveTabsAsJson(tabs: TabData[]): string {
  const json = JSON.stringify(tabs, null, 2);
  return json;
}

function saveTabsAsMarkdown(tabs: TabData[]): string {
  const formattedDate = getFormattedDate();
  let markdown = `# Saved Tabs - ${formattedDate}\n\n`;
  markdown += tabs
    .map(tab => `- [${tab.title}](${tab.url})`)
    .join('\n');
  return markdown;
}

function saveTabsAsHtml(tabs: TabData[]): string {
  const formattedDate = getFormattedDate();
  const tabItems = tabs.map(tab => `<li><a href="${tab.url}">${tab.title}</a></li>`).join('\n');
  const html = `
<html>
<head>
  <title>Saved Tabs</title>
</head>
<body>
  <h1>Saved Tabs - ${formattedDate}</h1>
  <ul>
    ${tabItems}
  </ul>
</body>
</html>
  `;

  return html;
}