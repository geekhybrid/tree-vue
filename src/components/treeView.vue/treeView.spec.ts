import { TreeViewCreatedEventPayload } from "@/businessLogic/contracts/types";
import { mount } from "@vue/test-utils";
import TreeView from "./treeView.vue";


describe("treeview.vue", () => {
    it("onCreated should emit events customisation payload", () => {
        const treeView = mount(TreeView);

        const emittedEvent = treeView.emitted().created;
        if (!emittedEvent) fail("Did not emit created event");

        const payload = emittedEvent[0][0] as TreeViewCreatedEventPayload;
        expect(payload.itemCustomisations).not.toBe(undefined);
    })
});