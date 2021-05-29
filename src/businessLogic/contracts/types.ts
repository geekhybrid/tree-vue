export interface TreeViewItem {
    children?: TreeViewItem[]
    type: ItemTypes
    checkedStatus?: CheckedState,
    checkable?: boolean,
    name: string,
    id: string,
    parentId?: string
}

export interface ItemCheckedChangedEvent {
    item: TreeViewItem,
    status: CheckedState
}

export type CheckedState = 'True' | 'False' | 'Indeterminate';

export enum ItemTypes {
    Folder,
    Well,
    Lease,
}