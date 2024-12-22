export default defineNuxtRouteMiddleware(async (to) => {
    const authStore = useAuthStore();
    await authStore.checkAuth(); // 確保先檢查登入狀態

    if (!authStore.isLoggedIn && to.path !== '/login') {
        return navigateTo('/login');
    }
});
