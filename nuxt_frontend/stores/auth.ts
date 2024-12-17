export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        user: null,
    }),
    actions: {
        async checkAuth() {
            const token = useCookie('token');
            if (token.value) {
                try {
                    // 可以在這裡驗證 token
                    // const response = await $fetch('/api/verify-token');
                    this.isLoggedIn = true;
                    // this.user = response.user;
                } catch {
                    this.isLoggedIn = false;
                    this.user = null;
                }
            } else {
                this.isLoggedIn = false;
                this.user = null;
            }
        },
    },
});
