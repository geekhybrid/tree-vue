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
});