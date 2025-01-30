import { TabData } from "../models/TabData";

export function loadTabs(json: string): TabData[] {
    try {
        return JSON.parse(json);
    } catch (error) {
        throw new Error('Failed to parse JSON');
    }
}