import Vue from 'vue'
import App from './App.vue'

import 'tippy.js/dist/tippy.css';
import '@/styles/style.css';

import ExplorerPlugin from './plugins/ExplorerPlugin';

Vue.config.productionTip = false

Vue.use(ExplorerPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app')
