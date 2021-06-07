import { TreeViewItem } from "../contracts/types"
import { findChildrenOfType, cascadeStateToDescendants, flattenNodes } from "./hierachyTraversal"

describe("findChildrenOfType()", () => {
    it("Should return a collection of n-th children(grand-children) in a folder", () => {
        const folder1: TreeViewItem = {
            type: 'folder',
            id: '1203-390293-1hdklsjdl-903923',
            name: "Documents",
            children: [
                {
                    type: 'docs',
                    name: "Resume",
                    id: '1203-390293-1hdklsjdl-903923',
                }
            ]
        }
        const folder2: TreeViewItem = {
            type: 'folder',
            name: "FX",
            id: '1203-390293-1hdklsjdl-903923',
            children: [
                {
                    type: 'docs',
                    name: "F-1",
                    id: '1203-390293-1hdklsjdl-903923',
                },
                {
                    type: 'docs',
                    name: "F-2",
                    id: '1203-390293-1hdklsjhdl-903923',
                },
                folder1,
            ]
        }

        const parentFolder: TreeViewItem = {
            name: "Nigeria",
            children: [folder1, folder2],
            type: 'folders',
            id: '1203-390293-1hdklsjdl-903923',
        }

        const wells = findChildrenOfType(parentFolder, 'docs');
        expect(wells).toHaveLength(4);
    });

    it("cascadeStateToDescendants() Should set all children check state to true", () =>{
        const parentFolder: TreeViewItem = {
            type: 'folder',
            id: '1203-390293-1hdklsjdl-903923',
            name: "Documents",
            children: [
                {
                    type: 'docs',
                    name: "Resume",
                    id: '1203-390293-1hdklsjdl-903923',
                },
                {
                    type: 'docs',
                    id: '1203-390293-1hdklsjdl-903923',
                    name: "cover-letter"
                },
            ]
        }

        cascadeStateToDescendants(parentFolder, 'True');
        parentFolder.children?.forEach(childItem => {
            expect(childItem.checkedStatus).toBe('True')
        })

    });

    it("cascadeStateToDescendants() Should set all children check state to false", () =>{
        const parentFolder: TreeViewItem = {
            type: 'folder',
            name: "Docs",
            id: '1203-390293-1hdklsjdl-903923',
            children: [
                {
                    type: 'docs',
                    name: "cover-letter",
                    checkedStatus: 'True',
                    id: '1203-390293-1hdkulsjdl-903923',
                },
                {
                    type: 'docs',
                    name: "resume",
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
        const parentFolder: TreeViewItem = {
            type: 'folder',
            name: "Folder",
            id: ids[0],
            children: [
                {
                    type: 'docs',
                    name: "cover letter",
                    checkedStatus: 'True',
                    id: ids[1],
                },
                {
                    type: 'docs',
                    name: "resume",
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