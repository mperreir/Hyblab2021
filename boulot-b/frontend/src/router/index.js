import Vue from 'vue'
import VueRouter from 'vue-router'
import ChoixTypeDeplacement from "@/views/ChoixTypeDeplacement";
import ChoixStyle from "@/views/ChoixStyle";
<<<<<<< HEAD
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
=======
import ChoixHumeur from "@/views/ChoixHumeur";
import ChoixLieux from "@/views/ChoixLieux";
import ChoixTheme from "@/views/ChoixTheme";
import ChoixDestination from "@/views/ChoixDestination";
import Home from "@/views/Home";
import {store} from "@/store";
>>>>>>> boulot-b

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/choix-type',
    name: 'choix-type',
    component: ChoixTypeDeplacement,
    props: {actif: 1},
  },
  {
    path: '/choix-destination',
    name: 'choix-destination',
    component: ChoixDestination,
    props: {actif: 2},
  },
  {
    path: "/choix-humeur",
    name: "choix-humeur",
    component: ChoixHumeur,
    props: {actif: 3 },
  },
  {
    path: "/choix-style",
    name: "choix-style",
<<<<<<< HEAD
    component: ChoixStyle
  },
  {
    path: "/test",
    name: "test",
    component: Test
  }
=======
    component: ChoixStyle,
    props: {actif: 4 },
  },
  {
    path: "/choix-theme",
    name: "choix-theme",
    component: ChoixTheme,
    props: {actif: 5 },
  },
  {
    path: "/choix-lieux",
    name: "choix-lieux",
    component: ChoixLieux,
    props: {actif: 6 },
  },
>>>>>>> boulot-b
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    const routeIndex = routes.findIndex((route) =>  to.name === route.name )
  for(let i=routes.length -1; i>=routeIndex; i--) {
    store.clearChoice(routes[i].component.choice)
  }
  next()
})

export default router
export {routes}
