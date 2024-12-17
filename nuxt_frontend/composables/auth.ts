export const useAuth = () => {
    const authStore = useAuthStore();

    const login = async (credentials: { username: string; password: string }) => {
        try {
            const response = await $fetch('/api/login', {
                method: 'POST',
                body: credentials,
            });

            // 處理登入成功邏輯
            authStore.isLoggedIn = true;
            authStore.user = response.user;

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
