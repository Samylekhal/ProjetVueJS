import { createRouter, createWebHistory } from 'vue-router'
import PagePrincipale from '../views/PagePrincipale.vue'
import Jeu from '../views/JeuDem.vue'

const routes = [
  {
    path: '/',
    name: 'PagePrincipale',
    component: PagePrincipale,
  },
  {
    path: '/jeu/:level',
    name: 'jeu',
    component: Jeu,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
