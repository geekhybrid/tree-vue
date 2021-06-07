import { ItemCustomisations } from "./itemCustomisations";

describe("ItemCustomisation", () => {
    const customisations = ItemCustomisations;

    it("makeItemsCheckable() should make items checkable", () => {
        const expectedTypes = [".docs", ".excel"];
        customisations.makeItemsCheckable(expectedTypes);

        const customisedTypes = customisations.typeCustomisations();
        expectedTypes.forEach(type => {
            expect(customisedTypes[type].isCheckable).toBe(true);
        })
    });
});