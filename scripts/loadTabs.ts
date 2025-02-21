import { TabData } from "../models/TabData";

export function loadTabs(content: string): TabData[] {
    try {
        const json = JSON.parse(content);

        const tabs: TabData[] = json.map((tab: any) => ({
            url: tab.url,
            title: tab.title
        }));

        return tabs;
    } catch (error) {
        throw new Error('Failed to parse JSON');
    }
}