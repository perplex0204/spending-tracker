<script setup lang="ts">
import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import { sidebarContent } from "@/sidebar/sidebar";
import { ref, provide, onMounted, watch, computed } from "vue";
import { authStorePromise } from "@/store/authStore";
import detailInput from "@/views/inputPage/detailInput.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = ref();
const isAuthenticated = ref(false);
const isLoading = ref(true);
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

const getUserInitial = computed(() => {
	if (authStore.value?.user?.user_name) {
		return authStore.value.user.user_name[0] || "";
	}
	return "";
});

provide("sidebarStatus", collapseStatus);

function consoleLogAuthStore() {
	console.log(authStore.value.userData);
}

watch(
	authStore,
	(newVal, oldVal) => {
		if (newVal.token === "") {
			isAuthenticated.value = false;
			router.push("/login");
		} else {
			isAuthenticated.value = true;
		}
	},
	{ deep: true }
);

onMounted(async () => {
	try {
		const useAuthStore = await authStorePromise;
		authStore.value = useAuthStore();
		await authStore.value.refreshUserInfo();
		console.log(authStore.value);
	} catch (error) {
		console.error("初始化 authStore 失败:", error);
	}
});
</script>

<template>
	<sidebar-menu
		v-if="isAuthenticated"
		:menu="sidebarContent"
		style="position: static"
		@update:collapsed="onToggleCollapse"
	>
		<template v-slot:footer>
			<v-card class="m-2 p-2 text-center" @click="consoleLogAuthStore"
				>AUTHSTORE</v-card
			>
		</template>
	</sidebar-menu>
	<div class="app-container w-100 d-flex flex-column">
		<div
			class="d-flex justify-content-between border rounded"
			style="height: 6%"
			v-if="isAuthenticated"
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
							<span class="text-h5">{{ getUserInitial }}</span>
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
