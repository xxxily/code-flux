import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'
import { routerMode, base } from './config'

const Edit = () => import('@/pages/edit/Index.vue')
const Preview = () => import('@/pages/edit/Preview.vue')
const Embed = () => import('@/pages/embed/Index.vue')

const routes = [
  {
    path: '/',
    name: 'Editor',
    component: Edit
  },
  {
    path: '/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/share/:id?',
    name: 'Share',
    component: Preview,
    // component: Edit,
    props: true
  },
  {
    path: '/preview/:id?',
    name: 'Preview',
    component: Preview,
    props: true
  },
  {
    path: '/embed/:id',
    name: 'Embed',
    component: Embed
  },
  {
    path: '/embed/',
    name: 'QueryEmbed',
    component: Embed
  },
  // 添加本地编辑路由
  {
    path: '/local/:id',
    name: 'LocalEdit',
    component: Edit
  }
]

const router = createRouter({
  history:
    routerMode === 'hash' ? createWebHashHistory(base) : createWebHistory(base),
  routes
})

export default router
