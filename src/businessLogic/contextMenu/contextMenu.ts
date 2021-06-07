import { TreeViewItem } from "@/businessLogic/contracts/types";

const contextMenuLookUp: {[type: string]: MenuItem[] } = {}

export interface MenuItem {
    label: string,
    icon?: string,
    isDisabled?: boolean;
    command: (item: TreeViewItem) => Promise<void>;
}

export interface ContextMenuConfiguration {
    registerMenuItems(type: string, menuItems: MenuItem[]): void;
    getMenuItems(type: string): MenuItem[];
}

export const contextMenuConfig : ContextMenuConfiguration = {
    registerMenuItems(type: string, menuItems: MenuItem[]) {
        contextMenuLookUp[type.toString()] = menuItems;
    },

    getMenuItems(type: string): MenuItem[] {
        return contextMenuLookUp[type.toString()];
    }
}