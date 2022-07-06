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
    path: '/mermas',
    name: 'decrease',
    component: () => import('../views/DecreaseView.vue')
  },
  {
    path: '/inventario',
    name: 'inventory',
    component: () => import('../views/InventoryView.vue')
  },
  {
    path: '/distribucion',
    name: 'manage',
    component: () => import('../views/ManageView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
