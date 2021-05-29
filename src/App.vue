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
      name: 'OREDO Easte',
      id: '1203-390293-1hdklsjdl-903923',
      type: ItemTypes.Folder,
      checkedStatus: 'False',
      children: [
        {
          name: 'OREDO 001',
          id: '1203-390293-1hdklhsjdl-903923',
          type: ItemTypes.Lease,
          parentId: '1203-390293-1hdklsjdl-903923',
          checkedStatus: 'False',
        },
        {
          name: 'OREDO 002',
          id: '1203-1hdklsjdl-903923',
          type: ItemTypes.Lease,
          parentId: '1203-390293-1hdklsjdl-903923',
          checkedStatus: 'False'
        }
      ]
    },
    {
      name: 'ABURA East',
      type: ItemTypes.Folder,
      id: '1203-390293-1hdkl-903923',
      checkedStatus: 'False',
      children: [
        {
          name: 'ABURA',
          type: ItemTypes.Lease,
          id: '1203-390293-1hdklsjdl-93',
          parentId: '1203-390293-1hdkl-903923',
          checkedStatus: 'False' 
        },
        {
          name: 'PEC-002',
          type: ItemTypes.Lease,
          id: '1203-39293-1hdklsjdl-93',
          parentId: '1203-390293-1hdkl-903923',
          checkedStatus: 'False'
        }
      ]
    },
    {
      name: 'Eastern Assets',
      type: ItemTypes.Folder,
      id: '1203-390293-1hfdkl-903923',
      checkedStatus: 'False',
      children: [
        {
          name: 'ABURA',
          type: ItemTypes.Folder,
          id: '1203-39029f3-1hdklsjdl-93',
          parentId: '1203-390293-1hfdkl-903923',
          checkedStatus: 'False',
          children: [
            {
              name: 'AB-01',
              type: ItemTypes.Well,
              id: '1203-29f3-1hdklsjdl-93',
              parentId: '1203-39029f3-1hdklsjdl-93',
              checkedStatus: 'False',
            },
            {
              name: 'AB-02',
              type: ItemTypes.Well,
              id: '1203-29fbb3-1hdklsjdl-93',
              parentId: '1203-39029f3-1hdklsjdl-93',
              checkedStatus: 'False',
            }
          ]
        },
        {
          name: 'PECON',
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