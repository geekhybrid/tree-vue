import Vue from 'vue'
import App from './App.vue'
import '@/styles/style.css';

import TreeViewPlugin from './plugins/TreeViewPlugin';

Vue.config.productionTip = false

Vue.use(TreeViewPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app')
