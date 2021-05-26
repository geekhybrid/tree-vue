<template>
    <input 
        type="checkbox" 
        ref="checkbox"
        v-model="checkBoxValue"
    />
</template>

<script lang='ts'>
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import { CheckedState } from '@/contracts/types';
import { ExplorerItem } from '../../contracts/types';

@Component
export default class Checkbox extends Vue {
    @Prop({ default: '' }) checkedStatus!: CheckedState;
    @Prop() onStatusChanged!: (item: ExplorerItem) => void;

    private checkBoxValue = false;
    @Watch('checkBoxValue')
    onChange(value: boolean) {
        const checkBoxEl = this.$refs.checkbox as HTMLInputElement;

        if (value) {
            checkBoxEl.indeterminate = true;

            this.$emit('statusChanged', 'Indeterminate')
        } else {
            checkBoxEl.indeterminate = false;
        }

        if (!value) {
            this.$emit('statusChanged', 'True')
        }
    }

    private setCheckBox() {
        if (this.checkedStatus === 'True') {
            this.checkBoxValue = true;
        }

        if (this.checkedStatus === 'False') {
            this.checkBoxValue = false;
        }
    }

    mounted() {
        this.setCheckBox()
    }
}
</script>