import { defineStore } from "pinia";
import axios from "axios";
// 初始化 token 和 user
let token = localStorage.getItem("token") || "";
let user = {};
let refreshToken = localStorage.getItem("refreshToken") || "";

// 异步函数获取用户信息
async function fetchUser(token: string) {
	if (token !== "") {
		try {
			const response = await axios.post("/api/get_role_by_token", {
				token: token,
			});
			return response.data.user_data;
		} catch (error) {
			console.error("Failed to fetch user:", error);
		}
	}
}

// 异步初始化函数
async function initializeStore() {
	const useAuthStore = defineStore("user", {
		state: () => ({
			token: token,
			userData: user,
			refreshToken: refreshToken,
		}),
		actions: {
			setToken(newToken: string) {
				this.token = newToken;
				localStorage.setItem("token", newToken);
			},
			setUserData(newUserData: object) {
				this.userData = newUserData;
			},
			setRefreshToken(newRefreshToken: string) {
				this.refreshToken = newRefreshToken;
				localStorage.setItem("refreshToken", newRefreshToken);
			},
			async refreshUserInfo() {
				if (this.token) {
					try {
						const updatedUser = await fetchUser(this.token);
						this.setUserData(updatedUser as object);
					} catch (error) {
						console.error("刷新用户信息失败:", error);
					}
				}
			},
			logout() {
				this.token = "";
				this.userData = {};
				this.refreshToken = "";
				localStorage.removeItem("token");
				localStorage.removeItem("refreshToken");
			},
		},
	});

	return useAuthStore;
}

// 导出一个 Promise，用于在应用初始化时等待 store 初始化完成
export const authStorePromise = initializeStore();
