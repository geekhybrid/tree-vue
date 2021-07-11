# Tree-Vue

A light-weight library for management of hierachical content. Most solutions I found did not offer the depth of flexibility I needed with the tree. I decided to solve my problem and also give back to the Vue community. Feel free to log issues, I will jump on them at the slightest opportunity. 😊

## Features

1. :heavy_check_mark: Hierachical rendering of content.
2. ✔️ Subscribing to items checked event (based on type)
3. :heavy_check_mark: Moving Items between folders (drag-and-drop)
4. :heavy_check_mark: Customising Item Rendering based on item type
5. ✔️ Rendering selectable items like checkboxes or plain content
6. ✔️ Double clicking to rename item

## Features in Development
1. Programmatically toggle item visibility based on the `type` property.
2. Sorting items alphametically or grouping based on types
3. Disabling and Enabling Item(s)
4. Programmatically determining what item can be dragged into another item.
5. -Custom Context Menu depending on item type.


![image](https://user-images.githubusercontent.com/39003759/125176959-e320f580-e1cf-11eb-886f-7a9c8808c178.png)

### Basic Component Rendering
``` html
<template>
    <tree-view :treeViewItems="treeViewNodes" />
</template>
```

```ts
<script lang='ts'>
import { Vue, Component} from 'vue-property-decorator';

import { TreeViewItem, ItemTypes } from '@/businessLogic/contracts/types';

@Component
export default class App extends Vue {
  treeViewNodes: TreeViewItem[] = []
}
```

## Item Schema

```ts
export interface TreeViewItem {
    children?: TreeViewItem[]
    type: string
    checkedStatus?: CheckedState,
    name: string,
    id: string,
    parentId?: string
}
```

## How to use Advance

### Custom Icon Based on Item Type.
You can customise item based on their `type` property.

```html
<template>
  <tree-view :treeViewItems="treeViewNodes">
      <template v-slot:icon="treeViewItem">
          <img src="@/assets/folder.svg" alt="folder" v-if="treeViewItem.type === 'folder'" >
          <img src="@/assets/word.png" alt="vue-logo" v-else-if="treeViewItem.type === '.doc'" height="22" width="22">
          <img src="@/assets/excel.png" alt="vue-logo" v-else-if="treeViewItem.type === '.excel'" height="22" width="22">
      </template>
  </tree-view>
</template>

```

## Advanced Customisation

The library provides a way to further customise the tree view by listening to the `v-on:created` event from the tree-view component. The payload surplied provides robust set of options for configuring the tree.

#### Schema of CreatedEvent Payload

```ts
    export interface TreeViewCreatedEventPayload {
        itemCustomisations: ItemTypeCustomisations;
        eventManager: EventManager
        ...
    }
```

Schema for `ItemTypeCustomisations`

```ts
export interface ItemTypeCustomisations {
    isDropValid(droppedNode: TreeViewItem, dropHost: TreeViewItem): boolean;
    makeItemsCheckable(types: string[]): void;
    registerItemRenamedHandler(type: string, callback: (renamedItem: TreeViewItem) => Promise<TreeViewItem>): void;
    registerDragAndDropValidator(canItemMoveCallBack: (movingItem: TreeViewItem, destinationItem: TreeViewItem) => boolean): void;
    disableDragAndDrop(): void;
    
    getCustomisation(type: string): Customisations;
    getRenameHandler(type: string): (item: TreeViewItem) => Promise<TreeViewItem>;

    registerItemDeletedHandler(type: string, callback: (item: TreeViewItem) => Promise<boolean>): void;
    registerItemMovedHandler(callBack: (movedItem: TreeViewItem) => Promise<TreeViewItem>): void;
    
    registerAnyItemDeleted(callback: (item: TreeViewItem) => Promise<boolean>): void;
    registerAnyItemRenamed(callback: (item: TreeViewItem) => Promise<TreeViewItem>): void;
    registerAnyItemDragAndDrop(): void;
}
```

## Example

```html
<template>
  <tree-view :treeViewItems="treeViewNodes" @created="customiseTreeView" />
</template>
```
```ts
<script lang='ts'>
import { Vue, Component} from 'vue-property-decorator';

import { TreeViewCreatedEventPayload, TreeViewItem } from '@/businessLogic/contracts/types';

@Component
export default class App extends Vue {
  
  // This method is called when the tree view is created (on Created hook). And allows you to customise the tree-view items using the payload passed into the function.

  customiseTreeView(treeCreatedEvent: TreeViewCreatedEventPayload) {
    const customisations = treeCreatedEvent.itemCustomisations;
    
    // `Tree-vue` supports 2-major types of tree items. Checkable items or plain items.
    customisations.makeItemsCheckable([".doc", ".excel", "media" ]);
  }

  treeViewNodes: TreeViewItem[] = [] // Populate tree items here.
  ];
}
</script>
```

#### Output

![image](https://user-images.githubusercontent.com/39003759/121091770-7090b480-c7e2-11eb-9ee5-e79351bd8ed8.png)

### Listening to Items Checked

To carter for advanced cases where `children` of the hierachical tree may be of different types. And you want to perform some further actions whenever something happens to them. You can subscribe for checked events of item types you may be interested in. And perform further actions.

### Use case
E.g A school has departments, and you want to check some departments and delete them.

### Solution
You can attach callbacks that notify you when departments have been checked on the tree.

### How to Use

```html
<template>    
    <!-- Examples of how to subscribe for events -->
    <tree-view :treeViewItems="schools" @created="customiseSchools" />
</template>
```
```ts
<script lang='ts'>
import { Vue, Component} from 'vue-property-decorator';

import { TreeViewCreatedEventPayload } from '@/businessLogic/contracts/types';

@Component
export default class App extends Vue {
  customiseSchools(treeCreatedEvent: TreeViewCreatedEventPayload) {
    const customisations = treeCreatedEvent.itemCustomisations;
    const eventManager = treeCreatedEvent.eventManager;

    eventManager.subscribeToItemChecked("department", (items) => console.log(items));
    customisations.makeItemsCheckable(["department"]);
  }
  schools: TreeViewItem[] = [
    {
      id: '1',
      type: 'school',
      name: 'Vue School',
      children: [
        {
          id: '2',
          type: 'department',
          name: 'Typescript Department',
          parentId: '1'
        },
        {
          id: '3',
          type: 'department',
          name: 'Open Source Department',
          parentId: '1'
        }
      ]
    }
  ]
}
```
## Properties

| Property      | Default | Description |
| ----------- | ----------- |-------------
| treeViewItems | Empty array      | An array of `TreeViewItem`.       |
| hideGuideLines | `false` | Determines the visibility of the guidelines
| selectionMode | `Multiple`   | `Single` or `Multiple`. This determines how many items can be simultaneously selected/checked in the tree.         |
