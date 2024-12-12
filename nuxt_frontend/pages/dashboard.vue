<template>
    <div>
        <h1>Dashboard</h1>
        {{ websiteConfig }}
        <v-btn @click="test"></v-btn>
        <v-btn @click="logout">登出</v-btn>
    </div>
</template>

<script setup lang="ts">
const { isAuthenticated, logout } = useAuth();

// 使用中間件
definePageMeta({
    middleware: ['auth'],
});

const websiteConfig = useState<number>('config');

const test = () => {
    websiteConfig.value += 1;
};
</script>
