<template>
    <li>{{ item.name }}</li>
</template>

<script lang='ts'>
import {Vue, Component, Prop} from 'vue-property-decorator';

import { ExplorerItem, ItemTypes } from '@/contracts/types';

@Component
export default class Lease extends Vue {
    @Prop({ default: () => { return {} }, required: true }) item!: ExplorerItem;
}
</script>