import { createRouter, createWebHashHistory, RouterOptions, Router, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    { path: '/dashboard', name: 'dashboard', component: () => import('@/views/dashboard.vue') },
    { path: '/station_management', name: 'station_management', component: () => import('@/views/stationManagement.vue') },
    { path: '/order_management', name: 'order_management', component: () => import('@/views/orderManagement.vue') },
    { path: '/setting', name: 'setting', component: () => import('@/views/setting.vue') },
]

const options: RouterOptions = {
    history: createWebHashHistory(),
    routes,
}

const router: Router = createRouter(options)

export default router