import { TreeViewItem } from "../contracts/types";
import { eventHub, eventManager } from "./explorerEventPublisher";

const itemCheckeckedCallBack = (items: TreeViewItem[]) => {};

const callBacks = {
    itemCheckeckedCallBack,
}


describe("eventPublisher", () => {
    it("should notify subscribers of all items checked of a type", () => {
        const expectedCheckedItem: TreeViewItem = {
            id: '1',
            name: 'Test',
            type: '.doc',
        };
        const subscriberCallBack = jest.spyOn(callBacks, "itemCheckeckedCallBack");

        eventManager.subscribeToItemChecked('.doc', callBacks.itemCheckeckedCallBack);
        eventHub.onItemChecked(expectedCheckedItem)

        expect(subscriberCallBack).toBeCalledWith([expectedCheckedItem]);
    });

    it("onItemChecked() should add item to selectedItems collection", () => {
        const expectedSelectedItem: TreeViewItem = {
            id: '1',
            name: 'Test',
            type: 'test'
        }
        eventHub.onItemChecked(expectedSelectedItem);
        expect(eventHub.selectedItems.pop()).toBe(expectedSelectedItem);
    });

    it("onItemUnchecked() should remove item from selectedItems collection", () => {
        const expectedSelectedItem: TreeViewItem = {
            id: '1',
            name: 'Test',
            type: 'test'
        }

        eventHub.selectedItems.push(expectedSelectedItem);
        eventHub.onItemUnChecked(expectedSelectedItem);

        expect(eventHub.selectedItems.indexOf(expectedSelectedItem)).toBe(-1);
    });
});