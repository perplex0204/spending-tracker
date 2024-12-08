<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { authStorePromise } from "@/store/authStore";

const authStore = ref();
const username = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
	try {
		const response = await axios.post("/api/login", {
			username: username.value,
			password: password.value,
		});
		if (response.data.success) {
			router.push("/index");
			console.log(response.data); // 安全風險: 不應在控制台記錄敏感信息
			authStore.value.setToken(response.data.token);
			authStore.value.setRefreshToken(response.data.refresh_token);
			await authStore.value.getGroupList(response.data.user_data.user_id);
		} else {
			alert("登入失敗：" + response.data.message);
		}
	} catch (error) {
		console.error("登入錯誤", error); // 考慮使用更安全的錯誤處理方式
		alert("登入失敗，請稍後重試");
	}
};

onMounted(async () => {
	const useAuthStore = await authStorePromise;
	authStore.value = useAuthStore();
	authStore.value.logout();
	console.log(authStore.value);
});
</script>

<template>
	<v-container class="fill-height" fluid>
		<v-row justify="center">
			<v-col cols="12" sm="8" md="6" lg="4">
				<v-card class="elevation-12">
					<v-toolbar color="primary" dark flat>
						<v-toolbar-title>登入</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form @submit.prevent="login">
							<v-text-field v-model="username" label="用戶名" name="username" prepend-icon="mdi-account"
								type="text" required></v-text-field>
							<v-text-field v-model="password" label="密碼" name="password" prepend-icon="mdi-lock"
								type="password" required></v-text-field>
							<v-btn color="primary" type="submit" block class="mt-4">
								登入
							</v-btn>
						</v-form>
						<v-btn color="primary" type="submit" block class="mt-4" @click="router.push('/register')">
							會員註冊
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>
