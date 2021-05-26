export interface ExplorerItem {
    children?: ExplorerItem[]
    type: ItemTypes
    checkedStatus?: CheckedState,
    checkable?: boolean,
    name: string,
    id: string,
    parentId?: string
}

export type CheckedState = 'True' | 'False' | 'Indeterminate';

export enum ItemTypes {
    Folder,
    Well,
    Lease,
}