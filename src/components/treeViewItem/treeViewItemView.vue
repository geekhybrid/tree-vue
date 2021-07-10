<template>
    <div>
        <div v-if="!isRenaming" @dblclick="beginRename">
            <div v-if="isCheckable" >
                <input @contextmenu.prevent
                    @change="updateCheckState"
                    type="checkbox"
                    ref="checkbox"
                    v-model="isChecked" />
                <label for="checkbox" v-if="!isRenaming">{{ item.name }}</label>
                <input v-model="item.name" v-else />
            </div>

            <span v-else>{{item.name}}</span>
        </div>

        <input
            ref="rename-box"
            v-model="item.name" v-else
            v-on:keyup.enter="finishRename"
            @blur="finishRename"
        />
    </div>
</template>

<script lang='ts'>
import { Customisations, ItemCheckedChangedEvent, ItemTypeCustomisations, TreeViewItem, TreeViewViewModel } from '@/businessLogic/contracts/types';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class TreeViewItemView extends Vue {
    @Prop() item!: TreeViewItem;
    @Prop() treeViewModel!: TreeViewViewModel;
    @Prop() customisations!: ItemTypeCustomisations;
    isRenaming = false;
    textBeforeRename = "";
    isChecked = false;

    get isCheckable(): boolean {
        if (!this.options) return false;
        return this.options.isCheckable as boolean;
    }

    updateCheckState(): void {
        const event: ItemCheckedChangedEvent = { item: this.item, status: this.isChecked ? 'True' : 'False' };
        this.$emit('changed', event);
        this.treeViewModel.checkedStatusChanged(this.item);
    }

    mounted(): void {
        this.setCheckedState();
    }

    get getValue(): boolean {
        if (this.item.checkedStatus == 'True') return true;
        else return false;
    }

    get options(): Customisations {
        return this.customisations.getCustomisation(this.item.type);
    }

    @Watch("item.checkedStatus")
    onPropertyChanged(): void {
        if (!this.isCheckable) return;
        
        const checkboxEl = this.$refs.checkbox as HTMLInputElement;
        if (this.item.checkedStatus == 'Indeterminate') {
            checkboxEl.indeterminate = true;
        } else {
            checkboxEl.indeterminate = false;
            this.setCheckedState();
        }
    }

    setCheckedState(): void {
        this.isChecked = this.item.checkedStatus == 'True' ? true : false;
    }

    beginRename(): void {
        if (!this.options) return;
        const renameDisabled = !this.options.canRename;
        if (renameDisabled) return;
        this.isRenaming = true;
        this.textBeforeRename = this.item.name;
        this.$nextTick().then(() => 
            {
                const renameBox = this.$refs["rename-box"] as HTMLInputElement;
                renameBox.focus();
            }
        )
    }

    async finishRename(): Promise<void> {
        // v-on:blur and key(enter) can cause this to fire twice.
        // this check protects against that.
        if (!this.isRenaming) return;
        this.isRenaming = false;
        const renameHandler = this.customisations.getRenameHandler(this.item.type);
        await renameHandler(this.item);
    }
}
</script>