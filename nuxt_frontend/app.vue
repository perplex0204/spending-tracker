<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
    title: 'Accounting',
    meta: [{ name: 'description', content: 'Accounting' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { charset: 'utf-8' }],
    bodyAttrs: {
        class: 'test',
    },
    script: [{ innerHTML: "console.log('Hello world')" }],
});
useSeoMeta({
    title: 'My Amazing Site',
    ogTitle: 'My Amazing Site',
    description: 'This is my amazing site, let me tell you all about it.',
    ogDescription: 'This is my amazing site, let me tell you all about it.',
    ogImage: 'https://example.com/image.png',
    twitterCard: 'summary_large_image',
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
