<template>
	<v-container class="fill-height" fluid>
		<v-row justify="center">
			<v-col cols="12" sm="8" md="6" lg="4">
				<v-card class="elevation-12">
					<v-toolbar color="primary" dark flat>
						<v-toolbar-title>註冊</v-toolbar-title>
					</v-toolbar>
					<v-card-text>
						<v-form @submit.prevent="register">
							<v-text-field
								v-model="username"
								label="帳號"
								name="username"
								prepend-icon="mdi-account"
								type="text"
								required
							></v-text-field>
							<v-text-field
								v-model="password"
								label="密碼"
								name="password"
								prepend-icon="mdi-lock"
								type="password"
								required
							></v-text-field>
							<v-text-field
								v-model="email"
								label="信箱"
								name="email"
								prepend-icon="mdi-email"
								type="email"
								required
							></v-text-field>
							<v-btn
								color="primary"
								type="submit"
								block
								class="mt-4"
							>
								註冊
							</v-btn>
						</v-form>
						<v-btn
							color="primary"
							type="submit"
							block
							class="mt-4"
							@click="router.push('/login')"
						>
							登入頁面
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { authStorePromise } from "@/store/authStore";
import axios from "axios";

const authStore = ref();
const username = ref("");
const password = ref("");
const email = ref("");
const router = useRouter();

const register = async () => {
	try {
		const response = await axios.post("/api/register", {
			username: username.value,
			password: password.value,
			email: email.value,
		});
		if (response.data.success) {
			alert("註冊成功");
			router.push("/login");
		} else {
			alert("註冊失敗：" + response.data.message);
		}
	} catch (error) {
		console.error("註冊錯誤", error);
		alert("註冊出錯，請稍後重試");
	}
};

onMounted(async () => {
	const useAuthStore = await authStorePromise;
	authStore.value = useAuthStore();
	authStore.value.logout();
});
</script>
