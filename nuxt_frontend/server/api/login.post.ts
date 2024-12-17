export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const { username, password } = await readBody(event);

    try {
        const response = await $fetch(`${config.public.apiBase}/login`, {
            method: 'POST',
            body: { username, password },
        });

        return response as { token: string; user: any }; // 添加類型註解解決 implicit any
    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid credentials',
        });
    }
});
