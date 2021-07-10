# Tree-Vue

A light-weight library for management of hierachical content. Most solutions I found did not offer the depth of flexibility I needed with the tree. I decided to solve my problem and also give back to the Vue community. Feel free to log issues, I will jump on them at the slightest opportunity. 😊

## What it does.

1. :heavy_check_mark: Hierachical rendering of content.
2. ✔️ Subscribing to items checked event (based on type)
3. :heavy_check_mark: Moving Items between folders (drag-and-drop)
4. :heavy_check_mark: Customising Item Rendering based on item type
5. ✔️ Rendering selectable items like checkboxes or plain content
6. ✔️ Double clicking to rename item
7. Programmatically toggle item visibility based on the `type` property.
8. Sorting items alphametically or grouping based on types
9. Disabling and Enabling Item
10. Programmatically determining what item can be dragged into another item.
11. Custom Context Menu depending on item type.

## What it looks like.

![image](https://user-images.githubusercontent.com/39003759/120940731-9d779580-c716-11eb-9c95-6c1ce388f786.png)

## How to use (Basic).
 
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

![image](https://user-images.githubusercontent.com/39003759/121064978-27c80400-c7c0-11eb-887a-db4f29660c8b.png)

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

### Making Items Checkable Or Plain TreeView Item

`Tree-vue` supports 2-major types of tree items. Checkable items or plain items. You can set your preferences for a particular `type`. To do so listen to the createdEvent of the `tree-view` component. 


#### Schema of CreatedEvent Payload

```ts
    export interface TreeViewCreatedEventPayload {
        itemCustomisations: ItemTypeCustomisations;
        eventManager: EventManager
        ...
    }
```

#### Example

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

<br>

## :construction: Managing Default Behaviors (WIP)

Out-of-the-box, `v-tree-vue` ships with default behaviors like double clicking an item to rename, pushing the `DEL` key to delete and moving (drag-and-drop) items into new locations. However, this is totally customisable. The default command API exposes the following configurations:

```ts
export interface ItemBehavior {
    // Allow customisation of items that can be renamed on the tree.
    enableRenaming(type: string): void;
    // Allow customisation of items that can be deleted on the tree.
    enableDeleting(type: string): void;
    // Allow registration of handler to be called when an item of a particular type has been deleted.
    registerItemDeletedHandler(type: string, callback: (item: TreeViewItem) => Promise<TreeViewItem>): void;
    // Allow registration of a handler to be called when an item of a particular type has been renamed.
    registerItemRenamedHandler(type: string, callback: (renamedItem: TreeViewItem) => Promise<TreeViewItem>): void;
    // Allow registration of a handler to be called to verify if a drag-and-drop move operation is valid.
    registerItemCanMoveHandler(canItemMoveCallBack: (movingItem: TreeViewItem, destinationItem: TreeViewItem) => Promise<boolean>): void;
    // Allow registration of a handler to be called when a move operation is succesful. The moved item property will contain
    // the information of the parentID of it's new parent or undefined if it was moved to the root directory.
    registerItemMovedHandler(callBack: (movedItem: TreeViewItem) => Promise<TreeViewItem>): void;
}
```

## One Handler for all Types ? (We've got you covered).

In many cases and existing apps, a single handler is called whenever an item is renamed or deleted irrespective of it's type. This handler may then make an API call that takes care of the rest.

To do so when calling the `registerItemRenamedHandler` or `registerItemDeletedHandler` pass 'ANY_TYPE' as the `type` property. The `callback` will be called whenever ANY item is renamed or deleted.

```ts
import { ANY_TYPE } from '@/constants.ts';
```

> This avoids moving magic strings around and provides a central point of change in the future should the need arise. However, you can get rid of the extra import statement and use a string with value 'ANY_TYPE'.
