import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./base.css"
import {store} from "@/store";

Vue.config.productionTip = false

new Vue({
  data: store,
  router,
  render: h => h(App)
}).$mount('#app')

