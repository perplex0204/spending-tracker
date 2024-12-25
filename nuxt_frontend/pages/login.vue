<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
            <form class="my-6 space-y-6" @submit.prevent="handleSubmit">
                <div class="rounded-md shadow-sm space-y-4">
                    <div>
                        <label for="username" class="sr-only">帳號</label>
                        <input
                            id="username"
                            v-model="formData.username"
                            type="text"
                            required
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                            placeholder="帳號"
                        />
                    </div>
                    <div>
                        <label for="password" class="sr-only">密碼</label>
                        <input
                            id="password"
                            v-model="formData.password"
                            type="password"
                            required
                            class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                            placeholder="密碼"
                        />
                    </div>
                </div>

                <div v-if="error" class="text-red-500 text-sm text-center">
                    {{ error }}
                </div>

                <div class="flex justify-center">
                    <v-btn class="mx-4" type="submit" :disabled="isLoading"> 登入 </v-btn>
                    <v-btn class="mx-4" @click="toRegister">前往註冊帳號</v-btn>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const { login } = useAuth();
const router = useRouter();

const formData = ref({
    username: '',
    password: '',
    email: '',
});

const isLoading = ref(false);
const error = ref('');

const handleSubmit = async () => {
    try {
        isLoading.value = true;
        error.value = '';
        await login(formData.value);
        router.push('/dashboard');
    } catch (e) {
        error.value = '登入失敗，請檢查帳號密碼';
    } finally {
        isLoading.value = false;
    }
};

const toRegister = () => {
    router.push('/register');
};
</script>
