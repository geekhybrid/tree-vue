# Tree-Vue

A light-weight library for management of hierachical content. Most solutions I found did not offer the depth of flexibility I needed with the tree order than simply display the items. I decided to solve my problem and also give back. Feel free to log issues, I will jump on them at the slightest opportunity. 😊

## What it does.

1. Hierachical rendering of content.
2. Event publishing/subscription from items
    - Item (un)checked event
    - Item moved (drag-and-drop)
    - Custom formating of items on the tree based on the `type` property. (Coming soon)
      - Icon
      - Rendering (checkboxes or plain content)
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
    type: ItemTypes
    checkedStatus?: CheckedState,
    checkable?: boolean,
    name: string,
    id: string,
    parentId?: string
}
```

## How to use Advance

### Customising Icons

You can customise item based on their `type` property.

```html
<tree-view :treeViewItems="treeViewNodes">
    <template v-slot:icon="item">
        <img src="@/assets/folder.svg" alt="folder" >
    </template>
</tree-view>

```
