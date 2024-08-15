<script setup lang="ts">
import { ref, onMounted } from "vue";

const desserts = [
	{
		name: "Frozen Yogurt",
		calories: 159,
		fat: 6.0,
		carbs: 24,
		protein: 4.0,
		iron: "1",
	},
	{
		name: "Jelly bean",
		calories: 375,
		fat: 0.0,
		carbs: 94,
		protein: 0.0,
		iron: "0",
	},
	{
		name: "KitKat",
		calories: 518,
		fat: 26.0,
		carbs: 65,
		protein: 7,
		iron: "6",
	},
	{
		name: "Eclair",
		calories: 262,
		fat: 16.0,
		carbs: 23,
		protein: 6.0,
		iron: "7",
	},
	{
		name: "Gingerbread",
		calories: 356,
		fat: 16.0,
		carbs: 49,
		protein: 3.9,
		iron: "16",
	},
	{
		name: "Ice cream sandwich",
		calories: 237,
		fat: 9.0,
		carbs: 37,
		protein: 4.3,
		iron: "1",
	},
	{
		name: "Lollipop",
		calories: 392,
		fat: 0.2,
		carbs: 98,
		protein: 0,
		iron: "2",
	},
	{
		name: "Cupcake",
		calories: 305,
		fat: 3.7,
		carbs: 67,
		protein: 4.3,
		iron: "8",
	},
	{
		name: "Honeycomb",
		calories: 408,
		fat: 3.2,
		carbs: 87,
		protein: 6.5,
		iron: "45",
	},
	{
		name: "Donut",
		calories: 452,
		fat: 25.0,
		carbs: 51,
		protein: 4.9,
		iron: "22",
	},
	{
		name: "Donut",
		calories: 452,
		fat: 25.0,
		carbs: 51,
		protein: 4.9,
		iron: "22",
	},
	{
		name: "Donut",
		calories: 452,
		fat: 25.0,
		carbs: 51,
		protein: 4.9,
		iron: "22",
	},
	{
		name: "Donut",
		calories: 452,
		fat: 25.0,
		carbs: 51,
		protein: 4.9,
		iron: "22",
	},
	{
		name: "Donut",
		calories: 452,
		fat: 25.0,
		carbs: 51,
		protein: 4.9,
		iron: "22",
	},
	{
		name: "Donut",
		calories: 452,
		fat: 25.0,
		carbs: 51,
		protein: 4.9,
		iron: "22",
	},
	{
		name: "Donut",
		calories: 452,
		fat: 25.0,
		carbs: 51,
		protein: 4.9,
		iron: "22",
	},
	{
		name: "Donut",
		calories: 452,
		fat: 25.0,
		carbs: 51,
		protein: 4.9,
		iron: "2024/1/1",
	},
];
const headers = ref([
	{
		title: "開銷名稱",
		align: "start",
		sortable: false,
		key: "name",
	},
	{ title: "種類", key: "calories", align: "end" },
	{ title: "日期", key: "iron", align: "end" },
	{ title: "金額", key: "fat", align: "end" },
]);
</script>

<template>
	<div class="w-100 h-50">
		<v-data-table
			style="max-height: 100%; overflow-y: auto"
			:items-per-page="null"
			:headers="headers"
			:items="desserts"
			item-value="name"
			><template #bottom></template
		></v-data-table>
	</div>
</template>
