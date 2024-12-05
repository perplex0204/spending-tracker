// src/menu.ts
import { Ref, ref, h } from "vue";

let separator = h("hr", {
	style: {
		border: "2px solid",
		borderColor: "rgba(0, 0, 0, 0.5)",
		margin: "15px 10px",
	},
});

export const sidebarContent: Ref<Array<any>> = ref([
	{
		component: separator,
	},
	{
		title: "資產總覽",
		href: "/dashboard",
		icon: {
			element: "span",
			class: "material-symbols-outlined",
			text: "search",
		},
	},
	{
		title: "圖表與統計",
		href: "/charts",
		icon: {
			element: "span",
			class: "material-symbols-outlined",
			text: "person",
		},
	},
	{
		title: "股票管理",
		href: "/stocks",
		icon: {
			element: "order_management",
			class: "material-symbols-outlined",
			text: "person",
		},
	},
	{
		component: separator,
	},
	{
		title: "設定",
		href: "/setting",
		icon: {
			element: "span",
			class: "material-symbols-outlined",
			text: "person",
		},
	},
	{
		title: "登出",
		href: "/login",
		icon: {
			element: "span",
			class: "material-symbols-outlined",
			text: "logout",
		},
	},
	{
		title: "註冊",
		href: "/register",
		icon: {
			element: "span",
			class: "material-symbols-outlined",
			text: "person_add",
		},
	},
]);
