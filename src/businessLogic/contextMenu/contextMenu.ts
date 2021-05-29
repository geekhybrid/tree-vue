import { TreeViewItem, ItemTypes } from "@/businessLogic/contracts/types";

const contextMenuLookUp: {[type: string]: MenuItem[] } = {}

export interface MenuItem {
    label: string,
    icon?: string,
    isDisabled?: boolean;
    command: (item: TreeViewItem) => Promise<void>;
}

export interface ContextMenuConfiguration {
    registerMenuItems(type: ItemTypes, menuItems: MenuItem[]): void;
    getMenuItems(type: ItemTypes): MenuItem[];
}

export const contextMenuConfig : ContextMenuConfiguration = {
    registerMenuItems(type: ItemTypes, menuItems: MenuItem[]) {
        contextMenuLookUp[type.toString()] = menuItems;
    },

    getMenuItems(type: ItemTypes): MenuItem[] {
        return contextMenuLookUp[type.toString()];
    }
}