<script setup lang="ts">
import { ref, onMounted, nextTick, inject, watch } from "vue";
import * as echarts from "echarts";

// 設定圓餅圖的選項
const pieChartOptions = ref({
	title: {
		text: "開銷分佈",
		left: "center",
	},
	tooltip: {
		trigger: "item",
	},
	legend: {
		orient: "vertical",
		left: "left", // 將legend放置於右側
		show: false,
	},
	toolbox: {
		show: true,
		feature: {
			myLegendToggle: {
				show: true,
				title: "切換圖例顯示",
				icon: "path://M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.2 0-372-166.8-372-372S306.8 140 512 140s372 166.8 372 372-166.8 372-372 372zm0-612c-132.8 0-240 107.2-240 240s107.2 240 240 240 240-107.2 240-240-107.2-240-240-240zm0 400c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160z",
				onclick: () => {
					const option = pieChartOptions.value;
					option.legend.show = !option.legend.show;
					pieChart.setOption(option);
				},
			},
		},
	},
	series: [
		{
			name: "訪問來源",
			type: "pie",
			radius: ["40%", "70%"], // 調整內外半徑
			center: ["50%", "50%"], // 調整圓心位置
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

let pieChart;

const initPieChart = () => {
	// 獲取圓餅圖的DOM節點
	const pieChartDom = document.getElementById("pie-chart");
	if (pieChartDom) {
		// 初始化ECharts實例
		pieChart = echarts.init(pieChartDom);
		// 使用設定的選項繪製圖表
		pieChart.setOption(pieChartOptions.value);
	}
};

// 當組件掛載完成後，初始化圓餅圖
onMounted(() => {
	nextTick(() => {
		initPieChart();
	});
});

const sidebarStatus = inject("sidebarStatus");

watch(
	() => sidebarStatus.value,
	(val) => {
		if (pieChart) {
			setTimeout(() => {
				pieChart.resize();
			}, 260);
		}
	}
);
</script>

<template>
	<div id="pie-chart" class="w-100 h-50"></div>
</template>
