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
}

export interface Customisations {
    isCheckable?: boolean;
}

export interface ItemCheckedChangedEvent {
    item: TreeViewItem,
    status: CheckedState
}

export type CheckedState = 'True' | 'False' | 'Indeterminate';