import { createRouter, createWebHistory } from 'vue-router'
import PagePrincipale from '../views/PagePrincipale.vue'
import Jeu from '../views/JeuDem.vue'
import Signup from '../views/authentification/SignUp.vue'
import Login from '../views/authentification/Login.vue'
import { auth } from '../firebase'
import ScoreBoard from '@/components/ScoreBoard.vue'

const routes = [
  { path: '/', component: PagePrincipale },
  { path: '/jeu/:level', name: 'jeu', component: Jeu }, 
  { path: '/signup', component: Signup },
  { path: '/login', component: Login},
  {path: '/score',name: 'score' ,component: ScoreBoard}, 

]

const router = createRouter({
  history: createWebHistory(),
  routes
})


// Vérifier l'authentification avant d'accéder aux pages protégées
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.currentUser) {
  next('/login')
  } else {
  next()
  }
 })
 


export default router
