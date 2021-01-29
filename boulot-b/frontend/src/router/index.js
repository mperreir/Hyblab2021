import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import QuestionnaireContainer from "@/views/QuestionnaireContainer";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path:"/questionnaire",
    name:"questionnaire",
    component: QuestionnaireContainer
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
