<template>
	<div>
		<div ref="chartRef" class="w-100 h-100"></div>
		<div v-if="loading" class="loading-overlay">加载中...</div>
		<div v-if="error" class="error-message">{{ error }}</div>
	</div>
</template>

<script setup lang="ts">
import {
	ref,
	onMounted,
	onUnmounted,
	defineProps,
	watch,
	markRaw,
	computed,
	nextTick,
} from "vue";
import * as echarts from "echarts";
import { debounce } from "lodash-es";
import type { EChartsOption } from "echarts";

const chartRef = ref(null);
const chart = ref<echarts.ECharts | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

const props = defineProps<{
	option: any;
	theme?: string | object; // 支持主题
	height?: string | number; // 支持自定义高度
	width?: string | number; // 支持自定义宽度
}>();

// 初始化圖表
const initChart = (): ReturnType<typeof debounce> | null => {
	if (chartRef.value) {
		// 添加初始化配置
		chart.value = markRaw(echarts.init(chartRef.value, props.theme));
		const resizeHandler = debounce(() => {
			chart.value?.resize();
		}, 100);
		window.addEventListener("resize", resizeHandler, { passive: true });
		return resizeHandler;
	}
	return null;
};

// 更新圖表
const updateChart = async (option: EChartsOption) => {
	if (chart.value) {
		try {
			loading.value = true;
			error.value = null;
			chart.value.setOption(option, true);
		} catch (err) {
			error.value = "图表更新失败";
			console.error(err);
		} finally {
			loading.value = false;
		}
	}
};

let resizeHandler: ReturnType<typeof debounce> | null = null;

onMounted(() => {
	nextTick(() => {
		resizeHandler = initChart();
		if (props.option) {
			updateChart(props.option);
		}
	});
});
onUnmounted(() => {
	if (resizeHandler) {
		window.removeEventListener("resize", resizeHandler);
	}
	if (chart.value) {
		chart.value.dispose();
		chart.value = null;
	}
});

watch(
	() => props.option,
	(newOption) => {
		if (newOption) {
			updateChart(newOption);
		}
	},
	{ deep: true }
);
</script>
