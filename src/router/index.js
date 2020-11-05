import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path:'/login',
    name:'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login')
  },
  {
    path:'/index',
    name:'Index',
    component: () => import(/* webpackChunkName: "about" */ '../views/index')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
