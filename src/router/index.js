import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'
import AppLayout from '@/layout/AppLayout.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta: {
            requiresAuth: true,
          },
          children: [
            {
              name: 'task',
              path: '/task/:id',
              component: () => import('@/views/TaskView.vue'),
              props: true,
            },
            {
              path: '/task/add',
              component: () => import('@/views/NewTaskView.vue'),
            },
            {
              path: '/exit',
              component: () => import('@/views/ExitView.vue'),
            },
          ],
        },
        {
          path: '/sign-in',
          name: 'sign-in',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: SignInView,
        },
        {
          path: '/sign-up',
          name: 'sign-up',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: SignUpView,
        },
        {
          path: '/:pathMatch(.*)*',
          component: NotFoundView,
        },
      ],
    },
  ],
})
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('userInfo')

  if (to.meta.requiresAuth && !token) {
    next('/sign-in')
  } else {
    next()
  }
})

export default router
