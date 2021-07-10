export interface TreeViewItem {
    children?: TreeViewItem[]
    type: string
    checkedStatus?: CheckedState,
    name: string,
    id: string,
    parentId?: string
}

export interface ItemTypeCustomisations {
    isDropValid(droppedNode: TreeViewItem, dropHost: TreeViewItem): boolean;
    makeItemsCheckable(types: string[]): void;
    registerItemDeletedHandler(type: string, callback: (item: TreeViewItem) => Promise<boolean>): void;
    registerItemRenamedHandler(type: string, callback: (renamedItem: TreeViewItem) => Promise<TreeViewItem>): void;
    registerDragAndDropValidator(canItemMoveCallBack: (movingItem: TreeViewItem, destinationItem: TreeViewItem) => boolean): void;
    registerItemMovedHandler(callBack: (movedItem: TreeViewItem) => Promise<TreeViewItem>): void;
    
    registerAnyItemDeleted(callback: (item: TreeViewItem) => Promise<boolean>): void;
    registerAnyItemRenamed(callback: (item: TreeViewItem) => Promise<TreeViewItem>): void;
    registerAnyItemDragAndDrop(): void;
    
    disableDragAndDrop(): void;
    getCustomisation(type: string): Customisations;
    getRenameHandler(type: string): (item: TreeViewItem) => Promise<TreeViewItem>;
}

export interface Customisations {
    canRename?: boolean;
    isCheckable?: boolean;
}

export interface EditableItem {
    begin(): void;
    end(): void;
}

export interface RenameItemStartedEventArgs {
    item: EditableItem;
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

export interface ItemCheckedChangedEvent {
    item: TreeViewItem,
    status: CheckedState
}

export type CheckedState = 'True' | 'False' | 'Indeterminate';
export type SelectionMode = 'Single' | 'Multiple';
