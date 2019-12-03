import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path : '/',
    component: () => import('../views/Parent.vue'),
    redirect:'/table'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    children:[{
      path: '/child',
      component: () => import('../views/Child.vue')
    }]
  },
  {
    path : '/layout',
    component: () => import('../views/element/Layout.vue')
  },
  {
    path : '/pop',
    component: () => import('../views/element/Pop.vue')
  },
  {
    path : '/table',
    component: () => import('../views/element/Table.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
