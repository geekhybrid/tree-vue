import { TreeViewItem, CheckedState } from "../contracts/types"

///  This recursive call is used to traverse a folder looking for all children of a particular type
export const findChildrenOfType = (parent: TreeViewItem, expectedType: string): TreeViewItem[] => {
    const children: TreeViewItem[] = [];
    if (!parent.children) return children;

    parent.children.forEach(TreeViewItem  => {
        if (TreeViewItem.type === expectedType) {
            children.push(TreeViewItem);
        }

        if (TreeViewItem.type === 'folder'){
            children.push(...findChildrenOfType(TreeViewItem, expectedType));
        }
    });

    return children;
}

export const cascadeStateToDescendants = (item: TreeViewItem, state: CheckedState): void => {
    item.children?.forEach(child => {
        child.checkedStatus = state;
        cascadeStateToDescendants(child, state);
    })
}

// This returns a single array (flat) of all items in a collection of nodes.
export const flattenNodes = (nodes: TreeViewItem[] | undefined): {[id: string]: TreeViewItem} => {
    const flatLookUp: {[id: string]: TreeViewItem} = {};
    if (!nodes) return flatLookUp;

    nodes.forEach(node => {
        if (!node.children) {
            node.children = [];
        }

        flatLookUp[node.id] = node;
        Object.assign(flatLookUp, flattenNodes(node.children));
    })
    return flatLookUp;
}