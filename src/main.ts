import Vue from 'vue'
import App from './App.vue'
import ExplorerPlugin from './plugins/ExplorerPlugin';
import '@/styles/style.css';

Vue.config.productionTip = false

Vue.use(ExplorerPlugin);

new Vue({
  render: h => h(App),
}).$mount('#app')
