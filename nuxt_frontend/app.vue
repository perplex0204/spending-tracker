<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { checkAuth } from '~/composables/useAuth';

useHead({
    title: 'Accounting',
    meta: [{ name: 'description', content: 'Accounting' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { charset: 'utf-8' }],
    bodyAttrs: {
        class: 'test',
    },
    script: [{ innerHTML: "console.log('Hello world')" }],
});
useSeoMeta({
    title: 'Accounting',
    ogTitle: 'Accounting',
    description: 'Accounting',
    ogDescription: 'Accounting',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
});

const authStore = useAuthStore();
const webStatusStore = useWebStatusStore();

onMounted(async () => {
    await checkAuth();
    if (!authStore.isLoggedIn) {
        navigateTo('/login');
    }
    await webStatusStore.getGroupList();
});
</script>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>
