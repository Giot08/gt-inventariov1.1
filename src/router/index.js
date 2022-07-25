import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/personalizar',
    name: 'custom',
    component: () => import('../views/CustomizeView.vue')
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('../views/ReportsView.vue')
  },
  {
    path: '/inventario',
    name: 'inventory',
    component: () => import('../views/InventoryView.vue')
  },
  {
    path: '/losses',
    name: 'losses',
    component: () => import('../views/LossesView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
