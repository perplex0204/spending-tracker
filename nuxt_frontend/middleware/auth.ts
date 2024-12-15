export default defineNuxtRouteMiddleware((to, from) => {
    // 確保只在客戶端執行
    if (process) {
        const { checkAuth } = useAuth();

        if (!checkAuth()) {
            return navigateTo('/login');
        }
    }
});
