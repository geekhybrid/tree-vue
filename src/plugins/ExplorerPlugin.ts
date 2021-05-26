import { VueConstructor } from 'vue';

import Explorer from '@/components/Explorer/Explorer.vue';
import Checkbox from '@/components/Checkbox/checkbox.vue';

const ExplorerPlugin = {
    install(Vue: VueConstructor) {
        Vue.component('explorer', Explorer);
        Vue.component('checkbox', Checkbox);
    }
}

export default ExplorerPlugin;