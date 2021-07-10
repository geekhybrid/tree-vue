import { ItemCustomisations } from "./itemCustomisations";

describe("ItemCustomisation", () => {
    const customisations = ItemCustomisations;

    it("makeItemsCheckable() should make items checkable", () => {
        const expectedTypes = [".docs", ".excel"];
        customisations.makeItemsCheckable(expectedTypes);

        [".docs", ".excel"].forEach(type => {
            expect(customisations.getCustomisation(type).isCheckable).toBe(true);
        });
    });
});