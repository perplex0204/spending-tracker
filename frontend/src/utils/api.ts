import axios from "axios";

const tokenApi = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL, // 从环境变量中获取API基础URL
});

// 请求拦截器
tokenApi.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token"); // 从localStorage获取token
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default tokenApi;
