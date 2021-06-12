import { TreeViewItem } from "../contracts/types";
import { TreeViewModel } from "./treeViewViewModel";

describe('TreeViewModel', () => {
    const child1: TreeViewItem = 
    {
        type: "w-file",
        name: "Cover Letter",
        checkedStatus: 'True',
        id: 'child-1',
        parentId: 'parent'
    };

    const child2: TreeViewItem = {
        type: 'w-file',
        name: "Resume",
        id: 'child-2',
        checkedStatus: 'True',
        parentId: 'parent'
    };

    const child3: TreeViewItem = {
        type: 'w-file',
        name: "Introduction",
        id: 'child-3',
        checkedStatus: 'True',
        parentId: 'parent'
    };

    const parentFolder: TreeViewItem = {
        type: 'Folder',
        name: "PECON",
        checkedStatus: 'False',
        id: 'parent',
    }

    beforeEach(() => {
        parentFolder.checkedStatus = 'False';
        child1.checkedStatus = 'False';
        child2.checkedStatus = 'False';
        parentFolder.children = [ child1, child2 ]
        TreeViewModel.loadNodes([parentFolder]);
        while(TreeViewModel.selectedItems.length != 0) {
            TreeViewModel.selectedItems.pop();
        }
    });

    it('checkedStatusChanged() should set parentFolder to true if all children are checked', () => {
        child1.checkedStatus = 'True';
        child2.checkedStatus = 'True';

        TreeViewModel.checkedStatusChanged(child1);
        expect(parentFolder.checkedStatus).toBe('True');
    });

    it('checkedStatusChanged() should set parentFolder to indeterminate if at least one of the children are unchecked', () => {
        child1.checkedStatus = 'True';
        child2.checkedStatus = 'False';

        TreeViewModel.checkedStatusChanged(child2);
        expect(parentFolder.checkedStatus).toBe('Indeterminate');
    });
    
    it('notifyParentOfSelection() should set parentFolder to false if all children are unchecked', () => {
        child1.checkedStatus = 'False';
        child2.checkedStatus = 'False';

        TreeViewModel.checkedStatusChanged(child2);
        expect(TreeViewModel.selectedItems).toHaveLength(0);
        expect(parentFolder.checkedStatus).toBe('False');
    });

    it('notifyParentOfSelection() should set parentFolder to Indeterminate & add to selectedItems if any child is checked', () => {
        child1.checkedStatus = 'True';
        child2.checkedStatus = 'False';

        TreeViewModel.checkedStatusChanged(child1);
        expect(TreeViewModel.selectedItems).toHaveLength(1);
        expect(parentFolder.checkedStatus).toBe('Indeterminate');
    });

    it('removeTreeViewItem() should remove nodes from flatenedLookup', () => {
        TreeViewModel.removeTreeViewItem(parentFolder.id);
        expect(parentFolder.children?.length).toBe(0);
        expect(TreeViewModel.getNodes()[parentFolder.id]).toBe(undefined);
    });

    it('removeTreeViewItem() should remove one node from flatenedLookup', () => {
        TreeViewModel.removeTreeViewItem(child2.id);
        expect(parentFolder.children?.length).toBe(1);
        const nodeIds = Object.keys(TreeViewModel.getNodes());
        expect(nodeIds.find(id=> id == child2.id)).toBe(undefined)
    });

    it('addTreeViewItem() should add node to flatenedLookup', () => {
        TreeViewModel.addTreeViewItem(child3);
        expect(parentFolder.children?.length).toBe(3)
        expect(TreeViewModel.getNodes()[child3.id]).toBe(child3);
    });
})