// src/menu.ts
import { Ref, ref, h } from 'vue';

let separator = h('hr', {
    style: {
        border: '2px solid',
        borderColor: 'rgba(0, 0, 0, 0.5)',
        margin: '15px 10px',
    },
})

export const menu: Ref<Array<any>> = ref([
    // {
    //     header: 'Main Navigation',
    //     hiddenOnCollapse: false,
    // },
    {
        component: separator,
    },
    {
        href: '/',
        title: '戰情室',
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
                href: '/charts/sublink',
                title: '發電業者管理',
            },
            {
                href: '/charts/sublink',
                title: '綠電用戶管理',
            },
        ],
    },
    {
        href: '/my',
        title: '太陽能發電預測',
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
                href: '/charts/sublink',
                title: '台電轉供公式',
            },
            {
                href: '/charts/sublink',
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
                href: '/charts/sublink',
                title: '發電業者 - 計費通知單',
            },
            {
                href: '/charts/sublink',
                title: '綠電用戶 - 繳費通知單',
            },
        ],
    },
    {
        href: '/my',
        title: '檔案管理',
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
        href: '/my',
        title: '用電管理',
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
        href: '/my',
        title: '發電管理',
        icon: {
            element: 'span',
            class: 'material-symbols-outlined',
            text: 'person',
        },
    },
    {
        component: separator,
    },
]);