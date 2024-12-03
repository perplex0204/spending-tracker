<script setup lang="ts">
import { ref } from "vue";
import echartsTemplate from "@/components/echartsTemplate.vue";
import type { EChartsOption } from "echarts";
// 設定圓餅圖的選項
const pieChartOptions = ref<EChartsOption>({
	title: {
		text: "開銷分佈",
		left: "center",
	},
	tooltip: {
		trigger: "item",
	},
	legend: {
		orient: "vertical",
		left: "left",
		show: false,
	},
	series: [
		{
			name: "訪問來源",
			type: "pie",
			radius: ["40%", "70%"],
			center: ["50%", "50%"],
			data: [
				{ value: 1048, name: "搜尋引擎" },
				{ value: 735, name: "直接訪問" },
				{ value: 580, name: "郵件營銷" },
				{ value: 484, name: "聯盟廣告" },
				{ value: 300, name: "視頻廣告" },
				{ value: 300, name: "視頻廣告1" },
				{ value: 300, name: "視頻廣告2" },
				{ value: 300, name: "視頻廣告3" },
				{ value: 300, name: "視頻廣告4" },
				{ value: 300, name: "視頻廣告65" },
				{ value: 300, name: "視頻廣告6" },
				{ value: 300, name: "視頻廣告7" },
				{ value: 300, name: "視頻廣告8" },
				{ value: 300, name: "視頻廣告9" },
			],
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: "rgba(0, 0, 0, 0.5)",
				},
			},
		},
	],
});
</script>

<template>
	<echartsTemplate :option="pieChartOptions" class="w-100 h-50" />
</template>
