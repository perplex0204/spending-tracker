<template>
    <div class="flex w-full min-h-screen mx-auto">
        <SidebarMenu :menu="menu" style="position: static" />
        <div class="flex-1 flex flex-col">
            <header class="bg-gray-100 p-4">
                <nav>
                    <ul class="flex gap-4">
                        <li><NuxtLink to="/" class="hover:text-blue-500">Home</NuxtLink></li>
                        <li><NuxtLink to="/about" class="hover:text-blue-500">About</NuxtLink></li>
                        <li><NuxtLink to="/posts/1" class="hover:text-blue-500">Post 1</NuxtLink></li>
                        <li><NuxtLink to="/posts/2" class="hover:text-blue-500">Post 2</NuxtLink></li>
                        <li><NuxtLink to="/dashboard" class="hover:text-blue-500">Dashboard</NuxtLink></li>
                    </ul>
                </nav>
            </header>

            <main class="container mx-auto flex-1">
                <slot></slot>
            </main>

            <footer class="bg-gray-100 p-4 text-center">
                <p>© 2024 Your Website</p>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SidebarMenu } from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
const websiteConfig = useState<number>('config');

const menu = [
    {
        header: 'Main Navigation',
        icon: 'mdi-home',
        title: 'Home',
        to: '/',
    },
];
</script>
