import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Climat from '../views/Climat.vue'
import Culture from '../views/Culture.vue'
import Stock from '../views/Stock.vue'
import MainOeuvre from '../views/MainOeuvre.vue'
import Rendement from '../views/Rendement.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/climat', component: Climat },
  { path: '/culture', component: Culture },
  { path: '/stock', component: Stock },
  { path: '/main-oeuvre', component: MainOeuvre },
  { path: '/rendement', component: Rendement },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
