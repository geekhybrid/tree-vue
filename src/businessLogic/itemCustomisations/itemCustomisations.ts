import { ANY_TYPE } from "@/constants";
import { Customisations, ItemTypeCustomisations, TreeViewItem } from "../contracts/types";

const typeCustomisations: {[type: string]: Customisations } = {};
let canItemDrop: (movingItem: TreeViewItem, destinationItem: TreeViewItem) => boolean;
let isAllowAnyDrop = true;

let renameHandlers: {[type: string] : (item: TreeViewItem) => Promise<TreeViewItem> } = {}
let deleteHandlers: {[type: string] : (item: TreeViewItem) => Promise<boolean> } = {}

export const ItemCustomisations: ItemTypeCustomisations = {
    makeItemsCheckable(types: string[]): void {
        types.forEach(type => {
            if (!typeCustomisations[type])
                typeCustomisations[type] = {}

            typeCustomisations[type].isCheckable = true;
        });
    },

    registerDragAndDropValidator(canItemMoveCallBack: (movingItem: TreeViewItem, destinationItem: TreeViewItem) => boolean): void {
        isAllowAnyDrop = false;
        canItemDrop = canItemMoveCallBack;
    },

    registerItemDeletedHandler(type: string, callback: (item: TreeViewItem) => Promise<boolean>): void  {
        deleteHandlers[type] = callback;
    },

    registerItemRenamedHandler(type: string, callback: (renamedItem: TreeViewItem) => Promise<TreeViewItem>): void {
        renameHandlers[type] = callback;
        if (typeCustomisations[type])
        {
            typeCustomisations[type]
        }
        else 
        {
            typeCustomisations[type] = {
                canRename: true
            }
        }
    },

    registerItemMovedHandler(callBack: (movedItem: TreeViewItem) => Promise<TreeViewItem>): void {
        console.log(callBack);
    },

    registerAnyItemDeleted(callback: (item: TreeViewItem) => Promise<boolean>): void {
        deleteHandlers = {};
        deleteHandlers[ANY_TYPE] = callback;
    },

    registerAnyItemRenamed(callback: (item: TreeViewItem) => Promise<TreeViewItem>): void {
        renameHandlers = {};
        renameHandlers[ANY_TYPE] = callback;
    },

    registerAnyItemDragAndDrop(): void {
        isAllowAnyDrop = true;
        canItemDrop = () => true;
    },

    isDropValid(droppedNode: TreeViewItem, dropHost: TreeViewItem): boolean {
        if (!canItemDrop) return false;
        return canItemDrop(droppedNode, dropHost);
    },

    disableDragAndDrop(): void {
        isAllowAnyDrop = false;
        canItemDrop = () => false;
    },

    getCustomisation(type: string): Customisations {
        return typeCustomisations[type];
    },

    getRenameHandler(type: string): (item: TreeViewItem) => Promise<TreeViewItem> {
        return renameHandlers[type];
    }
}
