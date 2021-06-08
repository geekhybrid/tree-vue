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

export interface TreeViewCreatedEventPayload {
    itemCustomisations: ItemTypeCustomisations;
    eventManager: EventManager
}

export interface EventManager {
    subscribeToItemChecked(type: string, callback: (item: TreeViewItem[]) => void): void;
    subscribeToItemUnchecked(type: string, callback: (item: TreeViewItem[]) => void): void;
}

export interface Customisations {
    isCheckable?: boolean;
}

export interface ItemCheckedChangedEvent {
    item: TreeViewItem,
    status: CheckedState
}

export type CheckedState = 'True' | 'False' | 'Indeterminate';