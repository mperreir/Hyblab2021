import Vue from 'vue'
import VueRouter from 'vue-router'
import ChoixTypeDeplacement from "@/views/ChoixTypeDeplacement";
import ChoixStyle from "@/views/ChoixStyle";
import ChoixHumeur from "@/views/ChoixHumeur";
import ChoixLieux from "@/views/ChoixLieux";
import ChoixTheme from "@/views/ChoixTheme";
import ChoixDestination from "@/views/ChoixDestination";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ChoixTypeDeplacement,
    props: {actif: 1 }
  },
  {
    path: '/choix-destination',
    name: 'choix-destination',
    component: ChoixDestination,
    props: {actif: 2 }
  },
  {
    path: "/choix-humeur",
    name: "choix-humeur",
    component: ChoixHumeur,
    props: {actif: 3 }
  },
  {
    path: "/choix-style",
    name: "choix-style",
    component: ChoixStyle,
    props: {actif: 4 }
  },
  {
    path: "/choix-theme",
    name: "choix-theme",
    component: ChoixTheme,
    props: {actif: 5 }
  },
  {
    path: "/choix-lieux",
    name: "choix-lieux",
    component: ChoixLieux,
    props: {actif: 6 }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
