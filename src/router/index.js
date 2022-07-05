import { createRouter, createWebHashHistory } from 'vue-router'

const publicRoutes = [
  {
    path: '/login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: 'Home',
    // component: HomeLayout,
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '首页'
        },
        component: () => import('@/views/index/index')
      },
      {
        path: '/404',
        name: '404',
        component: () => import('@/views/error/404')
      },
      {
        path: '/401',
        name: '401',
        component: () => import('@/views/error/401')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes
})

export default router
