import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/PagePrincipale',
      name: 'PagePrincipale',
      component: () => import('../views/PagePrincipale.vue'),
    },
  ],
})

export default router
