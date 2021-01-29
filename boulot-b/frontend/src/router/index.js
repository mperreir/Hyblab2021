import Vue from 'vue'
import VueRouter from 'vue-router'
import ChoixTypeDeplacement from "@/views/ChoixTypeDeplacement";
import ChoixStyle from "@/views/ChoixStyle";
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/choix-type-destination',
    name: "type-destination",
    component: ChoixTypeDeplacement
  },
  {
    path: "/choix-style",
    name: "choix-style",
    component: ChoixStyle
  },
  {
    path: "/test",
    name: "test",
    component: Test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
