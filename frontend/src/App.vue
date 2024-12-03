<script setup lang="ts">
import { ref, provide, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { authStorePromise } from "@/store/authStore";
import { SidebarMenu } from "vue-sidebar-menu";
import { sidebarContent } from "@/sidebar/sidebar";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import addGroup from "@/views/index/addGroup.vue";
import detailInput from "@/views/inputPage/detailInput.vue";
import axios from "axios";

interface GroupItem {
	title: string;
}

const router = useRouter();
const authStore = ref();
const isAuthenticated = ref(false);
// sidebar collapse status
const addGroupDialog = ref(false);
let collapseStatus = ref(false);
let blockStatus = ref(false);

const currentGroup = ref("個人");
const groupList = ref<GroupItem[]>([]);

function onToggleCollapse(collapsed: boolean) {
	collapseStatus.value = collapsed;
	if (collapseStatus.value === false) {
		blockStatus.value = false;
	}
}

function updateAddGroupDialog(val: boolean) {
	addGroupDialog.value = val;
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
	console.log(authStore.value.userID);
}

async function getGroup(user_id: string) {
	groupList.value = [];
	const res = await axios.post("/api/get_group", {
		user_id: user_id,
	});
	console.log(res.data.data);
	groupList.value.push({
		title: "個人",
	});
	for (let group of res.data.data) {
		groupList.value.push({
			title: group.group_name,
		});
	}
	groupList.value.push({
		title: "新增群組",
	});
}

watch(
	authStore,
	(newVal, _) => {
		if (newVal.token === "") {
			isAuthenticated.value = false;
			router.push("/login");
		} else {
			isAuthenticated.value = true;
		}
	},
	{ deep: true }
);

watch(currentGroup, (newVal, oldVal) => {
	if (newVal === "新增群組") {
		console.log("新增群組");
		addGroupDialog.value = true;
		currentGroup.value = oldVal;
	}
});

onMounted(async () => {
	try {
		const useAuthStore = await authStorePromise;
		authStore.value = useAuthStore();
		await authStore.value.refreshUserInfo();
		console.log(authStore.value.userData);
		await getGroup(authStore.value.userData.user_id);
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
					</v-speed-dial>
				</div>
				<v-btn class="mx-2" @click="onToggleDialog">詳細記帳</v-btn>
				<v-select
					width="16rem"
					class="mx-2 py-2"
					v-model="currentGroup"
					:items="groupList"
					label="目前群組"
					hide-details
				>
				</v-select>
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
		<addGroup
			:dialog="addGroupDialog"
			@update:dialog="updateAddGroupDialog"
		></addGroup>
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
