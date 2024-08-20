import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
    role: string;
    [key: string]: any; // 允许包含任意其他属性
}

// 初始化 token 和 user
let token = localStorage.getItem('token') || '';
let user: User = JSON.parse(localStorage.getItem('user') || '{}');
let refreshToken = localStorage.getItem('refreshToken') || '';

// 异步函数获取用户信息
async function fetchUser() {
    if (token !== '') {
        try {
            const response = await axios.post('/api/get_role_by_token', { token: token });
            user = response.data.user;
            localStorage.setItem('user', JSON.stringify(user)); // 将用户信息存储到 localStorage
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    }
}

// 异步初始化函数
async function initializeStore() {
    await fetchUser();

    const useAuthStore = defineStore('user', {
        state: () => ({
            token: token,
            user: user,
            refreshToken: refreshToken,
        }),
        actions: {
            setToken(newToken: string) {
                this.token = newToken;
                localStorage.setItem('token', newToken);
            },
            setUser(newUser: User) {
                this.user = newUser;
                localStorage.setItem('user', JSON.stringify(newUser)); // 将用户信息存储到 localStorage
            },
            setRefreshToken(newRefreshToken: string) {
                this.refreshToken = newRefreshToken;
                localStorage.setItem('refreshToken', newRefreshToken);
            }
        },
    });

    return useAuthStore;
}

// 导出一个 Promise，用于在应用初始化时等待 store 初始化完成
export const authStorePromise = initializeStore();
