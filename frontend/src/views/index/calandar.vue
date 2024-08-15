<script setup lang="ts">
import { ref, onMounted, nextTick, inject, watch, watchEffect } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import rrulePlugin from "@fullcalendar/rrule";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@mdi/font/css/materialdesignicons.css"; // 導入 MDI CSS

// 設定初始事件
const events = ref([
	{ title: "初始事件", start: new Date().toISOString().slice(0, 10) },
]);
const eventData = ref([
	{
		title: "事件1", // FullCalendar 使用 'title' 作為事件名稱
		start: "2024-07-20", // 使用 'start' 作為事件開始時間
		end: "2024-07-21", // 使用 'end' 作為事件結束時間
		extendedProps: {
			// 使用 'extendedProps' 來擴展自定義屬性
			eventName: "事件1",
			priority: 1,
		},
	},
]);
const selectedEvent = ref("");

const calendarApi = ref<any>(null);
let calendarOptions = ref({
	plugins: [dayGridPlugin, interactionPlugin, rrulePlugin, bootstrapPlugin],
	initialView: "dayGridMonth",
	events: eventData.value,
	eventOrder: "priority",
	showNonCurrentDates: true,
	windowResize: function () {
		calendarApi.value.getApi().updateSize();
	},
	eventClick: function (clickInfo: any) {
		console.log("Event: ", clickInfo.event._def.extendedProps);
		const eventItem = eventData.value.find(
			(item) => item.eventName === clickInfo.event._def.title
		);
		if (eventItem) {
			selectedEvent.value = eventItem.eventName;
		}
	},
	dateClick: function (info: any) {
		const eventsOnDate = eventData.value.filter((event) => {
			return (
				info.date >= new Date(event.start) &&
				info.date <= new Date(event.end)
			);
		});
		console.log("Events on " + info.dateStr + ":", eventsOnDate);
	},
	dayMaxEvents: 3,
	fixedWeekCount: false,
	dayHeaderContent: function (info) {
		const dayNames = ["日", "一", "二", "三", "四", "五", "六"]; // 自定義的星期顯示
		return { html: `<span>${dayNames[info.date.getDay()]}</span>` };
	},
	headerToolbar: {
		left: "title",
		center: "",
		right: "prev,next today",
	},
});

// 定義事件點擊處理函數
function handleEventClick(info) {
	alert(`事件: ${info.event.title}`);
}

onMounted(() => {
	nextTick(() => {
		if (calendarApi.value) {
			calendarApi.value.getApi().updateSize();
		}
	});
});

const sidebarStatus = inject("sidebarStatus");

watch(
	() => sidebarStatus.value,
	(val) => {
		if (calendarApi.value) {
			setTimeout(() => {
				calendarApi.value.getApi().updateSize();
			}, 260);
		}
	}
);
</script>

<template>
	<FullCalendar
		class="w-100 h-100"
		ref="calendarApi"
		:options="calendarOptions"
	/>
</template>

<style>
/* 調整 fc-header-toolbar 樣式 */
.fc-header-toolbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	padding: 0px;
	margin: 5px !important;
	background-color: #f8f9fa;
}

/* 幾號文字 */
.fc-daygrid-day-number {
	text-decoration: none;
	font-size: 1.2em;
	color: rgb(125, 125, 125);
}

/* 星期幾文字 */
.fc-col-header-cell-cushion {
	text-decoration: none;
	font-size: 1.3em;
	color: rgb(125, 125, 125);
}
</style>
