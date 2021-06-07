export interface TreeViewItem {
    children?: TreeViewItem[]
    type: string
    checkedStatus?: CheckedState,
    name: string,
    id: string,
    parentId?: string
}

export interface ItemCheckedChangedEvent {
    item: TreeViewItem,
    status: CheckedState
}

export type CheckedState = 'True' | 'False' | 'Indeterminate';