<script setup lang="ts">
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import { sidebarContent } from "@/sidebar/sidebar";
import { ref, provide } from "vue";
import detailInput from "@/views/inputPage/detailInput.vue";

// sidebar collapse status
let collapseStatus = ref(false);
let blockStatus = ref(false);
function onToggleCollapse(collapsed: boolean) {
	collapseStatus.value = collapsed;
	// console.log(collapseStatus.value);
	if (collapseStatus.value === false) {
		blockStatus.value = false;
	}
}

// detail input dialog
let dialog = ref(false);
function onToggleDialog() {
	dialog.value = !dialog.value;
}
function updateDialog(val: boolean) {
	dialog.value = val;
}

provide("sidebarStatus", collapseStatus);
</script>

<template>
	<sidebar-menu
		:menu="sidebarContent"
		style="position: static"
		@update:collapsed="onToggleCollapse"
	/>
	<div class="app-container w-100 d-flex flex-column">
		<div
			class="d-flex justify-content-between border rounded"
			style="height: 6%"
		>
			<router-link to="/index">
				<img
					class="logo"
					src="@/assets/logo/SPS_Logo.png"
					style="height: 100%"
				/>
			</router-link>
			<div class="d-flex align-center">
				<div style="width: 94.25px; height: 36px" class="mx-2">
					<v-speed-dial
						location="left center"
						transition="slide-y-transition"
					>
						<template v-slot:activator="{ props: activatorProps }">
							<v-fab v-bind="activatorProps">快速記帳</v-fab>
						</template>

						<v-btn key="1" icon="$success"></v-btn>
						<v-btn key="2" icon="$info"></v-btn>
						<v-btn key="3" icon="$warning"></v-btn>
						<v-btn key="4" icon="$error"></v-btn>
						<v-btn key="5" icon="$error"></v-btn>
						<v-btn key="6" icon="$error"></v-btn>
						<v-btn key="7" icon="$error"></v-btn>
						<v-btn key="8" icon="$error"></v-btn>
						<v-btn key="9" icon="$error"></v-btn>
						<v-btn key="10" icon="$error"></v-btn>
					</v-speed-dial>
				</div>
				<v-btn class="mx-2" @click="onToggleDialog">詳細記帳</v-btn>
				<div class="mx-4">
					<v-badge color="info" content="12">
						<v-avatar color="brown" size="large" rounded="0">
							<span class="text-h5">FS</span>
						</v-avatar>
					</v-badge>
				</div>
			</div>
		</div>
		<router-view style="height: 94%"> </router-view>
		<detailInput
			:dialog="dialog"
			@update:dialog="updateDialog"
		></detailInput>
	</div>
</template>

<style>
.logo {
	will-change: filter;
	transition: filter 300ms;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}

/* 定義 fade 動畫 */
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
}

.v-fab__container {
	position: relative !important;
}
</style>
