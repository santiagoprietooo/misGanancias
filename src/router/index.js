import { createRouter, createWebHistory } from 'vue-router';
import InicioView from '../views/InicioView.vue';
import ProduccionView from '../views/ProduccionView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: InicioView
    },
    {
      path: '/produccion',
      name: 'Produccion',
      component: ProduccionView
    }
  ],
})

export default router;