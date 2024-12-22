interface LoginResponse {
    success: boolean;
    message: string;
    token_type: string;
    token: string;
    refresh_token: string;
    user_data: any;
}

export const useAuth = () => {
    const authStore = useAuthStore();

    const login = async (credentials: { username: string; password: string }) => {
        try {
            const response = await $fetch<LoginResponse>('/api/login', {
                method: 'POST',
                body: credentials,
            });

            // 處理登入成功邏輯
            authStore.isLoggedIn = true;
            authStore.setToken(response.token, response.refresh_token);
            return response;
        } catch (error) {
            throw new Error('登入失敗');
        }
    };

    return {
        login,
        isAuthenticated: computed(() => authStore.isLoggedIn),
    };
};
