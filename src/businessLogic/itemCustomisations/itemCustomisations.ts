import { Customisations, ItemTypeCustomisations } from "../contracts/types";

const typeCustomisations: {[type: string]: Customisations } = {};

export const ItemCustomisations: ItemTypeCustomisations = {
    makeItemsCheckable(types: string[]): void {
        types.forEach(type => {
            if (!typeCustomisations[type])
                typeCustomisations[type] = {}

            typeCustomisations[type].isCheckable = true;
        });
    },

    typeCustomisations(): {[type: string]: Customisations } {
        return typeCustomisations;
    }
}
