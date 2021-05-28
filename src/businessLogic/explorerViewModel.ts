import { Vue } from 'vue-property-decorator';
import { ExplorerItem, CheckedState } from "@/contracts/types";
import { eventHub } from "./explorerEventPublisher";
import { cascadeStateToDescendants, flattenNodes } from "./hierachyTraversal";

let flattenedNodesLookUp: { [id: string]: ExplorerItem } = {};

export const notifyParentOfSelection = (item: ExplorerItem) => {
    const parentId = item.parentId as string;
    if (!parentId) return;

    const parent = flattenedNodesLookUp[parentId];
    // Case 1: if no children are checked then parent should become unchecked
    // Case 2: If some children are checked the parent should become indeterminate
    // Case 3: If all children are checked the parent should be checked

    let hasACheckedChild = false;
    let hasAllChildrenChecked = true;

    parent.children?.forEach(child => {
        if (child.checkedStatus == 'True') {
            hasACheckedChild = true;
        } else {
            hasAllChildrenChecked = false;
        }

        if (hasACheckedChild && !hasAllChildrenChecked) return;
    })

    if (hasAllChildrenChecked) {
        parent.checkedStatus = 'True';
    }

    if (hasACheckedChild && !hasAllChildrenChecked) {
        parent.checkedStatus = 'Indeterminate';
    }

    if (!hasACheckedChild) {
        parent.checkedStatus = 'False';
    }

    notifyParentOfSelection(parent);
}

export const explorerViewModel = {
    loadNodes(nodes: ExplorerItem[]): void {
        flattenedNodesLookUp = flattenNodes(nodes);
    },

    getNodes(): { [id: string]: ExplorerItem } {
        return flattenedNodesLookUp
    },

    checkedStatusChanged(item: ExplorerItem): void {
        if (item.checkedStatus)
            eventHub.onItemChecked(item);
        else
            eventHub.onItemUnChecked(item);

        cascadeStateToDescendants(item, item.checkedStatus as CheckedState);
        notifyParentOfSelection(item);
    },

    removeExplorerItem(id: string): boolean {
        const itemToBeRemoved = flattenedNodesLookUp[id];

        if (!itemToBeRemoved) return false;

        const parentId = itemToBeRemoved.parentId;
        if (parentId) this.removeFromParentNode(itemToBeRemoved);

        if (itemToBeRemoved.children) {
            while (itemToBeRemoved.children.length > 0) {
                this.removeChildNodes(itemToBeRemoved.children[0], itemToBeRemoved)
            }
        }
        delete flattenedNodesLookUp[id];
        return true
    },

    removeFromParentNode(itemToRemove: ExplorerItem) {
        const parentId = itemToRemove.parentId;
        if (!parentId) return;

        const parent = flattenedNodesLookUp[parentId];
        const index = parent.children?.findIndex(node => node.id == itemToRemove.id)
        if (index! > -1) parent.children?.splice(index!, 1)
    },

    removeChildNodes(node: ExplorerItem, parentNode: ExplorerItem) {
        if (node.children) {
            while (node.children.length > 0) {
                this.removeChildNodes(node.children[0], node)
            }
        }
        this.removeFromParentNode(node)
        delete flattenedNodesLookUp[node.id];
    },

    addExplorerItem(explorerItem: ExplorerItem): void {
        flattenedNodesLookUp[explorerItem.id] = explorerItem;
        if(!explorerItem.parentId) return;

        const parent = flattenedNodesLookUp[explorerItem.parentId]
        if (parent.children) {
            parent.children.push(explorerItem);
        } else {
            Vue.set(parent, 'children', [explorerItem])
        }
    }
}
