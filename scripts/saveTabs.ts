import { TabData } from '../models/TabData';
import { TabFormat } from '../models/TabFormat';

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
  let markdown = tabs
    .map(tab => `- [${tab.title}](${tab.url})`)
    .join('\n');
  return markdown;
}

function saveTabsAsHtml(tabs: TabData[]): string {
  let html = '<html>\n<head>\n<title>Saved Tabs</title>\n</head>\n<body>\n<h1>Saved Tabs</h1>\n<ul>\n';
  tabs.forEach(tab => {
    html += tabs.map(tab => `<li><a href="${tab.url}">${tab.title}</a></li>`).join('\n');
  });
  html += '</ul>\n</body>\n</html>';
  return html;
}