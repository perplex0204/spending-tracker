import { createRouter, createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    { path: '/index', name: 'index', component: () => import('@/views/index.vue') },
    { path: '/dashboard', name: 'dashboard', component: () => import('@/views/dashboard.vue') },
    { path: '/charts', name: 'charts', component: () => import('@/views/charts.vue') },
    { path: '/stocks', name: 'stocks', component: () => import('@/views/stocks.vue') },
    { path: '/setting', name: 'setting', component: () => import('@/views/setting.vue') },
]

const options: RouterOptions = {
    history: createWebHashHistory(),
    routes,
}

const router: Router = createRouter(options)

export default router