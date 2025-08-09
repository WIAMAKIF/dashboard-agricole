import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Climat from '../views/Climat.vue'
import Culture from '../views/Culture.vue'
import Stock from '../views/Stock.vue'
import MainOeuvre from '../views/MainOeuvre.vue'
import Rendement from '../views/Rendement.vue'
import Login from '../views/Login.vue'

// Fonctions pour protéger les routes
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('token');
  if (!token) return next('/login');
  next();
};

const requireRole = (...roles) => (to, from, next) => {
  const role = localStorage.getItem('role');
  if (!role || !roles.includes(role)) return next('/login');
  next();
};

const routes = [
  { path: '/login', component: Login },

  // Accessible uniquement à la direction
  { path: '/', component: Dashboard, beforeEnter: requireRole('direction') },

  // Exemple : accessible aux chefs et direction
  { path: '/climat', component: Climat, beforeEnter: requireRole('chef', 'direction') },

  // Exemple : accessible à tous les rôles connectés
  { path: '/culture', component: Culture, beforeEnter: requireAuth },
  { path: '/stock', component: Stock, beforeEnter: requireRole('controleur', 'direction') },
  { path: '/main-oeuvre', component: MainOeuvre, beforeEnter: requireRole('controleur', 'direction') },
  { path: '/rendement', component: Rendement, beforeEnter: requireAuth },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
