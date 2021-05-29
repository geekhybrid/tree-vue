<template>
  <section >
    <tree-view :treeViewItems="treeViewNodes" @contextmenu.prevent="$refs.menu.open" />
  </section>
</template>

<script lang='ts'>
import { Vue, Component} from 'vue-property-decorator';

import { TreeViewItem, ItemTypes } from '@/businessLogic/contracts/types';

@Component
export default class App extends Vue {
  treeViewNodes: TreeViewItem[] = [
    {
      name: 'Folder 1',
      id: '1203-390293-1hdklsjdl-903923',
      type: ItemTypes.Folder,
      checkedStatus: 'False',
      children: [
        {
          name: 'Asset 1',
          id: '1203-390293-1hdklhsjdl-903923',
          type: ItemTypes.Lease,
          parentId: '1203-390293-1hdklsjdl-903923',
          checkedStatus: 'False',
        },
        {
          name: 'Asset 2',
          id: '1203-1hdklsjdl-903923',
          type: ItemTypes.Lease,
          parentId: '1203-390293-1hdklsjdl-903923',
          checkedStatus: 'False'
        }
      ]
    },
    {
      name: 'Folder 2',
      type: ItemTypes.Folder,
      id: '1203-390293-1hdkl-903923',
      checkedStatus: 'False',
      children: [
        {
          name: 'Asset-3',
          type: ItemTypes.Lease,
          id: '1203-390293-1hdklsjdl-93',
          parentId: '1203-390293-1hdkl-903923',
          checkedStatus: 'False' 
        },
        {
          name: 'Asset-04',
          type: ItemTypes.Lease,
          id: '1203-39293-1hdklsjdl-93',
          parentId: '1203-390293-1hdkl-903923',
          checkedStatus: 'False'
        }
      ]
    },
    {
      name: 'C:/',
      type: ItemTypes.Folder,
      id: '1203-390293-1hfdkl-903923',
      checkedStatus: 'False',
      children: [
        {
          name: 'Documents',
          type: ItemTypes.Folder,
          id: '1203-39029f3-1hdklsjdl-93',
          parentId: '1203-390293-1hfdkl-903923',
          checkedStatus: 'False',
          children: [
            {
              name: 'Pictures',
              type: ItemTypes.Well,
              id: '1203-29f3-1hdklsjdl-93',
              parentId: '1203-39029f3-1hdklsjdl-93',
              checkedStatus: 'False',
            },
            {
              name: 'Videos',
              type: ItemTypes.Well,
              id: '1203-29fbb3-1hdklsjdl-93',
              parentId: '1203-39029f3-1hdklsjdl-93',
              checkedStatus: 'False',
            }
          ]
        },
        {
          name: 'Repositories',
          type: ItemTypes.Lease,
          id: '1203-39b293-1hdklsjdl-93',
          parentId: '1203-390293-1hfdkl-903923',
          checkedStatus: 'False'
        }
      ]
    }
  ];
}
</script>