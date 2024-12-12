<template>
    <section>
        <p>This page will be displayed at the /about route.</p>
        <p>{{ websiteConfig }}</p>
    </section>
</template>

<script setup lang="ts">
const websiteConfig = useState('config');
</script>
