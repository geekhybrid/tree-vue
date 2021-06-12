export interface TreeViewItem {
    children?: TreeViewItem[]
    type: string
    checkedStatus?: CheckedState,
    name: string,
    id: string,
    parentId?: string
}

export interface ItemTypeCustomisations {
    makeItemsCheckable(types: string[]): void;
    typeCustomisations(): {[type: string]: Customisations };
}

export interface DefaultBehaviors {
    // Allow customisation of items that can be renamed on the tree.
    enableRenaming(type: string): void;
    // Allow customisation of items that can be deleted on the tree.
    enableDeleting(type: string): void;
    // Allow registration of handler to be called when an item of a particular type has been deleted.
    registerItemDeletedHandler(type: string, callback: (item: TreeViewItem) => Promise<TreeViewItem>): void;
    // Allow registration of a handler to be called when an item of a particular type has been renamed.
    registerItemRenamedHandler(type: string, callback: (renamedItem: TreeViewItem) => Promise<TreeViewItem>): void;
    // Allow registration of a handler to be called to verify if a drag-and-drop move operation is valid.
    registerItemCanMoveHandler(canItemMoveCallBack: (movingItem: TreeViewItem, destinationItem: TreeViewItem) => Promise<boolean>): void;
    // Allow registration of a handler to be called when a move operation is succesful. The moved item property will contain
    // the information of the parentID of it's new parent or undefined if it was moved to the root directory.
    registerItemMovedHandler(callBack: (movedItem: TreeViewItem) => Promise<TreeViewItem>): void;
}

export interface TreeViewCreatedEventPayload {
    itemCustomisations: ItemTypeCustomisations;
    eventManager: EventManager;
}

export interface EventManager {
    subscribeToItemChecked(type: string, callback: (item: TreeViewItem[]) => void): void;
    subscribeToItemUnchecked(type: string, callback: (item: TreeViewItem[]) => void): void;
}

export interface EventHub {
    onItemChecked(item: TreeViewItem): void;
    onItemUnChecked(item: TreeViewItem): void;
    onFolderChecked(folder: TreeViewItem): void
    onFolderUnChecked(folder: TreeViewItem): void;
    setSelectionMode(mode: string): void;
    readonly selectedItems: TreeViewItem[];
}

export interface TreeViewViewModel  {
    loadNodes(nodes: TreeViewItem[]): void;
    getNodes(): { [id: string]: TreeViewItem };
    removeTreeViewItem(id: string): boolean;
    removeFromParentNode(itemToRemove: TreeViewItem): void;
    removeChildNodes(node: TreeViewItem): void;
    addTreeViewItem(TreeViewItem: TreeViewItem): void;
    checkedStatusChanged(item: TreeViewItem): void;
    setSelectionMode(mode: SelectionMode): void;
    readonly selectedItems: TreeViewItem[];
}

export interface Customisations {
    isCheckable?: boolean;
}

export interface ItemCheckedChangedEvent {
    item: TreeViewItem,
    status: CheckedState
}

export type CheckedState = 'True' | 'False' | 'Indeterminate';
export type SelectionMode = 'Single' | 'Multiple';
