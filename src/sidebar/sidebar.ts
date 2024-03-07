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
        title: '戰情室',
        href: '/dashboard',
        icon: {
            element: 'span',
            class: 'material-symbols-outlined',
            text: 'search',
        },
    },
    {
        title: '用戶管理系統',
        icon: {
            element: 'span',
            class: 'material-symbols-outlined',
            text: 'person',
        },
        child: [
            {
                href: '/crm/generator',
                title: '發電業者管理',
            },
            {
                href: '/crm/demander',
                title: '綠電用戶管理',
            },
        ],
    },
    {
        title: '太陽能發電預測',
        href: '/pv_forecast',
        icon: {
            element: 'span',
            class: 'material-symbols-outlined',
            text: 'person',
        },
    },
    {
        title: '媒合系統',
        icon: {
            element: 'span',
            class: 'material-symbols-outlined',
            text: 'person',
        },
        child: [
            {
                href: '/match/taipower',
                title: '台電轉供公式',
            },
            {
                href: '/match/best_parameters',
                title: '最佳參數求取',
            },
        ],
    },
    {
        title: '帳單產生系統',
        icon: {
            element: 'span',
            class: 'material-symbols-outlined',
            text: 'person',
        },
        child: [
            {
                href: '/bill/genarator',
                title: '發電業者 - 計費通知單',
            },
            {
                href: '/bill/demander',
                title: '綠電用戶 - 繳費通知單',
            },
            {
                href: '/bill/platform',
                title: '內部金流管理系統',
            },
        ],
    },
    {
        title: '檔案管理',
        href: '/file_manage',
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
        title: '發電業者用管理頁面',
        href: '/generator_manage',
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
        title: '綠電用戶用管理頁面',
        href: '/demander_manage',
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
        title: '展示用頁面',
        icon: {
            element: 'span',
            class: 'material-symbols-outlined',
            text: 'person',
        },
        child: [
            {
                title: '發電管理系統',
                href: '/expo/2023_generator_manage',
            },
            {
                title: '用戶管理系統',
                href: '/expo/2023_demander_manage',
            },
        ],
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