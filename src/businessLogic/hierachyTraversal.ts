import { ExplorerItem, CheckedState, ItemTypes } from "../contracts/types"

///  This recursive call is used to traverse a folder looking for all children of a particular type
export const findChildrenOfType = (parent: ExplorerItem, expectedType: ItemTypes): ExplorerItem[] => {
    const children: ExplorerItem[] = [];
    if (!parent.children) return children;

    parent.children.forEach(explorerItem  => {
        if (explorerItem.type === expectedType) {
            children.push(explorerItem);
        }

        if (explorerItem.type === ItemTypes.Folder){
            children.push(...findChildrenOfType(explorerItem, expectedType));
        }
    });

    return children;
}

export const cascadeStateToDescendants = (item: ExplorerItem, state: CheckedState): void => {
    item.children?.forEach(child => {
        child.checkedStatus = state;
        cascadeStateToDescendants(child, state);
    })
}

// This returns a single array (flat) of all items in a collection of nodes.
export const flattenNodes = (nodes: ExplorerItem[] | undefined): {[id: string]: ExplorerItem} => {
    const flatLookUp: {[id: string]: ExplorerItem} = {};
    if (!nodes) return flatLookUp;

    nodes.forEach(node => {
        flatLookUp[node.id] = node;
        Object.assign(flatLookUp, flattenNodes(node.children));
    })
    return flatLookUp;
}