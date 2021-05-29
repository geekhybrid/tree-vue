import { VueConstructor } from 'vue';

import TreeView from '@/components/treeView.vue/treeView.vue';
import TreeViewItem from '@/components/treeViewItem/treeViewItemView.vue';

const TreeViewPlugin = {
    install(Vue: VueConstructor) {
        Vue.component('tree-view', TreeView);
        Vue.component('treeview-item', TreeViewItem);
    }
}

export default TreeViewPlugin;