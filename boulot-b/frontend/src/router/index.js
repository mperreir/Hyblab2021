import Vue from 'vue'
import VueRouter from 'vue-router'
import ChoixTypeDeplacement from "@/views/ChoixTypeDeplacement";
import ChoixStyle from "@/views/ChoixStyle";
import ChoixHumeur from "@/views/ChoixHumeur";
import ChoixLieux from "@/views/ChoixLieux";
import ChoixTheme from "@/views/ChoixTheme";
import ChoixDestination from "@/views/ChoixDestination";
import {store} from "@/store";

Vue.use(VueRouter)

const steps  = [
  {component: ChoixTypeDeplacement, choice: "typeDeplacement"},
  {component: ChoixDestination, choice: "path" },
  {component: ChoixHumeur, choice: "huemur" },
  {component: ChoixStyle, choice: "style" },
  {component: ChoixTheme, choice: "theme" },
  {component: ChoixLieux, choice: "lieux" },
]


const routes = [
  {
    path: '/',
    name: 'Home',
    component: steps[0].component,
    props: {actif: 1 },
  },
  {
    path: '/choix-destination',
    name: 'choix-destination',
    component: steps[1].component,
    test: "test",
    props: {actif: 2 },
    beforeEnter: (to, from, next) => {
      console.log(to)
        for(let i=steps.length -1; i>=1; i--) {
          store.clearChoice(steps[i].choice)
        }
      next()
    }
  },
  {
    path: "/choix-humeur",
    name: "choix-humeur",
    component: steps[2].component,
    props: {actif: 3 },
    beforeEnter: (to, from, next) => {
      for(let i=steps.length -1; i>=2; i--) {
        store.clearChoice(steps[i].choice)
      }
      next()
    }
  },
  {
    path: "/choix-style",
    name: "choix-style",
    component: steps[3].component,
    props: {actif: 4 },
    beforeEnter: (to, from, next) => {
      for(let i=steps.length -1; i>=3; i--) {
        store.clearChoice(steps[i].choice)
      }
      next()
    }
  },
  {
    path: "/choix-theme",
    name: "choix-theme",
    component: steps[4].component,
    props: {actif: 5 },
    beforeEnter: (to, from, next) => {
      for(let i=steps.length -1; i>=4; i--) {
        store.clearChoice(steps[i].choice)
      }
      next()
    }
  },
  {
    path: "/choix-lieux",
    name: "choix-lieux",
    component: steps[5].component,
    props: {actif: 6 },
    beforeEnter: (to, from, next) => {
      for(let i=steps.length -1; i>=5; i--) {
        store.clearChoice(steps[i].choice)
      }
      next()
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
