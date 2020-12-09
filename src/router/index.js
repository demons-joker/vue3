import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import layout from '../components/layout';

const routes = [{
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "about" */ '../views/login')
  },
  {
    path: '/index',
    redirect: '/home',
    component: () => layout,
    children: [{
      path: '/home',
      name: 'home',
      component: () => import( /* webpackChunkName: "about" */ '../views/index')
    }]
  },
  {
    path: '/order',
    redirect: '/order-list',
    component: () => layout,
    children: [{
      path: '/order-list',
      name: 'order-list',
      component: () => import( /* webpackChunkName: "about" */ '../views/order')
    }]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router