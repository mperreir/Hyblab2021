import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home";
import Test from "@/views/Test.vue"
import QuestionnaireContainer from "@/views/QuestionSwitcher";

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
  {
    path: "/test",
    name: "test",
    component: Test
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
