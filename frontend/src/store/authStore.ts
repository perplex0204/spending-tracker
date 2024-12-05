import { defineStore } from "pinia";
import axios from "axios";

interface CurrentGroup {
	title: string;
	_id: string;
}

// 初始化 token 和 user
let token = localStorage.getItem("token") || "";
let user = {};
let refreshToken = localStorage.getItem("refreshToken") || "";
let currentGroup: CurrentGroup = {
	title: "個人",
	_id: "personal",
};
let groupList: CurrentGroup[] = [];

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

async function getGroup(user_id: string) {
	try {
		groupList = [];
		const res = await axios.post("/api/get_group", {
			user_id: user_id,
		});
		console.log(res.data.data);
		groupList.push({
			title: "個人",
			_id: "personal",
		});
		for (let group of res.data.data) {
			groupList.push({
				title: group.group_name,
				_id: group._id,
			});
		}
		groupList.push({
			title: "新增群組",
			_id: "",
		});
		return groupList;
	} catch (error) {
		console.error("Failed to get group:", error);
		return [];
	}
}

// 异步初始化函数
async function initializeStore() {
	const useAuthStore = defineStore("user", {
		state: () => ({
			token: token,
			userData: user,
			refreshToken: refreshToken,
			currentGroup: currentGroup,
			groupList: groupList,
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
			setCurrentGroup(newCurrentGroup: CurrentGroup) {
				this.currentGroup = newCurrentGroup;
			},
			logout() {
				this.token = "";
				this.userData = {};
				this.refreshToken = "";
				localStorage.removeItem("token");
				localStorage.removeItem("refreshToken");
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
			async getGroupList(user_id: string) {
				this.groupList = await getGroup(user_id);
			},
		},
	});

	return useAuthStore;
}

// 导出一个 Promise，用于在应用初始化时等待 store 初始化完成
export const authStorePromise = initializeStore();
