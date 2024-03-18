// src/menu.ts
import { Ref, ref, h } from 'vue';

let separator = h('hr', {
    style: {
        border: '2px solid',
        borderColor: 'rgba(0, 0, 0, 0.5)',
        margin: '15px 10px',
    },
})

export const sidebarContent: Ref<Array<any>> = ref([
    {
        component: separator,
    },
    {
        title: '戰情總覽',
        href: '/dashboard',
        icon: {
            element: 'span',
            class: 'material-symbols-outlined',
            text: 'search',
        },
    },
    {
        title: '電站管理',
        href: '/pv_forecast',
        icon: {
            element: 'span',
            class: 'material-symbols-outlined',
            text: 'person',
        },
    },
    {
        title: '訂單管理',
        icon: {
            element: 'span',
            class: 'material-symbols-outlined',
            text: 'person',
        },
    },
    {
        component: separator,
    },
    {
        title: '設定',
        href: '/setting',
        icon: {
            element: 'span',
            class: 'material-symbols-outlined',
            text: 'person',
        },
    },
]);