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
    path: '/client',
    redirect: '/client-list',
    component: () => layout,
    children: [{
      path: '/client-list',
      name: 'client-list',
      component: () => import( /* webpackChunkName: "about" */ '../views/client')
    }]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router