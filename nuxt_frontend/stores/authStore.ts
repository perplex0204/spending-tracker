export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLoggedIn: false,
        token: '',
        refreshToken: '',
        userId: '',
        userName: '',
    }),
    actions: {
        async setToken(token: string, refreshToken: string) {
            this.token = token;
            this.refreshToken = refreshToken;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
        },
        async setUser(userName: string, userId: string) {
            this.userName = userName;
            this.userId = userId;
        },
    },
});
