<template>
  <div style="display: flex">
    <!-- Example of how to customise appearance of tree items -->
    <tree-view :treeViewItems="treeViewNodes" @created="customiseTreeView" >
        <template v-slot:icon="treeViewItem">
            <img src="@/assets/folder.svg" alt="folder" v-if="treeViewItem.type === 'folder'" >
            <img src="@/assets/word.svg" alt="vue-logo" v-else-if="treeViewItem.type === '.doc'" height="18" width="18">
            <img src="@/assets/excel.svg" alt="vue-logo" v-else-if="treeViewItem.type === '.excel'" height="18" width="18">
            <img src="@/assets/playlist.svg" alt="vue-logo" v-else-if="treeViewItem.type === 'media'" height="18" width="18">
        </template>
    </tree-view>
    
    <!-- Examples of how to subscribe for events -->
    <!-- <tree-view :treeViewItems="schools" @created="customiseSchools" selectionMode='Multiple' /> -->
  </div>
</template>

<script lang='ts'>
import { Vue, Component} from 'vue-property-decorator';

import { TreeViewCreatedEventPayload, TreeViewItem } from '@/businessLogic/contracts/types';

@Component
export default class App extends Vue {

  customiseTreeView(treeCreatedEvent: TreeViewCreatedEventPayload): void {
    const customisations = treeCreatedEvent.itemCustomisations;
    
    const folderRenameHandler = (folderItem: TreeViewItem) => new Promise<TreeViewItem>((accept) => {
      console.log(folderItem);
    });

    customisations.registerDragAndDropValidator(() => true);
    customisations.registerItemRenamedHandler('folder', folderRenameHandler);
    
    customisations.makeItemsCheckable([".doc", ".excel", "media" ]);
  }

  // customiseSchools(treeCreatedEvent: TreeViewCreatedEventPayload): void {
  //   const customisations = treeCreatedEvent.itemCustomisations;
  //   const eventManager = treeCreatedEvent.eventManager;

  //   eventManager.subscribeToItemChecked("department", (items) =>   g(items));
  //   customisations.makeItemsCheckable(["department"]);
  // }


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
        },
        {
          name: 'Short Video',
          id: '1203-1hmddklsjdl-903923',
          type: 'media',
          parentId: '1203-390293-1hdklsjdl-903923',
          checkedStatus: 'False'
        },
        {
          name: 'Excel Optimisation',
          id: '1203-1hmddklsjdl-903jdu923',
          type: '.excel',
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
              type: 'media',
              id: '1203-29f3-1hdklsjdl-93',
              parentId: '1203-39029f3-1hdklsjdl-93',
              checkedStatus: 'False',
            },
            {
              name: 'Videos',
              type: 'media',
              id: '1203-29fbb3-1hdklsjdl-93',
              parentId: '1203-39029f3-1hdklsjdl-93',
              checkedStatus: 'False',
            }
          ]
        },
        {
          name: 'Repositories',
          type: 'code',
          id: '1203-39b293-1hdklsjdl-93',
          parentId: '1203-390293-1hfdkl-903923',
          checkedStatus: 'False'
        }
      ]
    }
  ];

  // schools: TreeViewItem[] = [
  //   {
  //     id: '1',
  //     type: 'school',
  //     name: 'Vue School',
  //     children: [
  //       {
  //         id: '2',
  //         type: 'department',
  //         name: 'Typescript Department',
  //         parentId: '1'
  //       },
  //       {
  //         id: '3',
  //         type: 'department',
  //         name: 'Open Source Department',
  //         parentId: '1'
  //       }
  //     ]
  //   }
  // ]
}
</script>