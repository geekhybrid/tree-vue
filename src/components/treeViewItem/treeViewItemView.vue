<template>
    <div>    
        <input @contextmenu.prevent
            @change="updateCheckState"
            type="checkbox"
            ref="checkbox"
            v-model="isChecked" />
    </div>
</template>

<script lang='ts'>
import { TreeViewViewModel } from '@/businessLogic/treviewViewModel/treeViewViewModel';
import { ItemCheckedChangedEvent, TreeViewItem } from '@/businessLogic/contracts/types';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import VueTippy, { TippyComponent } from "vue-tippy";
import "tippy.js/themes/light.css";

Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);

@Component
export default class TreeViewItemView extends Vue {
    @Prop() item!: TreeViewItem;
    @Prop() treeViewModel!: TreeViewViewModel;
    isChecked = false;

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

    @Watch("item", { deep: true })
    onPropertyChanged(): void {
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