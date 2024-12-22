<template>
    <div>
        <div ref="chartRef" class="w-100 h-100"></div>
        <div v-if="loading" class="loading-overlay">加载中...</div>
        <div v-if="error" class="error-message">{{ error }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, watch, markRaw, nextTick } from 'vue';
import { debounce } from 'lodash-es';
import type { EChartsOption } from 'echarts';
import * as echarts from 'echarts'; // 導入 ECharts

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
const initChart = () => {
    if (chartRef.value) {
        chart.value = markRaw(echarts.init(chartRef.value, props.theme));

        // 使用 ResizeObserver 替代 resize 事件
        const resizeObserver = new ResizeObserver(
            debounce(() => {
                chart.value?.resize();
            }, 100)
        );

        resizeObserver.observe(chartRef.value);
        return resizeObserver;
    }
    return null;
};

// 更新圖表
const updateChart = async (option: EChartsOption) => {
    if (chart.value) {
        try {
            error.value = null;
            chart.value.setOption(option, true);
            chart.value.showLoading();
        } catch (err) {
            error.value = '图表更新失败';
            console.error(err);
        } finally {
            chart.value.hideLoading();
        }
    }
};

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
    nextTick(() => {
        resizeObserver = initChart();
        if (props.option) {
            updateChart(props.option);
        }
    });
});
onUnmounted(() => {
    if (resizeObserver) {
        resizeObserver.disconnect();
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
