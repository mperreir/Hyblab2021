import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import express from "express"
// import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue"; // import lottie-vuejs
// Vue.use(LottieAnimation); // add lottie-animation to your global scope

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

