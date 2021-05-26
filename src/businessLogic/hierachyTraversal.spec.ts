import { ExplorerItem, ItemTypes } from "../contracts/types"
import { findChildrenOfType, cascadeStateToDescendants, flattenNodes } from "./hierachyTraversal"

describe("findChildrenOfType()", () => {
    it("Should return a collection of n-th children(grand-children) in a folder", () => {
        const folder1: ExplorerItem = {
            type: ItemTypes.Folder,
            id: '1203-390293-1hdklsjdl-903923',
            name: "PECON",
            children: [
                {
                    type: ItemTypes.Well,
                    name: "PECON-01",
                    id: '1203-390293-1hdklsjdl-903923',
                }
            ]
        }
        const folder2: ExplorerItem = {
            type: ItemTypes.Folder,
            name: "FALCON",
            id: '1203-390293-1hdklsjdl-903923',
            children: [
                {
                    type: ItemTypes.Well,
                    name: "F-1",
                    id: '1203-390293-1hdklsjdl-903923',
                },
                {
                    type: ItemTypes.Well,
                    name: "F-2",
                    id: '1203-390293-1hdklsjhdl-903923',
                },
                folder1,
            ]
        }

        const parentFolder: ExplorerItem = {
            name: "Nigeria",
            children: [folder1, folder2],
            type: ItemTypes.Folder,
            id: '1203-390293-1hdklsjdl-903923',
        }

        const wells = findChildrenOfType(parentFolder, ItemTypes.Well);
        expect(wells).toHaveLength(4);
    });

    it("cascadeStateToDescendants() Should set all children check state to true", () =>{
        const parentFolder: ExplorerItem = {
            type: ItemTypes.Folder,
            id: '1203-390293-1hdklsjdl-903923',
            name: "PECON",
            children: [
                {
                    type: ItemTypes.Well,
                    name: "PECON-001",
                    id: '1203-390293-1hdklsjdl-903923',
                },
                {
                    type: ItemTypes.Well,
                    id: '1203-390293-1hdklsjdl-903923',
                    name: "PECON-002"
                },
            ]
        }

        cascadeStateToDescendants(parentFolder, 'True');
        parentFolder.children?.forEach(childItem => {
            expect(childItem.checkedStatus).toBe('True')
        })

    });

    it("cascadeStateToDescendants() Should set all children check state to false", () =>{
        const parentFolder: ExplorerItem = {
            type: ItemTypes.Folder,
            name: "PECON",
            id: '1203-390293-1hdklsjdl-903923',
            children: [
                {
                    type: ItemTypes.Well,
                    name: "PECON-001",
                    checkedStatus: 'True',
                    id: '1203-390293-1hdkulsjdl-903923',
                },
                {
                    type: ItemTypes.Well,
                    name: "PECON-002",
                    id: '1203-39v0293-1hdklsjdl-903923',
                    checkedStatus: 'True'
                },
            ]
        }

        cascadeStateToDescendants(parentFolder, 'False');
        parentFolder.children?.forEach(childItem => {
            expect(childItem.checkedStatus).toBe('False')
        })

    });

    it("flattenNodes() should return flat array of all nodes", () => {
        const ids = ['1203-390293-1hdklsjdl-903923', '1203-390293-1hdkulsjdl-903923', '1203-39v0293-1hdklsjdl-903923']
        const parentFolder: ExplorerItem = {
            type: ItemTypes.Folder,
            name: "PECON",
            id: ids[0],
            children: [
                {
                    type: ItemTypes.Well,
                    name: "PECON-001",
                    checkedStatus: 'True',
                    id: ids[1],
                },
                {
                    type: ItemTypes.Well,
                    name: "PECON-002",
                    id: ids[2],
                    checkedStatus: 'True'
                },
            ]
        }

        const flatLookUp = flattenNodes([parentFolder]);
        const nodeIds = Object.keys(flatLookUp);
        expect(nodeIds).toStrictEqual(ids)
    });

});