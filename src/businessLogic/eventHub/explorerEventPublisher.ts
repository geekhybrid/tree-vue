import { EventHub, EventManager, SelectionMode, TreeViewItem } from "../contracts/types"
import { findChildrenOfType } from "../hierachyTraversal/hierachyTraversal";

let selectedItems: TreeViewItem[] = [];
export const eventManager: EventManager = {
    // Add subscriber for item hecked to collection of subscribers
    subscribeToItemChecked(type: string, callback: (item: TreeViewItem[]) => void): void {
        onCheckedSubscribers[type] = onCheckedSubscribers[type] ?? [];
        onCheckedSubscribers[type].push(callback);
    },

    // Add subscriber for item unchecked to collection of subscribers
    subscribeToItemUnchecked(type: string, callback: (item: TreeViewItem[]) => void): void {
        onUnCheckedSubscribers[type] = onUnCheckedSubscribers[type] ?? [];
        onUnCheckedSubscribers[type].push(callback);
    },
}

export const eventHub: EventHub = {    
    // Publish events if any subscriber listening for item checked
    onItemChecked(item: TreeViewItem): void {
        if (selectionMode == 'Single') RemovePreviousSelectedItems();

        selectedItems.push(item);

        if (item.type == 'folder') {
            this.onFolderChecked(item);
        } else {
            const subscribers = onCheckedSubscribers[item.type.toString()];
            if (subscribers) {
                subscribers.forEach(callback => callback([item]));
            }
        }
    },

    // Publish events if any subscriber listening for item unchecked
    onItemUnChecked(item: TreeViewItem): void {
        remove(item, selectedItems);
        const subscribers = onUnCheckedSubscribers[item.type.toString()];
        if (subscribers) {
            subscribers.forEach(callback => callback([item]));
        }
    },

    /// Premise: Whenever a folder is checked, it automatically checks all it's decendants.
    /// Expected action: When a folder is checked, traverse it's tree to get see if any item has also been checked 
    //  for which a callback listener needs to be called
    onFolderChecked(folder: TreeViewItem): void {
        if (selectionMode == 'Single') RemovePreviousSelectedItems();
        selectedItems.push(folder);

        if (folder.type != 'folder') return;

        const itemTypesWithListeners = Object.keys(onCheckedSubscribers);
        itemTypesWithListeners.forEach(itemType => {
            const itemsToPublish = findChildrenOfType(folder, itemType);
            onCheckedSubscribers[itemType].forEach(subscriber => subscriber(itemsToPublish));
        });
    },

    /// Premise: Whenever a folder is checked, it automatically checks all it's decendants.
    /// Expected action: When a folder is un-checked, traverse it's tree to get see if any item
    // has also been checked for which a listener needs to be called
    onFolderUnChecked(folder: TreeViewItem): void {
        remove(folder, selectedItems);
        if (folder.type != 'folder') return;

        const itemTypesWithListeners = Object.keys(onUnCheckedSubscribers);
        itemTypesWithListeners.forEach(itemType => {
            const itemsToPublish = findChildrenOfType(folder, itemType);
            onUnCheckedSubscribers[itemType].forEach(subscriber => subscriber(itemsToPublish));
        });
    },

    setSelectionMode(mode: SelectionMode): void {
        selectionMode = mode;
    },

    selectedItems
}


function RemovePreviousSelectedItems() {
    selectedItems.forEach(item => item.checkedStatus = 'False');
    selectedItems = [];
}

function remove(item: TreeViewItem, collection: TreeViewItem[]) {
    const index = collection.indexOf(item);
    if (index > -1) collection.splice(index, 1);
}

const onCheckedSubscribers: {[type: string]: ((items: TreeViewItem[]) => void)[] } = {};
const onUnCheckedSubscribers: {[type: string]: ((items: TreeViewItem[]) => void)[] } = {};
        
let selectionMode: SelectionMode = 'Multiple';