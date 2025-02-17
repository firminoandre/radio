import { createRouter, createWebHistory } from 'vue-router'
import TheAppLayout from '@/layout/TheAppLayout.vue'
import HomeView from '@/views/FavoriteStations.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: TheAppLayout,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          component: HomeView,
        },
      ],
    },
  ],
})

export default router
