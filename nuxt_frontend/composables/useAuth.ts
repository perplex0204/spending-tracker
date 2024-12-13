export const useAuth = () => {
    const isAuthenticated = useState('auth', () => false);

    const checkAuth = () => {
        // 只在客戶端檢查 localStorage
        if (process.client) {
            const token = localStorage.getItem('token');
            isAuthenticated.value = !!token;
            return isAuthenticated.value;
        }
        return false;
    };

    const login = async (credentials: { username: string; password: string }) => {
        try {
            // 登入邏輯...
            if (process.client) {
                localStorage.setItem('token', 'your-token');
            }
            isAuthenticated.value = true;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        if (process.client) {
            localStorage.removeItem('token');
        }
        isAuthenticated.value = false;
    };

    return {
        isAuthenticated,
        checkAuth,
        login,
        logout,
    };
};
