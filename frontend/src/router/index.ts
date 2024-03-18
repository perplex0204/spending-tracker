import { createRouter, createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    { path: '/dashboard', name: 'Home', component: () => import('@/views/Home.vue') },
    { path: '/crm/generator', name: 'My', component: () => import('@/views/My.vue') },
    { path: '/crm/demander', name: 'My', component: () => import('@/views/My.vue') },
    { path: '/pv_forecast', name: 'My', component: () => import('@/views/My.vue') },
    { path: '/match/taipower', name: 'My', component: () => import('@/views/My.vue') },
    { path: '/match/best_parameters', name: 'My', component: () => import('@/views/My.vue') },
    { path: '/bill/generator', name: 'My', component: () => import('@/views/My.vue') },
    { path: '/bill/demander', name: 'My', component: () => import('@/views/My.vue') },
    { path: '/bill/platform', name: 'My', component: () => import('@/views/My.vue') },
    { path: '/generator_manage', name: 'My', component: () => import('@/views/My.vue') },
    { path: '/demander_manage', name: 'My', component: () => import('@/views/My.vue') },
    { path: '/expo/2023_generator_manage', name: 'My', component: () => import('@/views/My.vue') },
    { path: '/expo/2023_demander_manage', name: 'My', component: () => import('@/views/My.vue') },
    { path: '/setting', name: 'My', component: () => import('@/views/My.vue') },
]

const options: RouterOptions = {
    history: createWebHashHistory(),
    routes,
}

const router: Router = createRouter(options)

export default router