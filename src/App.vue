<template>
  <tree-view :treeViewItems="treeViewNodes">
      <template v-slot:icon="treeViewItem">
          <img src="@/assets/folder.svg" alt="folder" v-if="treeViewItem.type === 'folder'" >
          <img src="@/assets/word.png" alt="vue-logo" v-else-if="treeViewItem.type === '.doc'" height="22" width="22">
          <img src="@/assets/excel.png" alt="vue-logo" v-else-if="treeViewItem.type === '.excel'" height="22" width="22">
      </template>
  </tree-view>
</template>

<script lang='ts'>
import { Vue, Component} from 'vue-property-decorator';

import { TreeViewItem } from '@/businessLogic/contracts/types';

@Component
export default class App extends Vue {
  treeViewNodes: TreeViewItem[] = [
    {
      name: 'Desktop',
      id: '1203-390293-1hdklsjdl-903923',
      type: 'folder',
      checkedStatus: 'False',
      children: [
        {
          name: 'Resume',
          id: '1203-390293-1hdklhsjdl-903923',
          type: '.doc',
          parentId: '1203-390293-1hdklsjdl-903923',
          checkedStatus: 'False',
        },
        {
          name: 'Cover Letter',
          id: '1203-1hdklsjdl-903923',
          type: '.doc',
          parentId: '1203-390293-1hdklsjdl-903923',
          checkedStatus: 'False'
        }
      ]
    },
    {
      name: 'Hard Drive',
      type: 'folder',
      id: '1203-390293-1hdkl-903923',
      checkedStatus: 'False',
      children: [
        {
          name: 'Remote Time-Sheet',
          type: '.excel',
          id: '1203-390293-1hdklsjdl-93',
          parentId: '1203-390293-1hdkl-903923',
          checkedStatus: 'False' 
        },
        {
          name: 'Monthly Budget',
          type: '.excel',
          id: '1203-39293-1hdklsjdl-93',
          parentId: '1203-390293-1hdkl-903923',
          checkedStatus: 'False'
        }
      ]
    },
    {
      name: 'C:/',
      type: 'folder',
      id: '1203-390293-1hfdkl-903923',
      checkedStatus: 'False',
      children: [
        {
          name: 'Documents',
          type: 'folder',
          id: '1203-39029f3-1hdklsjdl-93',
          parentId: '1203-390293-1hfdkl-903923',
          checkedStatus: 'False',
          children: [
            {
              name: 'Pictures',
              type: 'docs',
              id: '1203-29f3-1hdklsjdl-93',
              parentId: '1203-39029f3-1hdklsjdl-93',
              checkedStatus: 'False',
            },
            {
              name: 'Videos',
              type: 'docs',
              id: '1203-29fbb3-1hdklsjdl-93',
              parentId: '1203-39029f3-1hdklsjdl-93',
              checkedStatus: 'False',
            }
          ]
        },
        {
          name: 'Repositories',
          type: 'custom-file',
          id: '1203-39b293-1hdklsjdl-93',
          parentId: '1203-390293-1hfdkl-903923',
          checkedStatus: 'False'
        }
      ]
    }
  ];
}
</script>