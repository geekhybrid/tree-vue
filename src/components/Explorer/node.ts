import { Vue, Component, Prop } from 'vue-property-decorator';

import { ExplorerItem, ItemTypes } from '@/contracts/types';

@Component
export default class Node extends Vue {
    @Prop({ default: () => { return {} }, required: true }) item!: ExplorerItem;
}