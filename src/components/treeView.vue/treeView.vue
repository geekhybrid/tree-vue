<template>
    <ul id="explorer" class="explorer">
        <li v-for="treeViewItem in treeViewItems" :key="treeViewItem.id" :id="treeViewItem.id" 
                draggable
                @dragover.stop.prevent
                @dragenter.stop.prevent
                @dragstart.stop="onDragNode(treeViewItem, $event)"
                @drop.prevent.stop="onDropNode(treeViewItem, $event)"
                @dragover.stop="addHoverClass"
                @dragleave.stop="removeHoverClass">

            <div class="d-flex align-items-center">
                <span class="chevron-right" v-if="treeViewItem.children && treeViewItem.children.length > 0" @click="toggleVisiblity(treeViewItem.id, $event)"></span>
                <div class="icon-area">
                    <slot name="icon" v-bind="treeViewItem">
                        <img src="@/assets/folder.svg" alt="folder" v-if="treeViewItem.type.toLowerCase() == 'folder'">
                    </slot>
                </div>
                <treeview-item :item="treeViewItem" :treeViewModel="viewModel" @changed="updateItemCheckedStatus"
                               :customisations="getItemCustomisation(treeViewItem.type)" />
            </div>
            
            <div class="node-child hide">
                <tree-view :treeViewItems="treeViewItem.children" nested
                    v-if="treeViewItem.children && treeViewItem.children.length > 0" >
                    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="props">
                        <slot :name="slot" v-bind="props"/>
                    </template>
                </tree-view>
            </div>
        </li>
    </ul>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator';
import { TreeViewViewModel } from '@/businessLogic/treviewViewModel/treeViewViewModel'
import { CheckedState, Customisations, ItemCheckedChangedEvent, TreeViewCreatedEventPayload, TreeViewItem } from '@/businessLogic/contracts/types';
import { ItemCustomisations } from "@/businessLogic/itemCustomisations/itemCustomisations";
import { eventManager } from '@/businessLogic/eventHub/explorerEventPublisher';

@Component
export default class TreeView extends Vue {
    @Prop({ default: () => { return [] }}) treeViewItems!: TreeViewItem[];
    viewModel = TreeViewViewModel;
    itemCustomisations = ItemCustomisations;

    created(): void {
        const payload: TreeViewCreatedEventPayload = {
            itemCustomisations: this.itemCustomisations,
            eventManager
        };

        this.$emit("created", payload);
    }

    getItemCustomisation(type: string): Customisations {
        return this.itemCustomisations.typeCustomisations()[type];
    }

    updateItemCheckedStatus(checkedEvent: ItemCheckedChangedEvent): void {
        const { item, status } = checkedEvent;
        item.checkedStatus = status;
    }

    addHoverClass(event: DragEvent): void {
        const target = event.currentTarget as HTMLElement;

        if (target) {
            target.classList.add('drag-over')
        }
    }

    removeHoverClass(event: DragEvent): void {
        const target = event.currentTarget as HTMLElement;

        if (target) {
            target.classList.remove('drag-over');
        }
    }

    onStatusChange(item: TreeViewItem, event: CheckedState): void {
        item.checkedStatus = event;
        this.viewModel.checkedStatusChanged(item)
    }

    onDragNode(item: TreeViewItem, event: DragEvent): void {
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', JSON.stringify(item));
        }
    }

    onDropNode(node: TreeViewItem, event: DragEvent): void {
        if (event.dataTransfer) {
            const droppedNode = JSON.parse(event.dataTransfer.getData('text/plain')) as TreeViewItem;

            this.removeHoverClass(event)

            if (droppedNode.id === node.id) {
                return
            }

            this.viewModel.removeTreeViewItem(droppedNode.id);

            droppedNode.parentId = node.id;

            this.viewModel.addTreeViewItem(droppedNode);
        }
    }

    mounted(): void {
        const isRootNode = !('nested' in this.$attrs);
        if (isRootNode) {
            this.viewModel.loadNodes(this.treeViewItems);
        }
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
    display: inline-block;

    li {
        border-radius: 4px;

        &.drag-over {
            background-color: rgba(22, 22, 22, 0.068);
        }
    }
}

.chevron-right {
    color: gray;
}

.icon-area {
    width: 16px;
    margin-right: .7em;
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