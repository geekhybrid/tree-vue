<template>
    <input 
        ref="checkbox"
        type="checkbox"
        v-model="checkedValue"
        @change="onValueChange"
    >
</template>

<script lang='ts'>
import {Vue, Component, Watch, Prop} from 'vue-property-decorator';

@Component
export default class Checkbox extends Vue {
    @Prop({ default: '' }) node!: string;

    @Watch('node')
    onNodeChange() {
        this.setState();
    }

    private checkedValue = false;

    onValueChange(event: InputEvent) {
        const target = event.target as HTMLInputElement

        if (target.checked) {
            this.$emit('statusChanged', 'True')
        }

        if (!target.checked) {
            this.$emit('statusChanged', 'False')
        }
    }

    private setState() {
        const checkboxEl = this.$refs.checkbox as HTMLInputElement;

        if (this.node === 'True') {
            this.checkedValue = true
        }

        if (this.node === 'Indeterminate') {
            this.checkedValue = true;
            checkboxEl.indeterminate = true;
        } else {
            checkboxEl.indeterminate = false;
        }

        if (this.node == 'False') {
            this.checkedValue = false;
        }
    }

    mounted() {
        this.setState();
    }
}
</script>