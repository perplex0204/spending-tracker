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
            authStore.setUser(response.user_data.user_name, response.user_data.user_id);
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

export const useRegister = () => {
    const authStore = useAuthStore();

    const register = async (credentials: { username: string; password: string; email: string }) => {
        try {
            const response = await $fetch<LoginResponse>('/api/register', {
                method: 'POST',
                body: credentials,
            });
        } catch (error) {
            throw new Error('註冊失敗');
        }
    };

    return {
        register,
    };
};

export const checkAuth = async () => {
    const authStore = useAuthStore();
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');
    if (token) {
        try {
            // 可以在這裡驗證 token
            const response = await $fetch<LoginResponse>('/api/get_role_by_token', {
                method: 'POST',
                body: {
                    token: token,
                },
            });
            authStore.isLoggedIn = true;
            console.log(response);
            authStore.setUser(response.user_data.user_name, response.user_data.user_id);
        } catch {
            authStore.isLoggedIn = false;
        }
    } else {
        authStore.isLoggedIn = false;
    }
};
