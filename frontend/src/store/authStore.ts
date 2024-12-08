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
let userListByGroup: string[] = [];

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

// 取得群組列表
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
			refreshToken: refreshToken,
			currentGroup: currentGroup,
			groupList: groupList,
			userListByGroup: userListByGroup,
		}),
		actions: {
			setToken(newToken: string) {
				this.token = newToken;
				localStorage.setItem("token", newToken);
			},
			setRefreshToken(newRefreshToken: string) {
				this.refreshToken = newRefreshToken;
				localStorage.setItem("refreshToken", newRefreshToken);
			},
			setCurrentGroup(newCurrentGroup: CurrentGroup) {
				this.currentGroup = newCurrentGroup;
				this.setUserListByGroup(newCurrentGroup._id);
			},
			async setUserListByGroup(group_id: string) {
				const res = await axios.post("/api/get_user_list_by_group", {
					group_id: group_id,
				});
				console.log(res);
				this.userListByGroup = res.data.data;
			},
			logout() {
				this.token = "";
				this.refreshToken = "";
				localStorage.removeItem("token");
				localStorage.removeItem("refreshToken");
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
