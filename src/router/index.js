import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Users',
    component: () => import('../views/Users.vue')
  },
  
]

const router = new VueRouter({
  routes
})

export default router
