import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path : '/',
    component: () => import('../views/Parent.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children:[{
      path: '/child',
      component: () => import('../views/Child.vue')
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router
