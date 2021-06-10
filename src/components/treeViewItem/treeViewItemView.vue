<template>
    <div>
        <div v-if="isCheckable">
            <input @contextmenu.prevent
                @change="updateCheckState"
                type="checkbox"
                ref="checkbox"
                v-model="isChecked" />    
            <label for="checkbox" >{{ item.name }}</label>
        </div>

        <span v-else>{{item.name}}</span>

    </div>
</template>

<script lang='ts'>
import { Customisations, ItemCheckedChangedEvent, TreeViewItem, TreeViewViewModel } from '@/businessLogic/contracts/types';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class TreeViewItemView extends Vue {
    @Prop() item!: TreeViewItem;
    @Prop() treeViewModel!: TreeViewViewModel;
    @Prop() customisations!: Customisations
    isChecked = false;

    get isCheckable(): boolean {
        return this.customisations && this.customisations.isCheckable == true;
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

    @Watch("item")
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

    private setCheckedState() {
       this.isChecked = this.item.checkedStatus == 'True' ? true : false;
    }
}
</script>