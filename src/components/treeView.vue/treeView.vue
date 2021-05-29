<template>
    <ul >
        <li v-for="treeViewItem in treeViewItems" :key="treeViewItem.id" :id="treeViewItem.id" >
            <div class="d-flex align-items-center">
                <span class="chevron-right" v-if="treeViewItem.children && treeViewItem.children.length > 0" @click="toggleVisiblity(treeViewItem.id, $event)"></span>
                <div class="icon-area">
                    <img src="@/assets/folder.svg" alt="folder" v-if="treeViewItem.type === ItemType.Folder">
                </div>
                <treeview-item :item="treeViewItem" :treeViewModel="viewModel" @changed="updateItemCheckedStatus"/>
                <span class="node-name cursor">{{ treeViewItem.name }}</span>
            </div>
            
            <div class="node-child hide">
                <tree-view :treeViewItems="treeViewItem.children"
                    v-if="treeViewItem.children && treeViewItem.children.length > 0" />
            </div>
        </li>
    </ul>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator';
import { TreeViewViewModel } from '@/businessLogic/treviewViewModel/treeViewViewModel'
import { CheckedState, ItemCheckedChangedEvent, ItemTypes, TreeViewItem } from '@/businessLogic/contracts/types';

@Component
export default class TreeView extends Vue {
    @Prop({ default: () => { return [] }}) treeViewItems!: TreeViewItem[];
    viewModel = TreeViewViewModel;

    get ItemType(): typeof ItemTypes {
        return ItemTypes
    }

    updateItemCheckedStatus(checkedEvent: ItemCheckedChangedEvent): void {
        const { item, status } = checkedEvent;
        item.checkedStatus = status;
    }

    mounted(): void {
        this.viewModel.loadNodes(this.treeViewItems);
    }

    toggleVisiblity(nodeId: string, event: InputEvent): void {
        const element = document.getElementById(nodeId)?.getElementsByClassName('node-child');
        const target = event.target as HTMLInputElement;

        if (!element) return;
        
        target.classList.toggle('rotate-90');
        element[0].classList.toggle('hide');
    }
}
</script>

<style scoped lang="scss">
ul {
    padding-left: 0;
    margin: 0;
    list-style-type: none;
}

.chevron-right {
    color: gray;
}

.icon-area {
    width: 16px;
}

.node-name {
    cursor: pointer;
    margin-left: 5px;
}

.node-child {
    margin-left: 32px !important;
    padding-left: 10px;
    border-left: 1px dashed rgb(192, 192, 192);
    display: block;
}

.hide {
    display: none;
}

.chevron-right {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs,1));
    width: 22px;
    height: 22px;
    border: 2px solid transparent;
    border-radius: 100px;
    transition: .2s;

    &.rotate-90 {
        transform: rotateZ(90deg);
    }
}

.chevron-right::after {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute;
    width: 7px;
    height: 7px;
    border-bottom: 2px solid;
    border-right: 2px solid;
    transform: rotate(-45deg);
    right: 6px;
    top: 4px
}
</style>