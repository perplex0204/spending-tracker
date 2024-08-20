<template>
    <v-container class="fill-height" fluid>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>登录</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form @submit.prevent="login">
                            <v-text-field v-model="username" label="用户名" name="username" prepend-icon="mdi-account"
                                type="text" required></v-text-field>
                            <v-text-field v-model="password" label="密码" name="password" prepend-icon="mdi-lock"
                                type="password" required></v-text-field>
                            <v-btn color="primary" type="submit" block class="mt-4">
                                登录
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const username = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
    try {
        const response = await axios.post('/api/login', {
            username: username.value,
            password: password.value
        });
        if (response.data.success) {
            router.push('/');
        } else {
            alert('登录失败：' + response.data.message);
        }
    } catch (error) {
        console.error('登录错误', error);
        alert('登录出错，请稍后重试');
    }
};
</script>
