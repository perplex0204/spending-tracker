export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        token: '',
        refreshToken: '',
        userId: '',
        userName: '',
    }),
    actions: {
        async checkAuth() {
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');
            if (token) {
                try {
                    // 可以在這裡驗證 token
                    const response = await $fetch('/api/get_role_by_token', {
                        method: 'POST',
                        body: {
                            token: token,
                        },
                    });
                    this.isLoggedIn = true;
                    // this.user = response.user;
                } catch {
                    this.isLoggedIn = false;
                }
            } else {
                this.isLoggedIn = false;
            }
        },
        async setToken(token: string, refreshToken: string) {
            this.token = token;
            this.refreshToken = refreshToken;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
        },
    },
});
