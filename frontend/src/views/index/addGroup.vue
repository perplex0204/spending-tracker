<template>
	<v-dialog max-width="1000" v-model="localDialog">
		<v-card class="d-flex flex-column p-2">
			<v-text-field label="群組名稱" v-model="groupName"></v-text-field>
			<v-btn @click="addGroup">新增</v-btn>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { authStorePromise } from "@/store/authStore";
import axios from "axios";

const authStore = ref();

const props = defineProps<{
	dialog: boolean;
}>();
const emit = defineEmits(["update:dialog"]);

const localDialog = ref(false);
const groupName = ref("");

async function addGroup() {
	try {
		const res = await axios.post("/api/add_group", {
			group_name: groupName.value,
			user_id: authStore.value.userData.user_id,
		});
		console.log(res);
	} catch (error) {
		console.error("Error adding group:", error);
	}
}

watch(
	() => props.dialog,
	(val) => {
		localDialog.value = val;
	}
);

watch(
	() => localDialog.value,
	(val) => {
		if (!val) {
			emit("update:dialog", val);
		}
	}
);

onMounted(async () => {
	const useAuthStore = await authStorePromise;
	authStore.value = useAuthStore();
});
</script>
