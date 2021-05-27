<template>
    <section>
        <ul v-for="node in explorerNodes"
            :key="node.id"
        >
            <li>
                <div class="d-flex align-items-center">
                    <span class="chevron-right" v-if="node.children && node.children.length > 0" @click="toggleVisiblity(node.id, $event)"></span>
                    <div class="icon-area">
                        <img src="@/assets/folder.svg" alt="folder" v-if="node.type === ItemType.Folder">
                    </div>
                    <checkbox
                        @statusChanged="onStatusChange(node, $event)"
                        :node="node.checkedStatus"
                    />
                    <span class="node-name cursor">{{ node.name }}</span>
                </div>
                
                <div class="node-child hide" :id="node.id">
                    <explorer :explorerNodes="node.children"
                        v-if="node.children && node.children.length > 0" />
                </div>
                <!-- <component :is="ItemType[node.type]" :items="node"/> -->
            </li>
        </ul>
    </section>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator';

import Lease from './ContextMenu/Lease.vue';
import { eventHub } from './../../businessLogic/explorerEventPublisher';

import { CheckedState, ExplorerItem, ItemTypes } from '@/contracts/types';
import { explorerViewModel } from '../../businessLogic/explorerViewModel'

@Component({
    components: {
        Lease
    }
})
export default class Explorer extends Vue {
    @Prop({ default: () => { return [] }}) explorerNodes!: ExplorerItem[];
    viewModel = explorerViewModel;

    get ItemType(): typeof ItemTypes {
        return ItemTypes
    }

    private onStatusChange(node: ExplorerItem, event: CheckedState) {
        node.checkedStatus = event;
        this.viewModel.checkedStatusChanged(node)
    }

    mounted(): void {
        this.viewModel.loadNodes(this.explorerNodes);
    }

    private toggleVisiblity(nodeId: string, event: InputEvent): void {
        const element = document.getElementById(nodeId);
        const target = event.target as HTMLInputElement;
        
        target.classList.toggle('rotate-90');
        element?.classList.toggle('hide')
    }
}
</script>

<style scoped lang="scss">
ul {
    padding-left: 0;
    margin: 0;
    list-style-type: none;
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