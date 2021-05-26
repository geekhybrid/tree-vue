import { ExplorerItem, ItemTypes } from "../contracts/types";
import { explorerViewModel } from "./explorerViewModel";

describe('explorerViewModel', () => {
    const child1: ExplorerItem = 
    {
        type: ItemTypes.Well,
        name: "PECON-001",
        checkedStatus: 'True',
        id: 'child-1',
        parentId: 'parent'
    };

    const child2: ExplorerItem = {
        type: ItemTypes.Well,
        name: "PECON-002",
        id: 'child-2',
        checkedStatus: 'True',
        parentId: 'parent'
    };

    const child3: ExplorerItem = {
        type: ItemTypes.Well,
        name: "PECON-003",
        id: 'child-3',
        checkedStatus: 'True',
        parentId: 'parent'
    };

    const parentFolder: ExplorerItem = {
        type: ItemTypes.Folder,
        name: "PECON",
        checkedStatus: 'False',
        id: 'parent',
    }

    beforeEach(() => {
        parentFolder.checkedStatus = 'False';
        child1.checkedStatus = 'False';
        child2.checkedStatus = 'False';
        parentFolder.children = [ child1, child2 ]
        explorerViewModel.loadNodes([parentFolder]);
    });

    it('checkedStatusChanged() should set parentFolder to true if all children are checked', () => {
        child1.checkedStatus = 'True';
        child2.checkedStatus = 'True';

        explorerViewModel.checkedStatusChanged(child1);
        expect(parentFolder.checkedStatus).toBe('True');
    });

    it('checkedStatusChanged() should set parentFolder to indeterminate if at least one of the children are unchecked', () => {
        child1.checkedStatus = 'True';
        child2.checkedStatus = 'False';

        explorerViewModel.checkedStatusChanged(child2);
        expect(parentFolder.checkedStatus).toBe('Indeterminate');
    });
    
    it('notifyParentOfSelection() should set parentFolder to false if all children are unchecked', () => {
        child1.checkedStatus = 'False';
        child2.checkedStatus = 'False';

        explorerViewModel.checkedStatusChanged(child2);
        expect(parentFolder.checkedStatus).toBe('False');
    });

    it('removeExplorerItem() should remove nodes from flatenedLookup', () => {
        explorerViewModel.removeExplorerItem(parentFolder.id);
        expect(parentFolder.children?.length).toBe(0);
        expect(explorerViewModel.getNodes()[parentFolder.id]).toBe(undefined);
    });

    it('removeExplorerItem() should remove one node from flatenedLookup', () => {
        explorerViewModel.removeExplorerItem(child2.id);
        expect(parentFolder.children?.length).toBe(1);
        const nodeIds = Object.keys(explorerViewModel.getNodes());
        expect(nodeIds.find(id=> id == child2.id)).toBe(undefined)
    });

    it('addExplorerItem() should add node to flatenedLookup', () => {
        explorerViewModel.addExplorerItem(child3);
        expect(parentFolder.children?.length).toBe(3)
        expect(explorerViewModel.getNodes()[child3.id]).toBe(child3);

    });
})