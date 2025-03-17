import { createRouter, createWebHistory } from 'vue-router'
import PagePrincipale from '../views/PagePrincipale.vue'
import Jeu from '../views/JeuDem.vue'

const routes = [
  { path: '/', component: PagePrincipale },
  { path: '/jeu/:level', name: 'jeu', component: Jeu } // Définition de la page de jeu
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
