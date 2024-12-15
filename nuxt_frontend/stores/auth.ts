export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
        user: null,
        groupList: [],
    }),

    actions: {
        setToken(token: string) {
            this.token = token;
        },

        async login(credentials: any) {
            // 登入邏輯
        },

        async getGroupList() {
            // 獲取群組列表邏輯
        },
    },

    getters: {
        isAuthenticated: (state) => !!state.token,
    },
});
