<template>
    <v-container class="fill-height" fluid>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <v-toolbar-title>注册</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form @submit.prevent="register">
                            <v-text-field v-model="username" label="用户名" name="username" prepend-icon="mdi-account"
                                type="text" required></v-text-field>
                            <v-text-field v-model="password" label="密码" name="password" prepend-icon="mdi-lock"
                                type="password" required></v-text-field>
                            <v-text-field v-model="email" label="电子邮箱" name="email" prepend-icon="mdi-email"
                                type="email" required></v-text-field>
                            <v-btn color="primary" type="submit" block class="mt-4">
                                注册
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
const email = ref('');
const router = useRouter();

const register = async () => {
    try {
        const response = await axios.post('/api/register', {
            username: username.value,
            password: password.value,
            email: email.value
        });
        if (response.data.success) {
            alert('注册成功');
            router.push('/login');
        } else {
            alert('注册失败：' + response.data.message);
        }
    } catch (error) {
        console.error('注册错误', error);
        alert('注册出错，请稍后重试');
    }
};
</script>
