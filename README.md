# Tree-Vue

A light-weight library for management of hierachical content. Most solutions I found did not offer the depth of flexibility I needed with the tree order than simply display the items. I decided to solve my problem and also give back. Feel free to log issues, I will jump on them at the slightest opportunity. 😊

## What it does.

1. :heavy_check_mark: Hierachical rendering of content.
2. Event publishing/subscription from items
    - Item (un)checked event
    - :heavy_check_mark: Item moved (drag-and-drop)
    - Custom formating of items on the tree based on the `type` property. (Coming soon)
      - :heavy_check_mark: Customising Icons
      - ✔️ Rendering (checkboxes or plain content)
      - Custom Context Menu
3. Programmatically toggle item visibility based on the `type` property.

## What it looks like.

![image](https://user-images.githubusercontent.com/39003759/120940731-9d779580-c716-11eb-9c95-6c1ce388f786.png)

## How to use (Basic).
 
``` html
<template>
    <tree-view :treeViewItems="treeViewNodes" />
</template>

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

### Making Items Checkable Or Plain Content

You can customise if items of a particular `type` are checkable or just plain contents.

#### Example


```ts
<template>
  <tree-view :treeViewItems="treeViewNodes" @created="customiseTreeView" />
</template>

<script lang='ts'>
import { Vue, Component} from 'vue-property-decorator';

import { TreeViewCreatedEventPayload, TreeViewItem } from '@/businessLogic/contracts/types';

@Component
export default class App extends Vue {
  
  // This method is called when the tree view is created (on Created hook). And allows you to customise
  // items using the payload passed into the function.
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

