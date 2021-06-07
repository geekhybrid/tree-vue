import { contextMenuConfig, ContextMenuConfiguration } from "./contextMenu";

describe("ContextMenu", () => {
    let configuration: ContextMenuConfiguration | undefined = undefined;
    beforeEach(() => {
        configuration = JSON.parse(JSON.stringify(contextMenuConfig));
    });

    it("registerMenuItems() adds context menu items for item type", () => {
        const expectedLabel = "Create Schematics";
        const iconPath = "@/foo/bars.png";
        const isDisabled = true;
        const expectedCommand = () => new Promise<void>((accept) => {});
        
        configuration?.registerMenuItems('docs', [{
            label: expectedLabel,
            icon: iconPath,
            isDisabled: isDisabled,
            command: expectedCommand
        }]);

        const commandItem = configuration?.getMenuItems('docs')[0];
        expect(commandItem?.label).toBe(expectedLabel);
        expect(commandItem?.icon).toBe(iconPath);
        expect(commandItem?.isDisabled).toBe(isDisabled);
        expect(commandItem?.command).toBe(expectedCommand);
    });
});
